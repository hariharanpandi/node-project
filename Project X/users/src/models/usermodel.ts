import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongodb";
import AppConstants from "../utils/constant";
import  jwt from "jsonwebtoken";
require('dotenv').config();

const appConstant = new AppConstants();

interface IUser extends Document {
    tenant_id: ObjectId,
    tenant_group_id: ObjectId,
    domain_name: String,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    last_active: Date,
    status: 'Active' | 'Inactive',
    created_by: String,
    created_at: Date,
    last_accessed_by: String,
    last_accessed_at: Date,
    generateAuthToken: () => string;
}
const userSchema: Schema<IUser> = new Schema({
    tenant_id:{
        type: ObjectId,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    tenant_group_id:{
        type: ObjectId,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    domain_name:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    last_name: {
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
    last_active: {
        type: Date,
        minlength: 5,
        maxlength: 50,
        default: new Date()
    },
    status: {
        type: String,
        enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
        default: 'Active'
    },
    created_by: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    created_at: {
        type: Date,
        minlength: 5,
        maxlength: 50,
        default: new Date()
    },
    last_accessed_by: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    last_accessed_at: {
        type: Date,
        minlength: 5,
        maxlength: 50,
        default: new Date()
    }
}, { collection: appConstant.SCHEMA.USERS_COLLECTION_NAME });

const User = mongoose.model<IUser>('User', userSchema);

export { User, userSchema };
// Generate Auth Token
export const generateAuthToken = (userData: any) => jwt.sign(
    {
        id: userData._id,
        first_name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin ? userData.isAdmin : false,
    },
    `${process.env.SECRET_KEY}`
)
// Find All User
export const findAllUser = (status: string) => User.find({ status });
// Find By Email
export const findByEmail = (email: string) => User.findOne({ email });
// Find project by _id
export const findById = (_id: string) => User.findOne({ _id }).then((teantuser) => {
    if (!teantuser) {
        return null;
    }
    return teantuser;
}).catch((error) => {
    return null;
});
// Delete User
export const deleteUser = (_id: string) => User.findByIdAndUpdate(_id, { $set: { status: appConstant.SCHEMA.STATUS_INACTIVE } });
// User Create
export const userCreate = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());