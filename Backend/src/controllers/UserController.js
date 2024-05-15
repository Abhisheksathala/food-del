import userModel from "../models/User.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const LoginUser = async (req, res) => {
  // Implementation here
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await createtoken(user._id);
    console.log(`User ${user.name} logged in successfully. Token: ${token}`);

    return res
      .status(200)
      .json({ success: true, message: "User logged in", token: token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// create token
const createtoken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn: '30d' });
};

// register user
const RegisterUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if the user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // validating email formatting and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // validating password
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password of at least 8 characters",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = await createtoken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "User created", token: token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error });
  }
};

export { LoginUser, RegisterUser };
