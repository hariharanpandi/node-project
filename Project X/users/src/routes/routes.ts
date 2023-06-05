import express from "express";
const router = express.Router();
import AuthGuard from "../middleware/authguard";
import UserController from "../controllers/usercontroller";

const authGuard = new AuthGuard();
const userController = new UserController();
/**
 * Register and Login routes
 */
router.post('/tenant/create', userController.tenantRegister);
router.post('/signin', userController.loginUser);
router.delete('/tenant/delete', authGuard.validateToken, userController.tenantDelete);
/**
 * user CRUD operation
 */
router.post('/user/create', authGuard.validateToken, userController.userRegister);
/**
 * login CMS
 */
router.get('/logincms', userController.TermsofservicePrivacyPolicy);
module.exports.route = router;