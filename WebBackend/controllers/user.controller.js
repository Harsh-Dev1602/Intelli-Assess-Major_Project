import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
//  Register API
export const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword
    });
    await newUser.save();
    if (newUser) {
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Log In API

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }) || await Admin.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(400).json({ error: "Invalid user email id" });
    }
    else if(!isMatch){
      return res.status(400).json({ error: "Invalid user password" });
    }
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role:user.role
      },

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User not registered" });
  }
};

// Logout API
export const logout = async (req, res) => {
  try {
    res.status(201).json({ message: "User log out successfully.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User not log out.. " });
  }
};


export const allStudentData = async (req,res) =>{
   try {
    const data = await User.find({}, "fullname email createdAt").sort({ loginTime: -1 });
    
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching login history" });
  }
}