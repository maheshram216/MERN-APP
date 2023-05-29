const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type:String},
    email: {type:String},
    password : String
});

const model = mongoose.model('User', UserSchema);
module.exports = model;