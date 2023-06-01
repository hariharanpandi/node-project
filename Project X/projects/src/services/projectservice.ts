import { Project, findById, findByName, projectsCreate, updateProject, findAll, deleteProject } from "../models/projects";
import AppConstants from '../utils/constant';

const appConstant = new AppConstants();

export default class ProjectService {

    async getAllProject(): Promise<Record<string, any>> {
        try {
            const projectList = await findAll(appConstant.SCHEMA.STATUS_ACTIVE);
            const count = await Project.countDocuments();
            return { projectList, count };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createProject(projectData: Record<string, any>): Promise<Record<string, any>> {
        try {
            const { project_name } = projectData;
            const projectDuplicate = await findByName(project_name);
            if (projectDuplicate) {
                throw new Error(appConstant.ERROR_MESSAGES.DUPLICATE);
            }
            const projects = await projectsCreate(projectData);
            return projects;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getOneProject(params: Record<string, any>) {
        try {
            const { _id } = params;
            const project = await findById(_id);
            if (!project) {
                throw new Error(appConstant.MESSAGES.PROJECT_NOT_FOUND);
            }
            return project;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateProject(params: any, projectData: Record<string, any>) {
        try {
            const { _id } = params;
            const project = await findById(_id);
            if (!project) {
                throw new Error(appConstant.MESSAGES.PROJECT_NOT_FOUND);
            }
            const projectDuplicate = await findByName(projectData.project_name);
            if (projectDuplicate) {
                throw new Error(appConstant.ERROR_MESSAGES.DUPLICATE);
            }
            const projectRes = await updateProject(_id, projectData);
            return projectRes;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteProject(params: Record<string, any>) {
        try {
            const { _id } = params;
            const project = await findById(_id);
            if (!project) {
                throw new Error(appConstant.MESSAGES.PROJECT_NOT_FOUND);
            }
            await deleteProject(_id);
            return appConstant.MESSAGES.DELETE_PROJECT;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}