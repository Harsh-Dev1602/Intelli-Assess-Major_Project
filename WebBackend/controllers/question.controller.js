import { questions,  answers } from '../Data/data.js'

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

