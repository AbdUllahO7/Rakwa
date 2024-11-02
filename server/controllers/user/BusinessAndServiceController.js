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
    const requiredFields = ['title', 'description', 'category', 'owner', 'email', 'country', 'state', 'city', 'images', 'subCategory'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    try {
        const { category, subCategory } = req.body;

        // Validate each category and subCategory
        const invalidCategories = await Promise.all(
            category.map(async (catId) => {
                const categoryData = await AdminCategories.findById(catId);
                return categoryData ? null : catId;
            })
        );
        
        if (invalidCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid category IDs: ${invalidCategories.filter(Boolean).join(', ')}` });
        }

        const invalidSubCategories = await Promise.all(
            subCategory.map(async (subCatId) => {
                const validSubCategory = await AdminCategories.findOne({ "subCategories._id": subCatId });
                return validSubCategory ? null : subCatId;
            })
        );

        if (invalidSubCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid subCategory IDs: ${invalidSubCategories.filter(Boolean).join(', ')}` });
        }

        // Create and save the new business
        const newBusiness = new BusinessAndService({ ...req.body });
        const savedBusiness = await newBusiness.save();

        res.status(201).json({ success: true, data: savedBusiness });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a single business by ID with subCategory details
exports.getBusinessById = async (req, res) => {
    try {
        const business = await BusinessAndService.findById(req.params.id)
            .populate('owner')
            .populate({
                path: 'category',
                populate: {
                    path: 'subCategories',
                    match: { _id: new mongoose.Types.ObjectId(req.body.subCategory) }, // Corrected ObjectId instantiation
                    select: 'title image'
                }
            });

        if (!business) return res.status(404).json({ success: false, message: 'Business not found' });
        
        res.status(200).json({ success: true, data: business });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get all businesses with user, category, and subCategory details

exports.getBusinessWithDetails = async (req, res) => {
    try {
        // Step 1: Find all businesses with the selected categories and subCategories IDs
        const businesses = await BusinessAndService.find()
            .populate('owner') // Populate owner details
            .populate({
                path: 'category', // Populate main category details
                select: 'title image',
            });

        // Step 2: Populate subCategory details and format categories
        const businessDataWithCategoriesAndSubCategories = await Promise.all(
            businesses.map(async (business) => {
                // Find all categories corresponding to the category IDs in the business
                const categories = await AdminCategories.find({
                    _id: { $in: business.category },
                });

                // Extract category details and IDs
                const categoryDetails = categories.map(category => ({
                    _id: category._id,
                    title: category.title,
                    image: category.image,
                }));

                // Extract subCategory details from the matched categories
                const subCategoryDetails = categories.flatMap(category => 
                    category.subCategories.filter(subCat => 
                        business.subCategory.includes(subCat._id.toString())
                    ).map(subCat => ({
                        _id: subCat._id,
                        title: subCat.title,
                        // Include other properties you want to include
                    }))
                );

                return {
                    ...business.toObject(),
                    category: business.category, // Include category IDs (array of IDs)
                    categoryDetails, // Include the category details
                    subCategory: business.subCategory, // Include subcategory IDs (array of IDs)
                    subCategoryDetails, // Include the subcategory details
                };
            })
        );

        res.status(200).json({ success: true, data: businessDataWithCategoriesAndSubCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





// Update a business by ID

exports.updateBusiness = async (req, res) => {
    const requiredFields = ['title', 'description', 'category', 'owner', 'email', 'country', 'state', 'city', 'images', 'subCategory'];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);

    if (missingFields.length > 0) {
        return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    try {
        const { category, subCategory } = req.body;

        // Validate each category and subCategory
        const invalidCategories = await Promise.all(
            category.map(async (catId) => {
                const categoryData = await AdminCategories.findById(catId);
                return categoryData ? null : catId;
            })
        );

        if (invalidCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid category IDs: ${invalidCategories.filter(Boolean).join(', ')}` });
        }

        const invalidSubCategories = await Promise.all(
            subCategory.map(async (subCatId) => {
                const validSubCategory = await AdminCategories.findOne({ "subCategories._id": subCatId });
                return validSubCategory ? null : subCatId;
            })
        );

        if (invalidSubCategories.filter(Boolean).length > 0) {
            return res.status(400).json({ success: false, message: `Invalid subCategory IDs: ${invalidSubCategories.filter(Boolean).join(', ')}` });
        }

        // Update the business only if validation is successful
        const updatedBusiness = await BusinessAndService.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
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

