// controllers/user/BusinessAndServiceController.js
const { imageUploadUtil } = require('../../helpers/cloudinary');
const BusinessAndService = require('../../models/BusinessAndService');
const AdminCategories = require('../../models/Categories');
const mongoose = require('mongoose');

// Handle image upload
exports.handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error during image upload' });
    }
};

// Create a new business
exports.createBusiness = async (req, res) => {
    // Determine required fields based on BusinessType
    const { BusinessType, category = [] , subCategory = [], features = [] } = req.body;
    
    const commonRequiredFields = ['title', 'description', 'BusinessType', 'category', 'owner', 'email', 'images'];
    const locationRequiredFields = BusinessType === "Location" ? ['country', 'state', 'city', 'fullAddress'] : [];
    const requiredFields = [...commonRequiredFields, ...locationRequiredFields];
    
    // Check for missing fields
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    try {
        // Validate each category
        const invalidCategories = await Promise.all(
            category.map(async (catId) => {
                const categoryData = await AdminCategories.findById(catId);
                return categoryData ? null : catId;
            })
        );
        
        if (invalidCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid category IDs: ${invalidCategories.filter(Boolean).join(', ')}` });
        }

        // Validate each subCategory
        const invalidSubCategories = await Promise.all(
            subCategory.map(async (subCatId) => {
                const validSubCategory = await AdminCategories.findOne({ "subCategories._id": subCatId });
                return validSubCategory ? null : subCatId;
            })
        );

        if (invalidSubCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid subCategory IDs: ${invalidSubCategories.filter(Boolean).join(', ')}` });
        }

        // Ensure features is an array and handle empty case
        if (!Array.isArray(features)) {
            return res.status(400).json({ success: false, message: 'Features must be an array.' });
        }

        // Prepare the data for saving
        const newBusinessData = {
            ...req.body,
            features, // Ensure features is passed correctly as an array
        };
        
        // If it's an Online Business, set location fields to empty strings if they don't exist
        if (BusinessType === "Online") {
            newBusinessData.country = newBusinessData.country || "";
            newBusinessData.state = newBusinessData.state || "";
            newBusinessData.city = newBusinessData.city || "";
        }

        // Create and save the new business
        const newBusiness = new BusinessAndService(newBusinessData);
        const savedBusiness = await newBusiness.save();

        res.status(201).json({ success: true, data: savedBusiness });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all businesses with user, category, and subCategory details
