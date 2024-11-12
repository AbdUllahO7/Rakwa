import AdminViewPricingPlan from "@/components/AdminComponents/AdminViewPricingPlan";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { pricingPlanFormElements } from "@/config";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { createPricingPlan, deletePricingPlan, fetchAllPricingPlan, updatePricingPlan } from "@/store/adminSlice/AdminPricingPlan";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    title: "",
    price: "",
    frequency: "",
    features: [], // Start as an array
};

function AdminPricingPlan() {
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { PricingPlanList } = useSelector((state) => state.PricingPlanList);


    function onSubmit(event) {
        event.preventDefault();
    
        // Check if formData.features is an array
        const featuresArray = Array.isArray(formData.features)
            ? formData.features
            : formData.features.split(',').map(feature => feature.trim());
    
        currentEditId !== null
            ? dispatch(
                updatePricingPlan({
                    id: currentEditId,
                    formData: {
                        ...formData,
                        features: featuresArray, // Update the features array
                    },
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllPricingPlan());
                    setFormData(initialFormData);
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    toast({
                        title: "Pricing plan edited successfully",
                    });
                }
            })
            : dispatch(
                createPricingPlan({
                    ...formData,
                    features: featuresArray, // Ensuring features is an array
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllPricingPlan());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Pricing plan added successfully",
                    });
                }
            });
    }
    
    

    const handleDeletePlan = (planId) => {
        dispatch(deletePricingPlan(planId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllPricingPlan());
                toast({ title: "Pricing plan deleted successfully", variant: 'success' });
            }
        });
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setOpenCreateProductDialog(false);
        setCurrentEditId(null);
        setUploadedImageUrl("");
        setImageFile(null);
    };

    const isFormValid = () => Object.values(formData).every((value) => value !== "");

    useEffect(() => {
        dispatch(fetchAllPricingPlan());
    }, [dispatch]);

    return (
        <div>
            <div className="mb-5 flex justify-end w-full">
                <Button className="bg-secondary dark:text-primary" onClick={() => setOpenCreateProductDialog(true)}>Add New PricingPlan</Button>
            </div>
            <section className='py-12 '>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                <div className="flex flex-wrap justify-evenly items-center gap-5">
                    {PricingPlanList && PricingPlanList.length > 0 ? (
                        PricingPlanList.map(plan => (
                            <AdminViewPricingPlan
                                PricingPlan={{
                                    ...plan,
                                    price: Number(plan.price), // Convert price to number
                                }}
                                key={plan._id}
                                setCurrentEditId={setCurrentEditId}
                                setOpenCreateProductDialog={setOpenCreateProductDialog}
                                setFormData={setFormData}
                                handleDeleteCategory={handleDeletePlan}
                            />
                        ))
                    ) : null}
                </div>

                </div>
            </section>

            {/* Category Dialog */}
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={resetForm}
            >
                <SheetContent side="right" className="overflow-auto ">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditId !== null ? "Edit Pricing Plan" : "Add New Pricing Plan"}
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
                            formControls={pricingPlanFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditId !== null ? "Edit" : "Add"}
                            onSubmit={onSubmit}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default AdminPricingPlan;
