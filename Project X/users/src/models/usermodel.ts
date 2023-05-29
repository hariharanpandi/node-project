import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    status: 'Active' | 'Inactive';
}
const userSchema: Schema<IUser> = new Schema({
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
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
        default: 'Active'
    }
}, { collection: appConstant.SCHEMA.PROJECT_USERS_COLLEECTION_NAME });

const User = mongoose.model<IUser>('User', userSchema);

export { User, userSchema };
// Find All User
export const findAllUser = (status: string) => User.find({ status });
// Find By Email
export const finByEmail = (email: string) => User.findOne({ email });
// User Create
export const userCreate = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
