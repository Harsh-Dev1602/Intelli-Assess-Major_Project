import { questions,  answers } from '../Data/data.js'
import Question from '../models/question.model.js';

export const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const newQ = new Question({ question, options, correctAnswer });
    await newQ.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error });
  }
};

export const allques = (req, res) =>{
    try {
        res.json(questions)
    } catch (error) {
        res.json({ error })
    }
}

export const allans =(req, res) =>{
    try {
        res.json(answers)
    } catch (error) {
        res.json({ error })
    }
}

