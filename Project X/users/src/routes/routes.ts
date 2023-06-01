import express from "express";
const router = express.Router();
import AuthGuard from "../middleware/authguard";
import SigninController from "../controllers/usercontroller";

const authGuard = new AuthGuard();
const signinUser = new SigninController();

/*Register and Login routes*/
router.post('/tenant/create', signinUser.tenantRegister);
router.post('/signin', signinUser.loginUser);
router.post('/user/create', signinUser.userRegister);
router.delete('/tenant/delete', signinUser.tenantDelete);

module.exports.route = router;