import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IUser extends Document {
    tenant_group_name: String,
    status: 'Active' | 'Inactive',
    created_by: String,
    created_at: Date,
    last_accessed_by: String,
    last_accessed_at: Date,
}

const tenantSchema: Schema<IUser> = new Schema({

    tenant_group_name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50
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
}, { collection: appConstant.SCHEMA.TENANT_GROUP_COLLECTION });

const TenantGroup = mongoose.model<IUser>('TenantGroup', tenantSchema);
export { TenantGroup, tenantSchema };
/**
 * Tenant tenant_group
 */
export const tenantGroupCreate = (values: Record<string, any>) => new TenantGroup(values).save().then((tenantgroup) => tenantgroup.toObject());
/**
 * Find tenant_group by _id
 */
export const findByIdTenantGroup = (_id: string) => TenantGroup.findOne({ _id, status: appConstant.SCHEMA.STATUS_ACTIVE }).then((tenantgroup) => {
    if (!tenantgroup) {
        return null;
    }
    return tenantgroup;
}).catch((error) => {
    return null;
});
/**
 * Delete tenant_group by _id
 */
export const deleteTenantGroup = (_id: string) => TenantGroup.findByIdAndUpdate(_id, { $set: { status: appConstant.SCHEMA.STATUS_INACTIVE } });