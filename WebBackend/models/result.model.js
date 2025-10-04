import mongoose from "mongoose";
const { Schema } = mongoose;


const resultSchema = new Schema({
  user: { type: String, required: true },
  score: Number,
  total: Number,
  percentage: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);
export default Result;