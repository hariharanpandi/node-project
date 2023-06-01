import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IProject extends Document {
    project_name: string;
    description: string;
    status: 'Active' | 'Inactive';
    created_by: string;
    created_at: Date;
    last_accessed_by: string;
    last_accessed_at: Date;
    generateAuthToken: () => string;
}

const projectSchema: Schema<IProject> = new mongoose.Schema({

    project_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    status: {
        type: String,
        enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
        default: 'Active'
    },
    created_by: {
        type: String,
        required: true,
        select: false,
        minlength: 5,
        maxlength: 255,
    },
    created_at: {
        type: Date,
        select: false,
        default: new Date()
    },
    last_accessed_by: {
        type: String,
        required: true,
        select: false,
        minlength: 5,
        maxlength: 255,
    },
    last_accessed_at: {
        type: Date,
        select: false,
        default: new Date()
    },
}, { collection: appConstant.SCHEMA.PROJECT_COLLECTION_NAME });


// Create Project
export const projectsCreate = (values: Record<string, any>) => new Project(values).save().then((project) => project.toObject());

// Find project by _id
export const findById = (_id: string) => Project.findOne({ _id }).then((project) => {
    if (!project) {
        return null;
    }
    return project;
}).catch((error) => {
    return null;
});
//Find project by project_name
export const findByName = (project_name: string) => Project.findOne({ project_name }).then((project) => {
    if (!project) {
        return null;
    }
    return project;
}).catch((error: any) => {
    return null;
});
export const updateProject = (_id: string, values: Record<string, any>) => Project.findByIdAndUpdate(_id, values, { new: true, runValidators: true });

export const deleteProject = (_id: string) => Project.findByIdAndUpdate(_id, { $set: { status: appConstant.SCHEMA.STATUS_INACTIVE } })

export const findAll = (status: string) => Project.find({ status });

const Project = mongoose.model<IProject>('Project', projectSchema);

export { Project, projectSchema };