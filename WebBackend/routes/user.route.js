import express from 'express';
import { register , login , logout } from "../controllers/user.controller.js";
import {allques, allans} from '../controllers/question.controller.js';

const router = express.Router();
// User API
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/questions",allques)
router.get('/answers',allans)


export default router;