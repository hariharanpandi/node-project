import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IUser extends Document {
    tenant_group_id: string,
    org_name: string,
    domain_name: string,
    user_id: string,
    onboard_on: Date,
    offboard_on: Date,
    status: 'Active' | 'Inactive',
    created_by: string,
    created_at: Date,
    last_accessed_by: string,
    last_accessed_at: Date,
}

const tenantSchema: Schema<IUser> = new Schema({
    tenant_group_id: {
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
        type: String,
        default: null
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
/**
 * Tenant create
 */
export const tenantCreate = (values: Record<string, any>) => new Tenant(values).save().then((tenant) => tenant.toObject());
/**
 * Get tenant by email
 */
export const findByEmailTenant = (email: string) => Tenant.findOne({ email, status: appConstant.SCHEMA.STATUS_ACTIVE }).then((teant) => {
    if (!teant) {
        return null;
    }
    return teant;
}).catch((error) => {
    return null;
});
/**
 * Find tenant by _id
 */
export const findByIdTenant = (_id: string) => Tenant.findOne({ _id, status: appConstant.SCHEMA.STATUS_ACTIVE }).then((tenant) => {
    if (!tenant) {
        return null;
    }
    return tenant;
}).catch((error) => {
    return null;
});
/**
 * Delete tenant by _id
 */
export const deleteTenant = (_id: string) => Tenant.findByIdAndUpdate(_id, { $set: { status: appConstant.SCHEMA.STATUS_INACTIVE, offboard_on: new Date() } });
/**
 * Update tenant user_id 
 */
export const updateTenantUserId = (_id: string, userid: string) =>
    Tenant.findOneAndUpdate({ _id: _id }, { $set: { user_id: userid } }, { new: true }).then((tenantResponse) => {
        if (!tenantResponse) {
            return null;
        }
        return tenantResponse;
    }).catch((error) => {
        return null;
    });;