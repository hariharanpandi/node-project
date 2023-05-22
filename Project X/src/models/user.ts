import mongoose from "mongoose";
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    status:{
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }

});


userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin ? this.isAdmin : false,
    }, process.env.SECRET_KEY);
}

export const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;

// Get All User
export const getAllUsers=()=>User.find({ status: 'Active' });

// Create User
export const createUser=(values : Record<string, any>)=>new User(values).save().then((user)=>user.toObject());

// Find user By Email
export const findByEmail=(email: string)=>User.findOne({ email });