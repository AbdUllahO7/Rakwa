import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessCard from "@/components/common/BusinessCard";
import BusinessDialog from "@/components/common/BusinessDialog";
import Form from "@/components/common/Form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { 
    deleteBusiness, 
    fetchBusinessByUserId, 
    updateBusiness 
} from "@/store/userSlice/businessServiceSlice";
import { addBusinessFormElements } from "@/config";

const initialFormData = {
    title: "",
    description: "",
    owner: null,
    email: "",
    country: "",
    state: "",
    city: "",
    map: "",
    phone: "",
    images: "",
};



function UserBusiness() {
    // State management with meaningful defaults
    const [state, setState] = useState({
        currentEditId: null,
        imageFile: null,
        uploadedImageUrl: "",
        imageLoadingState: false,
        openCreateProductDialog: false,
        openProductDetailsDialog: false,
        businessDetails: null,
        selectedCategoryIds: [],
        selectedSubCategoryIds: [],
        formData: initialFormData,
    });

    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);
    const { user } = useSelector(state => state.auth);
    const { toast } = useToast();

    // Memoized handlers
    const handleGetBusinessDetails = useCallback((businessId) => {
        const selectedBusiness = businessList.find(item => item._id === businessId);
        if (!selectedBusiness) return;

        setState(prev => ({
            ...prev,
            businessDetails: selectedBusiness,
            formData: {
                ...initialFormData,
                ...Object.keys(initialFormData).reduce((acc, key) => ({
                    ...acc,
                    [key]: selectedBusiness[key] || initialFormData[key]
                }), {})
            },
            uploadedImageUrl: selectedBusiness.images || "",
            selectedCategoryIds: selectedBusiness.category.map(cat => cat._id),
            selectedSubCategoryIds: selectedBusiness.subCategory,
            openProductDetailsDialog: true
        }));
    }, [businessList]);

    const handleDeleteBusiness = useCallback(async (businessId) => {
        try {
            const result = await dispatch(deleteBusiness(businessId)).unwrap();
            if (result.success) {
                await dispatch(fetchBusinessByUserId(user?.id));
                setState(prev => ({
                    ...prev,
                    openProductDetailsDialog: false
                }));
                toast({
                    title: "Business deleted successfully",
                    variant: 'success',
                });
            }
        } catch (error) {
            toast({
                title: "Failed to delete business" ,
                variant: 'error',
            });
        }
    }, [dispatch, user?.id, toast]);

    const handleEditBusiness = useCallback(async (event) => {
        event.preventDefault();
        const { formData, uploadedImageUrl, selectedCategoryIds, selectedSubCategoryIds, businessDetails } = state;

        try {
            const result = await dispatch(updateBusiness({
                formData: {
                    ...formData,
                    images: uploadedImageUrl,
                    owner: user?.id,
                },
                selectedCategoryIds,
                selectedSubCategoryIds,
                id: businessDetails?._id,
            })).unwrap();

            if (result.success) {
                toast({
                    title: "Updated successfully",
                    variant: 'error',
                });
                await dispatch(fetchBusinessByUserId(user?.id));
                setState(prev => ({
                    ...prev,
                    imageFile: null,
                    openProductDetailsDialog: false,
                    openCreateProductDialog: false,
                }));
            }
        } catch (error) {
            toast({
                title: "Failed to update business",
                variant: 'error',
            });
        }
    }, [dispatch, state, user?.id, toast]);

    // Effects
    useEffect(() => {
        if (user?.id) {
            dispatch(fetchBusinessByUserId(user.id));
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (state.openCreateProductDialog && state.currentEditId) {
            const selectedBusiness = businessList.find(item => item._id === state.currentEditId);
            if (selectedBusiness) {
                setState(prev => ({
                    ...prev,
                    formData: {
                        ...initialFormData,
                        ...Object.keys(initialFormData).reduce((acc, key) => ({
                            ...acc,
                            [key]: selectedBusiness[key] || initialFormData[key]
                        }), {})
                    },
                    uploadedImageUrl: selectedBusiness.images || "",
                    selectedCategoryIds: selectedBusiness.category.map(cat => cat._id),
                    selectedSubCategoryIds: selectedBusiness.subCategory,
                }));
            }
        }
    }, [state.openCreateProductDialog, state.currentEditId, businessList]);

    // Memoized components
    const businessCards = useMemo(() => (
        businessList.map(business => (
            <BusinessCard
                key={business._id}
                handleGetBusinessDetails={() => handleGetBusinessDetails(business._id)}
                business={business}
                handleDeleteBusiness={handleDeleteBusiness}
            />
        ))
    ), [businessList, handleGetBusinessDetails, handleDeleteBusiness]);

    const imageUploadComponent = useMemo(() => (
        <ImageUpload
            imageFile={state.imageFile}
            setImageFile={(file) => setState(prev => ({ ...prev, imageFile: file }))}
            uploadedImageUrl={state.uploadedImageUrl}
            setUploadedImageUrl={(url) => setState(prev => ({ ...prev, uploadedImageUrl: url }))}
            setImageLoadingState={(loading) => setState(prev => ({ ...prev, imageLoadingState: loading }))}
            imageLoadingState={state.imageLoadingState}
            urlToUpload={'http://localhost:5000/api/BusinessAndService/upload-image'}
        />
    ), [state.imageFile, state.uploadedImageUrl, state.imageLoadingState]);

    return (
        <div className="flex justify-center gap-10">
            {businessCards}

            <BusinessDialog
                open={state.openProductDetailsDialog}
                setOpen={(open) => setState(prev => ({ ...prev, openProductDetailsDialog: open }))}
                BusinessDetails={state.businessDetails}
                handleDeleteBusiness={handleDeleteBusiness}
                isUser={true}
                openTheEditDialog={() => setState(prev => ({
                    ...prev,
                    openCreateProductDialog: true,
                    currentEditId: state.businessDetails?._id
                }))}
            />

            <Sheet
                open={state.openCreateProductDialog}
                onOpenChange={(open) => setState(prev => ({
                    ...prev,
                    openCreateProductDialog: open,
                    currentEditId: null
                }))}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {state.currentEditId ? "Edit Business" : "Add New Business"}
                        </SheetTitle>
                    </SheetHeader>
                    
                    {imageUploadComponent}

                    <div className="py-6">
                        <Form
                            formControls={addBusinessFormElements}
                            formData={state.formData}
                            setFormData={(data) => setState(prev => ({ ...prev, formData: data }))}
                            buttonText={state.currentEditId ? "Edit" : "Add"}
                            onSubmit={handleEditBusiness}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default UserBusiness;