import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/hooks/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { fetchAllCategory, fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { deleteBusiness, fetchAllBusinesses, fetchBusinessById, fetchBusinessByUserId, updateBusiness } from "@/store/userSlice/businessServiceSlice";
import { CheckIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function BusinessInfo({ isAdmin }) {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const { singleBusiness } = useSelector((state) => state.singleBusiness);
  const { CategoriesList } = useSelector((state) => state.CategoriesList);
  const { SubCategoriesList } = useSelector((state) => state.SubCategoriesList);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState({
    title: "", description: "", city: "", country: "",
    state: "", email: "", phone: "", facebook: "",
    instagram: "", whatsapp: "", features: "", imageUrl: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Fetch data when businessId changes
  useEffect(() => {
    if (businessId) {
      dispatch(fetchBusinessById(businessId));
      dispatch(fetchAllCategory());
    }
  }, [dispatch, businessId]);

  useEffect(() => {
    if (singleBusiness) {
      setBusinessData((prevData) => ({
        ...prevData,
        ...singleBusiness,
        imageUrl: singleBusiness.images || "",
      }));
      setSelectedCategories(singleBusiness.category?.map(cat => cat._id) || []);
      setSelectedSubCategories(singleBusiness.subCategory || []);
    }
  }, [singleBusiness]);

  // Fetch subcategories when selectedCategories changes
  useEffect(() => {
    selectedCategories.length
      ? dispatch(fetchAllSubCategory({ ids: selectedCategories }))
      : setSelectedSubCategories([]);
  }, [dispatch, selectedCategories]);

  const handleChange = useCallback((field, value) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const handleSubCategoryChange = useCallback((subCategoryId) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  }, []);

  const handleSave = useCallback(async () => {
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : businessData.imageUrl;
    
    try {
      await dispatch(updateBusiness({
        formData: {
          ...businessData,
          images: imageUrl,
          owner: user?.id,
        },
        selectedCategoryIds: selectedCategories,
        selectedSubCategoryIds: selectedSubCategories,
        id: businessId,
      })).unwrap();
  
      // Show success toast if update was successful
      toast({
        title: "Business updated successfully",
        variant: 'success',
      });
    } catch (error) {
      // Handle any errors here, e.g., show an error toast
      toast({
        title: "Failed to update business",
        description: error.message || "Something went wrong.",
        variant: 'error',
      });
    }
  }, [businessData, imageFile, businessId, selectedCategories, selectedSubCategories, user?.id, dispatch, toast]);
  

  const handleDeleteBusiness = useCallback(async () => {
    try {
      const result = await dispatch(deleteBusiness(businessId)).unwrap();
      if (result.success) {
        await dispatch(fetchBusinessByUserId(user?.id));
        toast({ title: "Business deleted successfully", variant: 'success' });
        navigate(-1);
      }
    } catch {
      toast({ title: "Failed to delete business", variant: 'error' });
    }
  }, [dispatch, businessId, user?.id, toast, navigate]);

  const imageUploadComponent = useMemo(() => (
    <ImageUpload
      imageFile={imageFile}
      setImageFile={setImageFile}
      uploadedImageUrl={businessData.imageUrl}
      setUploadedImageUrl={(url) => setBusinessData((prev) => ({ ...prev, imageUrl: url }))}
      urlToUpload={'http://localhost:5000/api/BusinessAndService/upload-image'}
    />
  ), [imageFile, businessData.imageUrl]);

  const renderInputField = useCallback((label, field, type = "text") => (
    <>
      <Label className="font-extrabold text-lg">{label}</Label>
      <Input
        type={type}
        value={businessData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full sm:w-[400px] bg-secondary text-primary rounded-lg outline-none focus:border-none placeholder:text-gray-200"
      />
    </>
  ), [businessData, handleChange]);
  
  // Function to toggle the Accept status
  function handleToggleAcceptStatus() {
    if (businessData) {
        const updatedAcceptValue = !businessData.Accept; // Toggle the current value
        dispatch(updateBusiness({
            formData: {
                ...businessData,
                Accept : updatedAcceptValue
            },                
            selectedCategoryIds: selectedCategories,
            selectedSubCategoryIds : selectedSubCategories,
            id: businessId,
        }))
        
        .then(() => {
            setBusinessData(prev => ({ ...prev, Accept: updatedAcceptValue })); // Update the local state
            dispatch(fetchAllBusinesses());
        });
    }
  }


  return (
    <section className="py-6 sm:py-12 w-full">
      <div className="container mx-auto px-4 bg-white rounded-xl shadow-lg pb-10  sm:h-[700px]">
        <Tabs defaultValue="BasicInfo" className="w-full ">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-secondary  text-primary">
            {["Basic Info", "Location Info", "Category Info", "Contact Info"].map((tab, idx) => (
              <TabsTrigger key={idx} value={tab.replace(" ", "")}>{tab}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="BasicInfo" className="mt-8">
            <div className="flex flex-col gap-2 justify-center items-center mb-3 pb-3 h-full w-full">
              {isAdmin ? (
                <img src={singleBusiness?.images} alt="Business Image" className="h-10 w-10" />
              ) : (
                imageUploadComponent
              )}
              {renderInputField("Title", "title")}
              <Label className="font-extrabold text-lg">Description</Label>
              <Textarea
                value={businessData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
                className="w-full sm:w-[400px] bg-secondary text-primary rounded-lg outline-none focus:border-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="LocationInfo" className="mt-8">
            <div className="flex flex-col gap-2 items-center">
              {renderInputField("Country", "country")}
              {renderInputField("State", "state")}
              {renderInputField("City", "city")}
            </div>
          </TabsContent>

          <TabsContent value="CategoryInfo" className="mt-8">
            <div className="flex flex-col gap-2 items-center">
              <Label className="font-extrabold text-lg">Category</Label>
              <Select onValueChange={handleCategoryChange} multiple>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Select categories" /></SelectTrigger>
                <SelectContent className="bg-primary">
                  {CategoriesList?.map((category) => (
                    <SelectItem className="font-bold" key={category._id} value={category._id}>
                      {selectedCategories.includes(category._id) && <CheckIcon className="h-4 w-4 text-green-500 mr-2" />}
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className="font-extrabold text-lg">Sub Category</Label>
              <Select onValueChange={handleSubCategoryChange} multiple>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Select subcategories" /></SelectTrigger>
                <SelectContent className="bg-primary">
                  {SubCategoriesList?.length ? SubCategoriesList.map((subCategory) => (
                    <SelectItem className="font-bold" key={subCategory._id} value={subCategory._id}>
                      {selectedSubCategories.includes(subCategory._id) && <CheckIcon className="h-4 w-4 text-green-500 mr-2" />}
                      {subCategory.title}
                    </SelectItem>
                  )) : <div>No subcategories available</div>}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="ContactInfo" className="mt-8">
            <div className="flex flex-col gap-2 items-center">
              {renderInputField("Email", "email", "email")}
              {renderInputField("Phone", "phone")}
              {renderInputField("Facebook", "facebook")}
              {renderInputField("Instagram", "instagram")}
              {renderInputField("WhatsApp", "whatsapp")}
            </div>
          </TabsContent>

        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {isAdmin ? null : <Button onClick={handleSave} className="mt-6 bg-secondary text-white p-2 rounded w-full sm:w-auto">Save Changes</Button>}
          <Button onClick={handleDeleteBusiness} className="mt-6 bg-red-900 text-white p-2 rounded w-full sm:w-auto">Delete</Button>
          {isAdmin && (
            <Button onClick={handleToggleAcceptStatus} className={`${businessData?.Accept ? "bg-red-500" : "bg-secondary"} mt-6 text-white p-2 rounded w-full sm:w-auto`}>
              {businessData?.Accept ? "Reject" : "Accept"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

BusinessInfo.propTypes = {
  isAdmin: PropTypes.bool
}

export default BusinessInfo;
