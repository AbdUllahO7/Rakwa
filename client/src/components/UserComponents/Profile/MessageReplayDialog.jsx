import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';

function MessageReplayDialog({
    openDialog,
    setOpenDialog,
    selectedMessage,
    replyMessageSubject,
    setReplyMessageSubject,
    replyMessage,
    setReplyMessage,
    handleSendReply
}) {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="mx-auto mt-10">
                    <DialogTitle className="text-secondary">Reply to Message</DialogTitle>
                    <DialogDescription />
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
                        <div className="ml-10 p-2 bg-gray-100 dark:bg-secondary rounded-md">
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

                <DialogFooter className="m-3">
                    <DialogClose asChild>
                        <Button className="bg-gray-200">Cancel</Button>
                    </DialogClose>
                    <Button className="text-white dark:text-primary bg-secondary " onClick={handleSendReply}>Send Reply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
MessageReplayDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    selectedMessage: PropTypes.shape({
        userSender: PropTypes.shape({
            userName: PropTypes.string.isRequired
        }),
        createdAt: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }),
    replyMessageSubject: PropTypes.string.isRequired,
    setReplyMessageSubject: PropTypes.func.isRequired,
    replyMessage: PropTypes.string.isRequired,
    setReplyMessage: PropTypes.func.isRequired,
    handleSendReply: PropTypes.func.isRequired
};

export default MessageReplayDialog
