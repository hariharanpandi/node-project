import express from "express";
const router = express.Router();
const { authGuard } = require("../middleware/authguard");
import Users from "../controllers/userController";
// import getall from '../controllers/user';

const users = new Users();

//------------------------ Use Registration ---------------------------
router.post("/register", users.register);
router.get("/login", users.loginUser);
router.get("/users", authGuard.validateToken, users.getAllUsers);
// router.put('/user/:id', authGuard.validateToken, users.create);
// router.delete('/user/:id', authGuard.validateToken, user.delete);
// router.get('/currentuser', authGuard.validateToken, user.getCurrentUser);

module.exports.route = router;
