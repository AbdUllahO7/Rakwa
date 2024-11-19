import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createMessage, deleteMessage, getMessagesByUser, updateMessage } from '@/store/userSlice/MessageSlice';
import { Send, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageReplayDialog from './MessageReplayDialog';
import { useNavigate } from 'react-router-dom';

function UserMessages() {
    const { user } = useSelector(state => state.auth);
    const { messages } = useSelector(state => state.messages);
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [selectedMessage, setSelectedMessage] = useState(null); // To store the message you are replying to
    const [replyMessage, setReplyMessage] = useState(''); // To store the reply message input
    const [replyMessageSubject, setReplyMessageSubject] = useState(''); // To store the reply message input
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { toast } = useToast();

    useEffect(() => {
        dispatch(getMessagesByUser({userId : user?._id}));
    }, [dispatch, user?._id]);

    function handleDeleteMessage(messageId) {
        dispatch(deleteMessage(messageId)).then(data => {
            if (data?.payload?.success) {
                dispatch(getMessagesByUser({userId : user?._id}));
                toast({
                    title: "Message deleted successfully",
                    variant: 'success',
                });
            } else {
                toast({
                    title: "Failed to delete Message",
                    description: data?.payload?.message || "Unknown error",
                    variant: "destructive",
                });
            }
        }).catch(error => {
            console.error("Error deleting Message:", error);
            toast({
                title: "Error",
                description: "There was an error deleting the Message.",
                variant: "destructive",
            });
        });
    }

    // Open dialog and set selected message when replying
    function handleReply(message) {
        setSelectedMessage(message); // Store the message you want to reply to
        setOpenDialog(true); // Open the dialog
    }

    // Handle reply submission (this is a placeholder for now)
    function handleSendReply() {
        if (replyMessage.trim()) {
            // Prepare form data for the reply message
            const formData = {
                message: replyMessage,
                subject: replyMessageSubject,
                userSender: user?._id,  // Sender ID
                userReceiver: selectedMessage?.userSender?._id, // Receiver ID
                business: selectedMessage?.business?._id,  // Business ID
            };
    
            // Dispatch the action to create a new message (sending the reply)
            dispatch(createMessage({ formData: formData }))
                .then((data) => {
                    if (data?.payload?.success) {
                        toast({
                            title: "Message Sent Successfully",
                            variant: "success",
                        });
                        // Now that the message is sent, update the original message to mark as replied
                        dispatch(updateMessage({ messageId: selectedMessage._id, formData: { replayed: true } }))
                            .then((updateResponse) => {
                                if (updateResponse?.payload?.success) {
                                    console.log("Message marked as replied");
                                    // Optionally, you can trigger a refresh of messages or any other state update
                                }
                            });
                            dispatch(getMessagesByUser({userId : user?._id}));


                    }
                })
                .catch((error) => {
                    console.error("Error sending reply:", error);
                    toast({
                        title: "Error",
                        description: "There was an error sending the reply.",
                        variant: "destructive",
                    });
                });
    
            // Clear reply message and subject inputs
            setReplyMessage('');
            setReplyMessageSubject('');
            setOpenDialog(false); // Close the dialog after sending the reply
            dispatch(getMessagesByUser(user?._id)); // Refresh messages
        } else {
            toast({
                title: "Please write a message",
                variant: "destructive",
            });
        }
    }


    return (
        <div>
            <div className='flex w-full justify-end'>
                <Button className="bg-secondary dark:text-primary" onClick = {()=> navigate('/userProfile/AllMessages')}>Show All Messages</Button>
            </div>
            <div className='flex justify-center gap-10 flex-wrap w-full'>
            {messages.messages && messages.messages.length > 0 ? (
            messages.messages
            .filter((message) => message.userReceiver._id === user?._id && message.replayed === false) // Filter only messages for the current user and with replayed === false
            .map((message, index) => (
                <div
                className="shadow-xl h-fit w-[300px] flex flex-col justify-center items-center gap-7 p-10 dark:bg-secondary"
                key={index}
                >
                <Avatar className="bg-black">
                    <AvatarFallback className="bg-secondary dark:bg-primary dark:text-secondary text-primary cursor-pointer font-extrabold">
                    {message.userSender['userName'][0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="text-secondary font-semibold text-lg text-center dark:text-primary">
                    You have an unread message awaiting your reply from {message.userSender['userName']}
                </span>
                <p className="text-sm text-gray-500 dark:text-primary">
                    Sent on: {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                </p>
                <div className="flex justify-evenly w-full">
                    {/* Reply Button to open the dialog */}
                    <Button className="bg-secondary  dark:bg-primary" onClick={() => handleReply(message)}>
                    <Send className="mr-2" /> Reply
                    </Button>
                    <Button className="bg-red-800 dark:text-primary" onClick={() => handleDeleteMessage(message?._id)}>
                    <Trash2 className="mr-2" /> Delete
                    </Button>
                </div>
                </div>
            ))
                ) : (
                    <div>No unread messages awaiting your reply.</div> // Optional message when there are no messages
                )}

            {/* Dialog */}
            <MessageReplayDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedMessage={selectedMessage}
                replyMessageSubject={replyMessageSubject}
                setReplyMessageSubject={setReplyMessageSubject}
                replyMessage={replyMessage}
                setReplyMessage={setReplyMessage}
                handleSendReply={handleSendReply}
            />


        </div>
 </div>
    );
}

export default UserMessages;
