const mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: String,
    // tokens: [
    //     { token: String }
    // ]
});

// UserSchema.methods.generateToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, process.env.SECRET);
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

const model = mongoose.model('User', UserSchema);
module.exports = model;