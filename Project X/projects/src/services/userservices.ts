import axios from "axios";
import { Request, Response } from 'express';
require('dotenv').config();

export default class ProjectService {

    async getAllUserList(req: Request) {
        try {
            let userList = '';
            const headers = {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            };
            const config = {
                headers: headers
            };
            await axios.post(`${process.env.GET_PROJECTS}`, req, config).then((response) => {
                userList = response.data
            }).catch((e) => {
                userList = e.response.data
            });
            return userList
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}