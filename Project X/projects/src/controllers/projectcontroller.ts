import { Request, Response } from 'express';
import Validation from '../validators/Validation';
const _ = require('lodash');
import ProjectService from '../services/projectservice';
import AppConstants from '../utils/constant';

const projectService = new ProjectService();
const validation = new Validation();
const appConstant = new AppConstants();

export default class ProjectController {
    constructor() {
        //Empty 
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
            res.send(_.pick(projectRes, ['_id', 'projectname', 'description', 'status']));
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
}
