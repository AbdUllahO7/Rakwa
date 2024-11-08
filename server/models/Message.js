const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessAndService',
        required: true
    },
    subject: {
        type: String,
        required: true

    },
    message: {
        type: String,
        required: true
    },

});

// Create the model
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
