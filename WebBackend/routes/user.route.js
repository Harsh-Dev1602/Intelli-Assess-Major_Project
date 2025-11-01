import express from 'express';

import { register , login , logout, allStudentData } from "../controllers/user.controller.js";
import {addQuestion ,showQuestion,deleteQueston,allques, allans} from '../controllers/question.controller.js';
import { results , checkResults,allStudentList} from '../controllers/results.controller.js';
import { secureRoute,adminSecureRoute} from '../middleware/auth.js'

const router = express.Router();
// User API
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/allStudentData",adminSecureRoute,allStudentData)

// All Ques and ans API
router.post("/addquestions",addQuestion)
router.get("/showquestion",secureRoute,showQuestion)
router.delete("/deletequestion/:user",adminSecureRoute,deleteQueston)
router.get("/questions",secureRoute,allques)
router.get('/answers',secureRoute,allans)

// All Results API
router.post('/results',results)
router.get('/results/check/:user',secureRoute,checkResults )

// All Student List API
router.get("/allStudentList",adminSecureRoute,allStudentList)

export default router;