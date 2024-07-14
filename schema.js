const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

