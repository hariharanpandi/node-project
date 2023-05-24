import UserService from "../services/UserService";
import { Request, Response } from "express";
import { User } from "../models/user";

const userService=new UserService();
export default class UserController {
  constructor() {
    //empty
  }
  //-----------------------------Create Users---------------------------------------
  async register(req: Request, res: Response):Promise<void> {
    try {
      const userData:Record<string, any> = req.body;
      const user = await userService.registerUser(userData);
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
  async loginUser(req: Request, res: Response):Promise<void> {
    try {
      const { email, password } = req.body;
      const userData:Record<string, any> = {
        email,
        password,
      };
      const authData = await userService.loginUser(userData);
      res.status(200).json(authData);
    } catch (error: any) {
      res.status(401).send(error.message);
    }
  }

  async getAllUsers(req: any, res: any) {
    try {
      const users = await User.find();
      const count=await User.countDocuments();
      res.send({count,users});
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }
}
