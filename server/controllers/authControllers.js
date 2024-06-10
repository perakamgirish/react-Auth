const User = require("../models/userModel");
const createError = require("../utils/app.Error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.Signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(new createError("User already exists!", 400));
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // JWT (Json Web Token)
    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name, email: newUser.email },
      "secretkey123",
      { expiresIn: "90d" }
    );

    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new createError("User not found!", 404));
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new createError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      "secretkey123",
      { expiresIn: "90d" }
    );

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
