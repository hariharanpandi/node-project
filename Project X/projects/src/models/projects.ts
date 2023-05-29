import mongoose, { Document, Schema } from "mongoose";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

interface IProject extends Document {
    projectname: string;
    description: string;
    status: 'Active' | 'Inactive';
    generateAuthToken: () => string;
}

const projectSchema: Schema<IProject> = new mongoose.Schema({
    
    projectname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    status: {
        type: String,
        enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
        default: 'Active'
    }
}, { collection: appConstant.SCHEMA.PROJECT_COLLEECTION_NAME });


// Create Project
export const projectsCreate = (values: Record<string, any>) => new Project(values).save().then((project) => project.toObject());

// Find project By projectname
export const findByOne = (projectname: string) => Project.findOne({ projectname });

export const findAll = (status: string) => Project.find({ status });

const Project = mongoose.model<IProject>('Project', projectSchema);

export { Project, projectSchema };

