import BusinessCard from "@/components/common/BusinessCard";
import BusinessDialog from "@/components/common/BusinessDialog";
import { useToast } from "@/hooks/use-toast";
import { deleteBusiness, fetchAllBusinesses, updateBusiness } from "@/store/userSlice/businessServiceSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminUserBusiness() {
    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);
    const [businessDetails, setBusinessDetails] = useState(null); // State for selected business details
    const toast = useToast();

    useEffect(() => {
        dispatch(fetchAllBusinesses());
    }, [dispatch]);

    


    // Handle fetching product details when a product is clicked
    function handleGetBusinessDetails(getCurrentProductId) {
        const selectedBusiness = businessList.find(item => item._id === getCurrentProductId);
        if (selectedBusiness) {
            setBusinessDetails(selectedBusiness); // Set selected business details
            setOpenProductDetailsDialog(true); // Open dialog
        }
    }

    // Function to toggle the Accept status
    function handleToggleAcceptStatus() {
        if (businessDetails) {
            const updatedAcceptValue = !businessDetails.Accept; // Toggle the current value
            dispatch(updateBusiness({
                id: businessDetails._id,
                formData: {
                    ...businessDetails,
                    Accept : updatedAcceptValue
                },                
                selectedCategoryIds: businessDetails.category, // Assuming categories are part of businessDetails
            }))
            .then(() => {
                setBusinessDetails(prev => ({ ...prev, Accept: updatedAcceptValue })); // Update the local state
                dispatch(fetchAllBusinesses());
            });
        }
    }

    function handleDeleteBusiness(getCurrentProductId) {
        dispatch(deleteBusiness(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllBusinesses());
                setOpenProductDetailsDialog(false);
                    toast({
                    title: "Category deleted successfully",
                    variant: 'success',
                });
            }
        });
    }


    return (
        <div className="flex justify-center gap-10">
            {businessList && businessList.length > 0
                ? businessList.map(item => (
                    <BusinessCard
                        key={item?._id}
                        handleGetBusinessDetails={() => handleGetBusinessDetails(item._id)}
                        business={item}
                        handleDeleteBusiness = {handleDeleteBusiness}
                    />
                ))
                : null}
            <BusinessDialog
                open={openProductDetailsDialog}
                setOpen={setOpenProductDetailsDialog}
                BusinessDetails={businessDetails} // Pass the selected business details
                onToggleAcceptStatus={handleToggleAcceptStatus} // Pass the toggle function to the dialog
                handleDeleteBusiness = {handleDeleteBusiness}

            />
        </div>
    );
}

export default AdminUserBusiness;



