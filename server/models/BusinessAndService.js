const mongoose = require('mongoose');

// Define the BusinessAndService Schema
const BusinessAndServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true }],
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories.subCategories' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    map: { type: String },
    phone: { type: String },
    images: { type: String },
    open: { type: Boolean, default: true },
    facebook: { type: String ,default: "" },
    instagram: { type: String , default: ""},
    whatsapp: { type: String , default: "" },
    features: { type: String , default: "" },
    Accept: { type: Boolean, default: false },
});


// Create the model for the BusinessAndService collection
const BusinessAndService = mongoose.model('BusinessAndService', BusinessAndServiceSchema);
module.exports = BusinessAndService;
