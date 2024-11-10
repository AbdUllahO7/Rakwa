import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createMessage, deleteMessage, getMessagesByUser, updateMessage } from '@/store/userSlice/MessageSlice';
import { Send, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserMessages() {
    const { user } = useSelector(state => state.auth);
    const { messages } = useSelector(state => state.messages);
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [selectedMessage, setSelectedMessage] = useState(null); // To store the message you are replying to
    const [replyMessage, setReplyMessage] = useState(''); // To store the reply message input
    const [replyMessageSubject, setReplyMessageSubject] = useState(''); // To store the reply message input

    const dispatch = useDispatch();
    const { toast } = useToast();

    useEffect(() => {
        dispatch(getMessagesByUser(user?.id));
    }, [dispatch, user?.id]);

    function handleDeleteMessage(messageId) {
        dispatch(deleteMessage(messageId)).then(data => {
            if (data?.payload?.success) {
                dispatch(getMessagesByUser(user?.id));
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
                userSender: user?.id,  // Sender ID
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
            dispatch(getMessagesByUser(user?.id)); // Refresh messages
        } else {
            toast({
                title: "Please write a message",
                variant: "destructive",
            });
        }
    }

    console.log(messages)

    return (
        <div className='flex justify-center gap-10 flex-wrap w-full'>
        {messages.messages && messages.messages.length > 0 ? (
        messages.messages
        .filter((message) => message.userReceiver._id === user?.id && message.replayed === false) // Filter only messages for the current user and with replayed === false
        .map((message, index) => (
            <div
            className="shadow-xl h-fit w-[300px] flex flex-col justify-center items-center gap-7 p-10"
            key={index}
            >
            <Avatar className="bg-black">
                <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                {message.userSender['userName'][0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <span className="text-secondary font-semibold text-lg text-center">
                You have an unread message awaiting your reply from {message.userSender['userName']}
            </span>
            <p className="text-sm text-gray-500">
                Sent on: {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
            </p>
            <div className="flex justify-evenly w-full">
                {/* Reply Button to open the dialog */}
                <Button className="bg-secondary" onClick={() => handleReply(message)}>
                <Send className="mr-2" /> Reply
                </Button>
                <Button className="bg-red-800" onClick={() => handleDeleteMessage(message?._id)}>
                <Trash2 className="mr-2" /> Delete
                </Button>
            </div>
            </div>
        ))
            ) : (
                <div>No unread messages awaiting your reply.</div> // Optional message when there are no messages
            )}

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-4xl p-0">
                    <DialogHeader className="mx-auto mt-10">
                        <DialogTitle className="text-secondary">Reply to Message</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    {/* Chat Window */}
                    <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                        {/* Show message history */}
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Avatar className="bg-black">
                                    <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                                        {selectedMessage?.userSender?.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                    <span className="font-semibold">{selectedMessage?.userSender?.userName}</span>
                                    <p className="text-sm text-gray-500">
                                        Sent on: {new Date(selectedMessage?.createdAt).toLocaleDateString()} at {new Date(selectedMessage?.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-10 p-2 bg-gray-100 rounded-md">
                                <h2>Subject : {selectedMessage?.subject}</h2>
                                <h1>Message : {selectedMessage?.message}</h1>

                            </div>
                            
                        </div>

                        {/* Reply input */}
                        <div className="mt-4 ml-10 p-2">
                            <Input
                                value={replyMessageSubject}
                                onChange={(e) => setReplyMessageSubject(e.target.value)}
                                placeholder="Write your Subject reply here..."
                                className="w-full p-2 mb-5 border rounded-md"
                            />
                            <Textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Write your Message reply here..."
                                className="w-full p-2 border rounded-md"
                                rows="4"
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-gray-200">Cancel</Button>
                        </DialogClose>
                        <Button className="bg-blue-600 text-white" onClick={handleSendReply}>Send Reply</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UserMessages;
