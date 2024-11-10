const Message = require("../../models/Message");
const User = require("../../models/User");


// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { userSender, userReceiver, business, subject, message  , replayed} = req.body;
        const newMessage = new Message({
            userSender,
            userReceiver,
            business,
            subject,
            message,
            replayed
        });

        await newMessage.save();
        res.status(201).json({ success : true ,  message: 'Message sent successfully!', data: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success : false , message: 'Server error. Could not create the message.' });
    }
};

// Get messages for a specific business
exports.getBusinessMessages = async (req, res) => {
    try {
        const { businessId } = req.params;

        const messages = await Message.find({ business: businessId })
            .populate('userSender', 'username')  // Populate sender's username
            .populate('userReceiver', 'username')  // Populate receiver's username
            .populate('business', 'name');  // Populate business name

        if (!messages || messages.length === 0) {
            return res.status(404).json({ success : false , message: 'No messages found for this business.' });
        }

        res.status(200).json({success : true , message: 'Messages fetched successfully', data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success : false ,message: 'Server error. Could not fetch the messages.' });
    }
};


// Get messages for a specific user (either sender or receiver) along with user info and business info
exports.getUserMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId to get user info
        const user = await User.findById(userId).select('userName email'); // Add other fields as needed

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Find messages where the user is either the sender or receiver, and populate business info
        const messages = await Message.find({
            $or: [{ userSender: userId }, { userReceiver: userId }],
        })
        .populate('userSender', 'userName')
        .populate('userReceiver', 'userName')
        .populate('business', 'title'); // Specify fields to include in the business details

        if (!messages || messages.length === 0) {
            return res.status(404).json({ success: false, message: 'No messages found for this user.' });
        }

        res.status(200).json({
            success: true,
            message: 'User messages fetched successfully',
            data: {
                userInfo: user, // Include user info in the response
                messages: messages, // Each message includes business info if available
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error. Could not fetch user messages.' });
    }
};



// Update a message (update subject or rating)
exports.updateMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { replayed } = req.body;

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { replayed: replayed },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, message: 'Message not found.' });
        }

        res.status(200).json({ success: true, message: 'Message updated successfully', data: updatedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error. Could not update the message.' });
    }
};


// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({success : false , message: 'Message not found.' });
        }

        res.status(200).json({success : true , message: 'Message deleted successfully', data: deletedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({success : false , message: 'Server error. Could not delete the message.' });
    }
};
