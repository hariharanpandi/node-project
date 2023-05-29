import express from "express";
const router = express.Router();
import ProjectController from "../controllers/projectcontroller";
import AuthGuard from "../middleware/authguard";

const projects = new ProjectController();
const authGuard = new AuthGuard();

/*CRUD options for porjects*/

router.post('/projects/create', authGuard.validateToken, projects.projectCreate);
router.post('/projects', authGuard.validateToken,  projects.getAllProject); 
// router.put('/projects/edit/:id', );

module.exports.route = router;