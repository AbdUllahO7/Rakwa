const mongoose = require('mongoose');


const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: String,
    subCategories: [SubCategorySchema], // Embed subCategories directly
});

// Create the model for the Categories collection
const Blogs = mongoose.model('Blogs', BlogsSchema);
module.exports = Blogs;
