import PropTypes from 'prop-types';
import Form from "@/components/common/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addBusinessFormElements } from "@/config";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { createBusiness, fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialFormData = {
    title: "",
    description: "",
    owner: null,
    category: null, 
    email: "",
    country: "",
    state: "",
    city: "",
    map: "",
    phone: "",
    images: null,
};

export function JobDetails({ selectedCategoryIds ,selectedSubCategoryIds  }) {

    const [formData, setFormData] = useState(initialFormData);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();    
        dispatch(
            createBusiness({
                formData: {
                    ...formData,
                    images: uploadedImageUrl,
                    owner: user?.id
                },
                selectedCategoryIds: selectedCategoryIds,
                selectedSubCategoryIds  : selectedSubCategoryIds
            })
        ).then((data) => {
            if (data?.payload?.success) {
                console.log(formData);
                dispatch(fetchAllBusinesses());
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
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    return (
        <section className="py-12 w-full">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="LocationBusiness" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="OnlineBusiness">Online Business</TabsTrigger>
                        <TabsTrigger value="LocationBusiness">Location Business</TabsTrigger>
                    </TabsList>
                    <TabsContent value="OnlineBusiness">
                        <div>Online Business</div>
                    </TabsContent>
                    <TabsContent value="LocationBusiness">
                        <ImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditMode={currentEditId !== null}
                            urlToUpload={'http://localhost:5000/api/BusinessAndService/upload-image'}
                        />
                        <div className="py-6 mx-auto w-[700px]">
                            <Form
                                formControls={addBusinessFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={currentEditId !== null ? "Edit" : "Add"}
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
    selectedCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of strings
    selectedSubCategoryIds : PropTypes.arrayOf(PropTypes.string).isRequired,
};
