import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"; // Ensure DialogTitle is imported
import { Separator } from "@radix-ui/react-select";
import PropTypes from "prop-types";
import { setDetails } from "@/store/userSlice/businessServiceSlice";
import { useId } from "react"; // Import useId for unique IDs
import { Button } from "../ui/button";
import { Contact, Info, ListCollapse, MapPinCheck } from "lucide-react";

function BusinessDialog({ open, setOpen, BusinessDetails, onToggleAcceptStatus , handleDeleteBusiness , isUser  , openTheEditDialog}) {
    const dispatch = useDispatch();
    const descriptionId = useId(); // Generate a unique ID for the description

    function handleDialogClose() {
        setOpen(false);
        dispatch(setDetails());
    }


    return (
        <Dialog open={open} onOpenChange={handleDialogClose} className="">
            {/* Add DialogTitle here */}
            <DialogTitle></DialogTitle>
            <DialogContent
                className="flex justify-evenly  w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[800px]"
                aria-describedby={descriptionId} // Link the description
            >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg w-[350px]">
                    <img
                        src={BusinessDetails?.images} // Ensure images is an array
                        alt={BusinessDetails?.title}
                        width={300}
                        height={300}
                        className="aspect-square  object-cover"
                    />
                </div>

                {/* Product Information */}
                <div className="">
                        <div>
                        <h1 className="text-3xl font-extrabold ">{BusinessDetails?.title}</h1>
                        <p id={descriptionId} className="text-muted-foreground text-2xl mb-5 mt-4">
                            {BusinessDetails?.description || "No description available."}
                        </p>
                        </div>
                    <div className="">
                        <p className={`text-3xl font-bold text-primary ${BusinessDetails?.salePrice > 0 ? 'line-through' : ''}`}>
                            {BusinessDetails?.price}
                        </p>
                        {BusinessDetails?.salePrice > 0 && (
                            <p className="text-2xl font-bold text-muted-foreground">${BusinessDetails?.salePrice}</p>
                        )}
                    </div>
                    <Separator />
                    {/* Location */}
                    <div className="max-h-[300px] overflow-auto ">
                        <h2 className="text-xl font-bold mb-4 bg-secondary w-fit p-2 text-primary rounded-xl flex gap-2 items-center"> <MapPinCheck />Location</h2>

                        <div className="">
                            <div className="flex gap-10 p-2">
                                <span><span className="font-bold  p-1 rounded-lg">Country :</span> {BusinessDetails?.country}</span>
                                <span><span className="font-bold  p-1 rounded-lg">state :</span> {BusinessDetails?.state}</span>
                                <span><span className="font-bold  p-1 rounded-lg">city :</span> {BusinessDetails?.country}</span>

                            </div>
                            
                        </div>
                    </div>
                    <div className="mt-3 max-h-[300px] overflow-auto ">
                        <h2 className="text-xl font-bold mb-4 bg-secondary w-fit p-2 text-primary rounded-xl flex gap-2 items-center"><Contact /> Contact</h2>
                            <div className="flex gap-10 p-2">
                                <span><span className="font-bold  p-1 rounded-lg">Email :</span> {BusinessDetails?.email}</span>
                                <span><span className="font-bold  p-1 rounded-lg">Phone :</span> {BusinessDetails?.phone}</span>
                            
                        </div>
                    </div>
                    <div className="mt-3 max-h-[300px] overflow-auto ">
                        <h2 className="text-xl font-bold mb-4 bg-secondary w-fit p-2 text-primary rounded-xl flex gap-2 items-center"><Info />Other Info</h2>
                        <div className="grid gap-6">
                            {/* Location content goes here */}
                        </div>
                        <div className="">
                            <div className=" flex gap-2 p-2 flex-col">
                                <div>
                                <span className="font-bold  p-1 rounded-lg">Category :</span>{BusinessDetails?.category?.map((cat, index) => (
                                        <span key={index}>{cat?.title}{index < BusinessDetails.category.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </div>
                                <span>
                                <span className="font-bold  p-1 rounded-lg">SubCategory :</span> {BusinessDetails?.subCategoryDetails?.map((subCat, index) => (
                                        <span key={index}>{subCat?.title}{index < BusinessDetails.subCategoryDetails.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </span>
                                <div className="flex flex-col">
                                    <span><span className="font-bold  p-1 rounded-lg ">Owner:</span>{BusinessDetails?.owner?.userName || 'N/A'}</span>
                                    <span><span className="font-bold  p-1 rounded-lg">Accept:</span> {BusinessDetails?.Accept ? 'Accept' : 'Not Accept'}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                
                    <div className="mt-3 max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4 bg-secondary w-fit p-2 text-primary rounded-xl flex gap-2 items-center"><ListCollapse />More Details</h2>
                    
                        <div className=" ">
                            <div className="flex gap-5">
                                    {/* Add a button to toggle Accept status */}
                                    {
                                        isUser ?"": <Button onClick={onToggleAcceptStatus} className={`${BusinessDetails?.Accept ? "bg-red-500" : "bg-secondary"}`}>
                                        {BusinessDetails?.Accept ? "Reject" : "Accept"}
                                    </Button>               
                                    }
                            <Button className="bg-red-900" 
                                onClick={() => handleDeleteBusiness(BusinessDetails?._id)}
                                >
                                        delete
                            </Button>        
                            <Button className="bg-green-900" 
                                onClick={() => openTheEditDialog(true)}
                                >
                                        Edit
                            </Button>        
                            <Button className="bg-yellow-900" 
                                // onClick={() => openTheEditDialog(true)}
                                >
                                        Show All Details
                            </Button>        
                        </div>
                        
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

BusinessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    BusinessDetails: PropTypes.object,
    onToggleAcceptStatus : PropTypes.func,
    handleDeleteBusiness : PropTypes.func,
    isUser : PropTypes.bool,
    openTheEditDialog: PropTypes.func
};

export default BusinessDialog;
