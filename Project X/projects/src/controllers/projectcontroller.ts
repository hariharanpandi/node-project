import { Request, Response } from 'express';
import Validation from '../validators/Validation';
const _ = require('lodash');
import ProjectService from '../services/projectservice';
import AppConstants from '../utils/constant';

const projectService = new ProjectService();
const validation = new Validation();
const appConstant = new AppConstants();

export default class ProjectController {

    // POST method to create new data
    async projectCreate(req: Request, res: Response): Promise<void> {
        try {
            const data = JSON.parse(JSON.stringify(req.body));
            // Validate the request objects using Joi
            const { error, values } = validation.project.validate(data);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const projectRes = await projectService.createProject(data);
            // Response send to the client with only required keys in the object using lodash _.pick method
            res.send(projectRes);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
    // GET method to list all data from DB
    async getAllProject(req: Request, res: Response): Promise<void> {
        try {
            const projectRes = await projectService.getAllProject();
            res.send(projectRes);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
    //Get method to get one project from DB
    async getOneProject(req: Request, res: Response) {
        try {
            const params = JSON.parse(JSON.stringify(req.params));
            const projectRes = await projectService.getOneProject(params);
            res.send(projectRes);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
    //Put method to update one project
    async projectUpdate(req: Request, res: Response): Promise<void> {
        try {
            const body = JSON.parse(JSON.stringify(req.body));
            const params = JSON.parse(JSON.stringify(req.params));
            // Validate the request objects using Joi
            const { error, values } = validation.project.validate(body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const projectRes = await projectService.updateProject(params, body);
            // Response send to the client with only required keys in the object using lodash _.pick method
            res.send(_.pick(projectRes, ['_id', 'project_name', 'description', 'status']));
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
    //Delete method to delete one project
    async projectDelete(req: Request, res: Response): Promise<void> {
        try {
            const params = JSON.parse(JSON.stringify(req.params));
            await projectService.deleteProject(params);
            res.status(200).send("project deleted");
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
}
