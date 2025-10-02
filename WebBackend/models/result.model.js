import mongoose from "mongoose";
const { Schema } = mongoose;


const resultSchema = new Schema({
  examId: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  status: String, // "Passed" / "Failed"
  createdAt: { type: Date, default: Date.now }
});

const Result =  mongoose.model('Result', resultSchema);
export default Result;