import express from 'express';

import { register , login , logout, allStudentData } from "../controllers/user.controller.js";
import {allques, allans} from '../controllers/question.controller.js';
import { results , checkResults,allStudentList} from '../controllers/results.controller.js';

const router = express.Router();
// User API
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/allStudentData",allStudentData)

// All Ques and ans API
router.get("/questions",allques)
router.get('/answers',allans)

// All Results API
router.post('/results',results)
router.get('/results/check/:user',checkResults )

// All Student List API
router.get("/allStudentList",allStudentList)

export default router;