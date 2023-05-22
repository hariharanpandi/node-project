// /*
// 1) Using lodash method for efficiently to handle the objects and arrays
// 2) Using Hash the password security purpose 
// 3) Implement the JSON WEB tokens 
// */

// // Authentication and Authorization

// //Model
// const { User } = require("../models/user");
// const _ = require("lodash");
// // Service
// import userService from "../services/UserService";
// // Joi validation
// import Validation from "../validators/Validation";

// const validators = new Validation();

// export default class Users {
//   constructor() {
//     //Empty
//   }

//   //GET method List the All data from DB
//   async getAll(req: any, res: any) {
//     try {
//       const users = await userService.getAllUsers();
//       res.send(users);
//     } catch (error: any) {
//       res.status(404).send(error.message);
//     }
//   }

//   //POST method for Create new data
//   async create(req: any, res: any) {
//     /*
//             1) Validate the Request with Joi 
//             2) Check the use is Exist or Not using "mongoose findOne" with "email"
//             3) Response return only required key in the objects using lodash
//             4) Hash the password using "bcrypt" 
//      */
//     try {
//       const userData = req.body;
//       const createdUser = await userService.createUser(userData);A
//       res.send(createdUser);
//     } catch (error: any) {
//       res.status(404).send(error.message);
//     }
//   }
// }
