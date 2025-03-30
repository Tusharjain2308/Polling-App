const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Poll = require("../models/Poll")

//generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  const { fullname, username, email, password, profileImageUrl } = req.body;

  //check for any missing field
  if (!fullname || !username || !email || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validation : username format to be checked
  // only alphanumeric characters and hypens allowed
  const usernameregex = /^[a-zA-Z0-9-]+$/;
  if (!usernameregex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid Username. Only Alphanumeric characters and hypens are allowed, no white spaces permitted.",
    });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    //check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username not available, try another one!" });
    }

    //create the user
    const user = await User.create({
      fullname,
      username,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering User", error: err.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check validation for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Bad Credentials" });
    }

    //count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({creator:user._id});

    //count polls the user has voted
    const totalPollsVotes = await Poll.countDocuments({
      voters: user._id,
    })

    //count bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated,
        totalPollsVotes,
        totalPollsBookmarked,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error Logging User", error: err.message });
  }
};

// getUserInfo
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    //count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({creator:user._id});

    //count polls the user has voted
    const totalPollsVotes = await Poll.countDocuments({
      voters: user._id,
    })

    //count bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    //add new attributes to the user
    const userInfo = {
      ...user.toObject(),
      totalPollsCreated,
      totalPollsVotes,
      totalPollsBookmarked,
    };

    res.status(200).json(userInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error finding the User", error: err.message });
  }
};