exports.getBusinessWithDetails = async (req, res) => {
    try {
        const { sort , search , page = 1, limit = 10 } = req.query; // Get sort, search, page, and limit from query params
        
        // Step 1: Construct the search query based on the search parameter
        const searchQuery = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
                { description: { $regex: search, $options: 'i' } } // Case-insensitive search in description
            ]
        } : {};

        // Step 2: Set up sorting options based on the sort parameter
        let sortOption = {};
        switch (sort) {
            case "title-atoz":
                sortOption = { title: 1 }; // Sort by title A to Z
                break;
            case "title-ztoa":
                sortOption = { title: -1 }; // Sort by title Z to A
                break;
            case "time-newest":
                sortOption = { createdAt: -1 }; // Sort by newest first (desc)
                break;
            case "time-oldest":
                sortOption = { createdAt: 1 }; // Sort by oldest first (asc)
                break;
            default:
                sortOption = {}; // Default to no sorting (or you can set a default sort)
        }

        // Step 3: Find businesses with search, sort, and pagination applied
        const businesses = await BusinessAndService.find(searchQuery)
            .populate('owner') // Populate owner details
            .populate({
                path: 'category', // Populate main category details
                select: 'title image',
            })
            .sort(sortOption) // Apply sorting
            .skip((page - 1) * limit) // Apply pagination
            .limit(parseInt(limit)); // Limit the results

        // Step 4: Populate category and subCategory details for each business
        const businessDataWithCategoriesAndSubCategories = await Promise.all(
            businesses.map(async (business) => {
                const categories = await AdminCategories.find({
                    _id: { $in: business.category },
                });

                const categoryDetails = categories.map(category => ({
                    _id: category._id,
                    title: category.title,
                    image: category.image,
                }));

                const subCategoryDetails = categories.flatMap(category =>
                    category.subCategories.filter(subCat =>
                        business.subCategory.includes(subCat._id.toString())
                    ).map(subCat => ({
                        _id: subCat._id,
                        title: subCat.title,
                        // Include other properties as needed
                    }))
                );

                return {
                    ...business.toObject(),
                    category: business.category, // Include category IDs
                    categoryDetails, // Include category details
                    subCategory: business.subCategory, // Include subcategory IDs
                    subCategoryDetails, // Include subcategory details
                };
            })
        );

        // Step 5: Get the total count of businesses for pagination
        const totalCount = await BusinessAndService.countDocuments(searchQuery);

        res.status(200).json({
            success: true,
            data: businessDataWithCategoriesAndSubCategories,
            totalCount: totalCount, // Include total count for pagination
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update a business by ID
exports.updateBusiness = async (req, res) => {
    const requiredFields = ['title', 'description', 'category', 'owner', 'email', 'country', 'state', 'city', 'images', 'subCategory', 'fullAddress'];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);

    if (missingFields.length > 0) {
        return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    try {
        const { category = [], subCategory = [], features = [], listImages = [] } = req.body;

        // Validate each category
        const invalidCategories = await Promise.all(
            category.map(async (catId) => {
                const categoryData = await AdminCategories.findById(catId);
                return categoryData ? null : catId;
            })
        );

        if (invalidCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid category IDs: ${invalidCategories.filter(Boolean).join(', ')}` });
        }

        // Validate each subCategory
        const invalidSubCategories = await Promise.all(
            subCategory.map(async (subCatId) => {
                const validSubCategory = await AdminCategories.findOne({ "subCategories._id": subCatId });
                return validSubCategory ? null : subCatId;
            })
        );

        if (invalidSubCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid subCategory IDs: ${invalidSubCategories.filter(Boolean).join(', ')}` });
        }

        // Ensure features is an array if provided
        if (features && !Array.isArray(features)) {
            return res.status(400).json({ success: false, message: 'Features must be an array.' });
        }

        // Ensure listImages is an array if provided
        if (listImages && !Array.isArray(listImages)) {
            return res.status(400).json({ success: false, message: 'listImages must be an array.' });
        }

        // Prepare the data for updating
        const updatedBusinessData = {
            ...req.body,
            features,   // Ensure features is passed correctly as an array
            listImages, // Update the listImages field with the new array
        };

        // Update the business only if validation is successful
        const updatedBusiness = await BusinessAndService.findByIdAndUpdate(req.params.id, updatedBusinessData, { new: true });

        if (!updatedBusiness) {
            return res.status(404).json({ success: false, message: 'Business not found' });
        }

        res.status(200).json({ success: true, data: updatedBusiness });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
    try {
        const deletedBusiness = await BusinessAndService.findByIdAndDelete(req.params.id);
        if (!deletedBusiness) return res.status(404).json({  success :false , message: 'Business not found' });
        res.status(200).json({ success :true ,  message: 'Business deleted successfully' });
    } catch (error) {
        res.status(500).json({ success :false ,  message: error.message });
    }
};

// Get all businesses for a specific user
exports.getBusinessesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Step 1: Find all businesses with the selected categories and subCategories IDs
        const businesses = await BusinessAndService.find({owner : userId})
            .populate('owner') // Populate owner details
            .populate({
                path: 'category', // Populate main category details
                select: 'title image',
            });
        // Step 2: Populate subCategory details manually
        const businessDataWithSubCategories = await Promise.all(
            businesses.map(async (business) => {
                // Find all subCategories within the matched categories that correspond to the subCategory IDs
                const categories = await AdminCategories.find({
                    _id: { $in: business.category },
                    'subCategories._id': { $in: business.subCategory }
                });

                // Extract details of all matching subCategories
                const subCategoryDetails = categories.flatMap(category =>
                    category.subCategories.filter(subCat => business.subCategory.includes(subCat._id.toString()))
                );

                return {
                    ...business.toObject(),
                    subCategoryDetails,
                };
            })
        );

        res.status(200).json({ success: true, data: businessDataWithSubCategories });
    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the business by ID and populate owner and category details
        const business = await BusinessAndService.findById(id)
            .populate('owner') // Populate owner details
            .populate({
                path: 'category', // Populate main category details
                select: 'title image',
            });
        
        if (!business) {
            return res.status(404).json({ success: false, message: 'Business not found' });
        }

        // Get categories that match the business's category IDs and contain the business's subCategory IDs
        const categories = await AdminCategories.find({
            _id: { $in: business.category },
            'subCategories._id': { $in: business.subCategory },
        });

        // Extract details of all matching subCategories
        const subCategoryDetails = categories.flatMap(category =>
            category.subCategories.filter(subCat => 
                business.subCategory.includes(subCat._id.toString())
            ).map(subCat => ({
                _id: subCat._id,
                title: subCat.title,
                // Include other properties as needed
            }))
        );

        // Return the business data with populated subCategory details
        res.status(200).json({
            success: true,
            data: {
                ...business.toObject(),
                subCategoryDetails,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update 'open' value
exports.updateOpenValue = async (req, res) => {
    try {
        const { id } = req.params; // ID of the business or service
        const { open } = req.body; // New open value

        if (typeof open !== "boolean") {
            return res.status(400).json({ message: "'open' must be a boolean value." });
        }

        const updatedBusiness = await BusinessAndService.findByIdAndUpdate(
            id,
            { open },
            { new: true } // Return the updated document
        );

        if (!updatedBusiness) {
            return res.status(404).json({ success : false ,  message: 'Business or Service not found.' });
        }

        res.status(200).json({success : true ,  data : updatedBusiness});
    } catch (error) {
        res.status(500).json({ success : false , message: 'An error occurred.', error: error.message });
    }
};

