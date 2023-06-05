import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IUser extends Document {
    page_title: string,
    page_description: string,
    page_url: string,
    status: 'Active' | 'Inactive',
    created_by: string,
    created_at: Date,
    last_accessed_by: string,
    last_accessed_at: Date,
}

const loginCmsSchema: Schema<IUser> = new Schema({
    page_title: {
        type: String,
        required: true,
        minlength: 5,
    },
    page_description: {
        type: String,
        required: true,
    },
    page_url: {
        type: String,
        required: true,
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
}, { collection: appConstant.SCHEMA.LOGIN_CMS_COLLECTION });

const LoginCms = mongoose.model<IUser>('LoginCms', loginCmsSchema);
export { LoginCms, loginCmsSchema };
/**
 * 
 */
export const findByPageUrl = (page_url: string) => LoginCms.findOne({ page_url }).then((data) => {
    if (!data) {
        return null;
    }
    return data;
}).catch((error: any) => {
    return null;
});