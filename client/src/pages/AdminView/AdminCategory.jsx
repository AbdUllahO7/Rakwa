import AdminCategoryList from "@/components/AdminComponents/AdminCategoryList";
import ListViewSubCategory from "@/components/AdminComponents/ListViewSubCategory";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addCategoryFormElements, addSubCategoryFormElements } from "@/config";
import stables from "@/constants/stables";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import {
    createCategory,
    createSubCategory,
    deleteCategory,
    deleteSubCategory,
    fetchAllCategory,
    fetchAllSubCategory,
    updateCategory,
} from "@/store/adminSlice/AdminCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
};

const initialSubCategoryFormData = {
    title: "",
    image: null,
};

function AdminCategory() {
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
    const [subCategoryFormData, setSubCategoryFormData] = useState(initialSubCategoryFormData);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // State to hold the currently selected category for subcategories
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { CategoriesList } = useSelector((state) => state.CategoriesList);


    function onSubmit(event) {
        event.preventDefault();
        currentEditId !== null
            ? dispatch(
                updateCategory({
                    id: currentEditId,
                    formData,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllCategory());
                    setFormData(initialFormData);
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    toast({
                        title: "Category edited successfully",
                    });
                }
            })
            : dispatch(
                createCategory({
                    ...formData,
                    image: uploadedImageUrl,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllCategory());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Category added successfully",
                    });
                }
            });
    }

    function handleDeleteCategory(getCurrentProductId) {
        dispatch(deleteCategory(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllCategory());
                toast({
                    title: "Category deleted successfully",
                    variant: 'success',
                });
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    function onSubCategorySubmit(event) {
        event.preventDefault();
        const formDataToSubmit = {
            title: subCategoryFormData.title,
            image: uploadedImageUrl,
        };

        dispatch(
            createSubCategory({
                id: selectedCategory, // Use selected category ID
                formData: formDataToSubmit,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllSubCategory());
                setOpenSubCategoryDialog(false);
                setSubCategoryFormData(initialSubCategoryFormData);
                toast({
                    title: "Subcategory added successfully",
                });
            } else {
                toast({
                    title: "Failed to add Subcategory",
                    description: data?.payload?.message || "Unknown error",
                    variant: "destructive",
                });
            }
        }).catch(error => {
            console.error("Error creating subcategory:", error);
            toast({
                title: "Error",
                description: "There was an error creating the subcategory.",
                variant: "destructive",
            });
        });
    }

    function handleDeleteSubCategory(categoryId, subCategoryId) {
        dispatch(deleteSubCategory({ categoryId, subCategoryId })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllSubCategory({id : selectedCategory}));
                toast({
                    title: "Subcategory deleted successfully",
                    variant: 'success',
                });
            } else {
                toast({
                    title: "Failed to delete Subcategory",
                    description: data?.payload?.message || "Unknown error",
                    variant: "destructive",
                });
            }
        }).catch(error => {
            console.error("Error deleting subcategory:", error);
            toast({
                title: "Error",
                description: "There was an error deleting the subcategory.",
                variant: "destructive",
            });
        });
    }


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    return (
        <div>
            <div className="mb-5 flex justify-end w-full">
                <Button className="bg-secondary dark:text-primary" onClick={() => setOpenCreateProductDialog(true)}>Add New Category </Button>
            </div>
            <section className='py-12  dark:bg- '>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                    <div className="flex flex-wrap justify-evenly items-center gap-5 ">
                        {
                            CategoriesList && CategoriesList.length > 0 ?
                                CategoriesList.map(category => (
                                    <AdminCategoryList
                                        Category={category}
                                        key={category._id}
                                        setCurrentEditId={setCurrentEditId}
                                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                                        setFormData={setFormData}
                                        handleDeleteCategory={handleDeleteCategory}
                                        openSubCategoryDialog={() => {
                                            setSelectedCategory(category._id); // Set the currently selected category ID
                                            setOpenSubCategoryDialog(true); // Open the subcategory dialog
                                        }}
                                        openSubCategoryListDialog={() => {
                                            setSelectedCategory(category._id);
                                            dispatch(fetchAllSubCategory(category._id)); // Fetch subcategories for the selected category
                                        }}
                                    />
                                )) : null
                        }
                    </div>
                </div>
            </section>
            
            {/* Category Sheet */}
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={() => {
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    setFormData(initialFormData);
                    setUploadedImageUrl(""); // Reset uploadedImageUrl here
                }}
            >
                <SheetContent side="right" className="overflow-auto ">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditId !== null ? "Edit Category" : "Add New Category"}
                        </SheetTitle>
                    </SheetHeader>

                    <ImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditId !== null}
                    />

                    <div className="py-6">
                        <Form
                            formControls={addCategoryFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditId !== null ? "Edit" : "Add"}
                            onSubmit={onSubmit}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                
                </SheetContent>
        
            </Sheet>

            {/* Subcategory Dialog */}
            <Sheet
                open={openSubCategoryDialog}
                onOpenChange={() => {
                    setOpenSubCategoryDialog(false);
                    setSubCategoryFormData(initialSubCategoryFormData);
                }}
            >
                <SheetContent side="right" className="overflow-auto ">
                    <SheetHeader>
                        <SheetTitle>Add Subcategory</SheetTitle>
                    </SheetHeader>

                    <ImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        urlToUpload={`${stables.API_BASE_URL}AdminCategories/upload-image`}

                    />

                    <div className="py-6">
                        <Form
                            formControls={addSubCategoryFormElements}
                            formData={subCategoryFormData}
                            setFormData={setSubCategoryFormData}
                            buttonText="Add Subcategory"
                            onSubmit={onSubCategorySubmit}
                        />
                    </div>
                        <div >
                            <ListViewSubCategory 
                                categoryId={selectedCategory}
                                handleDeleteSubCategory = {handleDeleteSubCategory}
                            />
                        </div>
                </SheetContent>
            </Sheet>


        </div>
    );
}

export default AdminCategory;
