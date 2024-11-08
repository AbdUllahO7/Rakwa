import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PhoneCallIcon, MailIcon, Facebook, PhoneForwarded, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '@/store/userSlice/MessageSlice';
import { useToast } from '@/hooks/use-toast';

// ContactInfo Component
const ContactInfo = ({ business }) => (
    <div className="mt-10 shadow-lg p-5 w-[400px] rounded-lg">
        <h2 className="font-bold text-xl text-secondary">Contact</h2>
        <div className="mt-5 flex-col flex gap-3">
            <Link to="" className="flex gap-5 items-center justify-start text-secondary font-semibold">
                <PhoneCallIcon size="20" className="text-yellow-900" /> {business?.phone}
            </Link>
            <Link to="" className="flex gap-5 items-center justify-start text-secondary font-semibold">
                <MailIcon size="20" className="text-orange-500" /> {business?.email}
            </Link>
            {business?.facebook && (
                <Link to="" className="flex gap-5 items-center justify-start font-semibold text-secondary">
                    <Facebook size="20" className="text-blue-900" /> {business?.facebook}
                </Link>
            )}
            {business?.whatsapp && (
                <Link to="" className="flex gap-5 items-center justify-start font-semibold text-secondary">
                    <PhoneForwarded size="20" className="text-green-900" /> {business?.whatsapp}
                </Link>
            )}
            {business?.instagram && (
                <Link to="" className="flex gap-5 items-center justify-start font-semibold text-secondary">
                    <Instagram size="20" className="text-red-900" /> {business?.instagram}
                </Link>
            )}
        </div>
    </div>
);

ContactInfo.propTypes = {
    business: PropTypes.shape({
        phone: PropTypes.string,
        email: PropTypes.string,
        facebook: PropTypes.string,
        whatsapp: PropTypes.string,
        instagram: PropTypes.string,
        map: PropTypes.string,
    }),
};

// Initial form data for the message
const initialFormData = {
    userSender: '',
    userReceiver: '',
    business: '',
    subject: '',
    message: '',
};

// MessageForm Component
const MessageForm = ({ message, setMessage, handleSubmit }) => (
    <div className="mt-10 shadow-lg w-[400px] rounded-lg p-5">
        <h2 className="font-bold text-xl text-secondary">Message</h2>
        <div className="mt-5 flex-col flex gap-3">
            <Input 
                type="text" 
                placeholder="Subject" 
                value={message.subject} 
                onChange={(e) => setMessage({ ...message, subject: e.target.value })}
            />
            <Textarea 
                placeholder="Type your message here." 
                value={message.message} 
                onChange={(e) => setMessage({ ...message, message: e.target.value })}
            />
            <Button className="bg-secondary" onClick={handleSubmit}>Send</Button>
        </div>
    </div>
);

MessageForm.propTypes = {
    message: PropTypes.shape({
        subject: PropTypes.string,
        message: PropTypes.string,
    }),
    setMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

// BusinessContact Component
const BusinessContact = ({ singleBusiness }) => {
    const [message, setMessage] = useState(initialFormData);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {toast} = useToast()
    // Handle message submission
    const handleSubmit = async () => {
            // You would need to adjust the form data to match the API endpoint requirements
            const formData = {
                ...message,
                userSender: user?.id,  // Add dynamic user ID if available
                userReceiver: singleBusiness?.owner?._id,  // Add dynamic receiver ID if available
                business: singleBusiness?._id,  // Pass business ID
            };
            dispatch(createMessage({ formData: formData   }))
            .then((data) => {
                if (data?.payload?.success) {
                    toast({
                        title: "Message Send successfully",
                        variant: "success",
                    });
                    setMessage(initialFormData)
                }
            });
    };

    return (
        <div className="flex flex-col mt-10 justify-center items-center w-[600px]">
            {/* Map Section */}
            {singleBusiness?.map && (
                <div className="">
                    <iframe
                        src={singleBusiness?.map}
                        width="400"
                        height="300"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            )}

            {/* Contact Information */}
            <ContactInfo business={singleBusiness} />

            {/* Message Form */}
            <MessageForm message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
        </div>
    );
};

BusinessContact.propTypes = {
    singleBusiness: PropTypes.shape({
        map: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        facebook: PropTypes.string,
        whatsapp: PropTypes.string,
        instagram: PropTypes.string,
        _id: PropTypes.string.isRequired, // Ensure business ID is passed
    }),
};

export default BusinessContact;
