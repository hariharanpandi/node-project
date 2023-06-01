import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IUser extends Document {
    first_name: String,
    last_name: String,
    email: String,
    tenant_group_name: String,
    org_name: String,
    domain_name: String,
    user_id: ObjectId,
    onboard_on: Date,
    offboard_on: Date,
    status: 'Active' | 'Inactive',
    created_by: String,
    created_at: Date,
    last_accessed_by: String,
    last_accessed_at: Date,
}

const tenantSchema: Schema<IUser> = new Schema({
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
        maxlength: 50,
        unique: true
    },
    tenant_group_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    org_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    domain_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    user_id: {
        type: ObjectId,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    onboard_on: {
        type: Date,
        minlength: 5,
        maxlength: 50,
        default: new Date()
    },
    offboard_on: {
        type: Date,
        maxlength: 50,
        default: null
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
}, { collection: appConstant.SCHEMA.TENANT_COLLECTION_NAME });

const Tenant = mongoose.model<IUser>('Tenant', tenantSchema);
export { Tenant, tenantSchema };
// Tenant create
export const tenantCreate = (values: Record<string, any>) => new Tenant(values).save().then((tenant) => tenant.toObject());
// Find By Email
export const findByEmailTenant = (email: string) => Tenant.findOne({ email });

export const findByIdTenant = (_id: string) => Tenant.findOne({ _id }).then((teant) => {
    if (!teant) {
        return null;
    }
    return teant;
}).catch((error) => {
    return null;
});
// Delete User
export const deleteTenant = (_id: string) => Tenant.findByIdAndUpdate(_id, { $set: { status: appConstant.SCHEMA.STATUS_INACTIVE, offboard_on: new Date() } });