import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useFormSubmission = (initialFormData, createAction, updateAction, fetchAction, successMessage, errorMessage) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const featuresArray = formData.features ? formData.features.split(',').map(feature => feature.trim()) : [];

        try {
            let action;
            if (currentEditId !== null) {
                action = updateAction({ id: currentEditId, formData: { ...formData, features: featuresArray } });
            } else {
                action = createAction({ ...formData, features: featuresArray });
            }

            const data = await dispatch(action);
            if (data?.payload?.success) {
                dispatch(fetchAction());
                setFormData(initialFormData);
                setOpenDialog(false);
                setCurrentEditId(null);
                toast({ title: successMessage });
            } else {
                throw new Error(data?.payload?.message || "Unknown error");
            }
        } catch (error) {
            console.error(error);
            toast({ title: errorMessage, description: error.message, variant: "destructive" });
        }
    };

    return {
        formData,
        setFormData,
        currentEditId,
        setCurrentEditId,
        openDialog,
        setOpenDialog,
        handleSubmit,
    };
};

export default useFormSubmission;
