import PropTypes from 'prop-types';
import Form from "@/components/common/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addBusinessFormElements, addOnlineBusinessFormElements } from "@/config";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { createBusiness } from "@/store/userSlice/businessServiceSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialFormData = {
    title: "",
    description: "",
    BusinessType: "Location",
    owner: null,
    category: null, 
    email: "",
    country: "",
    state: "",
    city: "",
    fullAddress : "",
    map: "",
    phone: "",
    images: null,
};

export function JobDetails({ selectedCategoryIds, selectedSubCategoryIds }) {

    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    function handleTabChange(value) {
        console.log(value)
        setFormData((prevData) => ({
            ...prevData,
            BusinessType: value === "LocationBusiness" ? "Location" : "Online",
        }));
    }

    function onSubmit(event) {
        event.preventDefault();
    
        // Prepare data based on business type
        const formSubmissionData = {
            ...formData,
            images: uploadedImageUrl,
            owner: user?.id,
        };
    
        // Remove or set default values for location-specific fields for Online Business
        if (formData.BusinessType === "Online") {
            delete formSubmissionData.country;
            delete formSubmissionData.state;
            delete formSubmissionData.city;
            delete formSubmissionData.map;
            delete formSubmissionData.fullAddress;

            // Ensure all required online business fields are set, with defaults if necessary
            formSubmissionData.whatsapp = formData.whatsapp || "";
            formSubmissionData.facebook = formData.facebook || "";
            formSubmissionData.instagram = formData.instagram || "";
        } else {
            // Remove social fields if it's a Location Business
            delete formSubmissionData.whatsapp;
            delete formSubmissionData.facebook;
            delete formSubmissionData.instagram;
        }
    
        // Dispatch action with prepared formSubmissionData
        dispatch(createBusiness({ formData: formSubmissionData , selectedCategoryIds : selectedCategoryIds , selectedSubCategoryIds : selectedSubCategoryIds  }))
            .then((data) => {
                if (data?.payload?.success) {
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: "Business added successfully",
                        variant: "success",
                    });
                    navigate('/user/reviewJobPage');
                }
            });
    }
    

    function isFormValid() {
        const requiredFields = formData.BusinessType === "Online"
            ? ["title", "description", "email"] // Required for Online
            : ["title", "description", "email", "country", "state", "city" , "fullAddress"]; // Required for Location
    
        return requiredFields.every((field) => formData[field] !== "");
    }
    

    return (
        <section className="py-12 w-full">
            <div className="container mx-auto px-4">
                <Tabs
                    defaultValue="LocationBusiness"
                    onValueChange={handleTabChange}
                    className="w-full shadow-xl bg-cover bg-center relative"
                >
                    <div className="absolute inset-0 bg-secondary bg-opacity-20 backdrop-blur-sm"></div> {/* Blur overlay */}
                    <TabsList className="grid w-full grid-cols-2 bg-secondary text-primary relative z-10">
                        <TabsTrigger value="OnlineBusiness">Online Business</TabsTrigger>
                        <TabsTrigger value="LocationBusiness">Location Business</TabsTrigger>
                    </TabsList>

                    <TabsContent value="LocationBusiness" className="relative z-10">
                        <ImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditMode={null}
                            urlToUpload={'http://localhost:5000/api/BusinessAndService/upload-image'}
                        />
                        <div className="py-6 mx-auto lg:max-w-[700px]">
                            <Form
                                formControls={addBusinessFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText="Add"
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="OnlineBusiness" className="relative z-10">
                        <ImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditMode={null}
                            urlToUpload={'http://localhost:5000/api/BusinessAndService/upload-image'}
                        />
                        <div className="py-6 mx-auto lg:max-w-[700px]">
                            <Form
                                formControls={addOnlineBusinessFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText="Add"
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}

// Define PropTypes for the JobDetails component
JobDetails.propTypes = {
    selectedCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSubCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
