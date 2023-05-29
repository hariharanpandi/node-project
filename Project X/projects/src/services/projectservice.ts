import { Project, findByOne, projectsCreate, findAll } from "../models/projects";
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
            const { _id, projectname, description, status } = projectData;
            const projectDuplicate = await findByOne(projectname);
            if (projectDuplicate) {
                throw new Error(appConstant.ERROR_MESSAGES.DUPLICATE);
            }
            const projects = await projectsCreate({
                _id,
                projectname,
                description,
                status,
            });
            return projects;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}