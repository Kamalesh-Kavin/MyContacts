const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/contacts
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exists");
  }

  //hash pwd
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data not valid");
  }
  res.json({ message: "Register user" });
});

//@desc Login a user
//@route POST /api/contacts
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

//@desc View current user
//@route GET /api/contacts
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
