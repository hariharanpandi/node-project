import express from "express";
const router = express.Router();
const { authGuard } = require('../middleware/authguard');
import Users from "../controllers/userController";

const users = new Users();


//------------------------ Use Registration ---------------------------
// router.get('/user', users.getAll);
// router.get('/user/:id', user.getById);
router.post('/register', users.register);
router.get('/login', users.loginUser);
// router.put('/user/:id', authGuard.validateToken, users.create);
// router.delete('/user/:id', authGuard.validateToken, user.delete);
// router.get('/currentuser', authGuard.validateToken, user.getCurrentUser);


module.exports.route = router;


