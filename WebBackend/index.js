import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import seedAdmin from "./controllers/admin.controller.js"
import userRouter from "./routes/user.route.js";


dotenv.config()
const app = express()
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const PORT = process.env.PORT || 3001
const URI = process.env.MONGODB_URI

try {
  mongoose.connect(URI);
  console.log("Online Examination System  Connected to Mongoose db..");
   await seedAdmin(); 
} catch (error) {
  console.log(error);
}

app.use("/oes-api/user",userRouter);

app.listen(PORT, () => {
  console.log(`Web backend run this port http://localhost:${PORT}`)
})
