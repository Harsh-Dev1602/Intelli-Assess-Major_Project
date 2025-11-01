import { questions, answers } from '../Data/data.js'
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

export const showQuestion = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
}
export const deleteQueston = async (req, res) => {
  try {
    const { user } = req.params;
    await Question.findByIdAndDelete(user);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const allques = (req, res) => {
  try {
    res.json(questions)
  } catch (error) {
    res.json({ error })
  }
}

export const allans = (req, res) => {
  try {
    res.json(answers)
  } catch (error) {
    res.json({ error })
  }
}

