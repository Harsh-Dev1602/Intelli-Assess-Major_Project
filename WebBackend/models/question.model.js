import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionModel = new Schema({
    question: { type: String, required: true },
    options: {
        A: String,
        B: String,
        C: String,
        D: String
    },
    correctAnswer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Question', questionModel);

