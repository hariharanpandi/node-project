import express from "express";
const router = express.Router();
import UserController from "../controllers/usercontroller";
import AuthGuard from "../middleware/authguard";
import SigninController from "../controllers/signincontroller";


const users = new UserController();
const authGuard = new AuthGuard();
const signinUser = new SigninController();

/*Register and Login routes*/

router.post('/signin', signinUser.loginUser);
router.post('/register', signinUser.register);

/*CRUD options for porjects*/

router.post('/user/create', users.create);
router.post('/users',authGuard.validateToken,  users.getAllUsers);
// router.get('/projects/')
// router.delete('/projects/delete/:id', ); 

module.exports.route = router;