import mongoose, { Document, Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import AppConstants from "../utils/constant";
require('dotenv').config();

const appConstant = new AppConstants();

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    status: 'Active' | 'Inactive';
    generateAuthToken: () => string;
}
const userSchema: Schema<IUser> = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
        default: 'Active'
    }
}, { collection: appConstant.SCHEMA.USERS_COLLECTION_NAME });

export const generateAuthToken = function (userData: any) {
    return jwt.sign(
        {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            isAdmin: userData.isAdmin ? userData.isAdmin : false,
        },
        `${process.env.SECRET_KEY}`
    );
}

const Signin = mongoose.model<IUser>('Signin', userSchema);
// Create User
export const registerUser = (values: Record<string, any>) => new Signin(values).save().then((user) => user.toObject());
// Find user By Email
export const findByEmail = (email: string) => Signin.findOne({ email });

export { Signin, userSchema };