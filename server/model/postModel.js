const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: {type: String, require:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;