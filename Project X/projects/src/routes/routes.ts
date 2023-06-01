import express from "express";
const router = express.Router();
import ProjectController from "../controllers/projectcontroller";
import AuthGuard from "../middleware/authguard";

const projects = new ProjectController();
const authGuard = new AuthGuard();

/*CRUD options for porjects*/

router.post('/project/create', authGuard.validateToken, projects.projectCreate);
router.get('/project/:_id', authGuard.validateToken, projects.getOneProject)
router.put('/project/:_id', authGuard.validateToken, projects.projectUpdate);
router.delete('/project/:_id', authGuard.validateToken, projects.projectDelete);
router.get('/projects', authGuard.validateToken, projects.getAllProject);

module.exports.route = router;