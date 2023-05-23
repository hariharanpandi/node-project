import UserService from "../services/UserService";
import { Request, Response } from "express";
import { User } from "../models/user";

export default class UserController {
  constructor() {
    //empty
  }
  //-----------------------------Create Users---------------------------------------
  async register(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await UserService.registerUser(userData);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
  //-----------------------------Login User---------------------------------------
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = {
        email,
        password,
      };
      const authData = await UserService.loginUser(userData);
      res.status(200).json(authData);
    } catch (error: any) {
      res.status(401).send(error.message);
    }
  }

  async getAllUsers(req: any, res: any) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }
}
