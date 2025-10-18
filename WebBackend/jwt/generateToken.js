import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY,{
    expiresIn: "1d",
  });
  res.cookie("Online_Exam_Key", token, {
    httpOnly: false, // xss
    secure: false,
    sameSite: "Lax", // csrf
  });
};
export default createTokenAndSaveCookie;