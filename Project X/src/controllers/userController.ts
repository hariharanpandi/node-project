import UserService from "../services/UserService";

export default class UserController {
  constructor() {
    //empty
  }
  //-----------------------------Create Users---------------------------------------
  async register(req: any, res: any) {
    try {
      console.log("...controller...");

      const { name, email, password, isAdmin, status } = req.body;

      const userData = {
        name,
        email,
        password,
        isAdmin,
        status,
      };

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
  async loginUser(req: any, res: any) {
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
}
