// components/common/ConfirmationModal.js
import { Button } from "../ui/button";

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="dark:bg-hover p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold">Confirmation</h3>
                <p className="my-4">{message}</p>
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-red-900" onClick={onConfirm}>Delete</Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
