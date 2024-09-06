const User = require("../models/Admin");
const { sendOTPForForgotPassword } = require("../controller/emailController");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const email = req.body.email;

    const otp = await sendOTPForForgotPassword(email);

    res.status(200).json({ message: "OTP Sent", otp: otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin user not found." });
    }

    admin.password = newPassword;
    await admin.save();
    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during password reset." });
  }
};

const checkIfUserExists = async (req, res) => {
  try {
    const email = req.body.email;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(200)
        .json({ error: "Admin user not found.", status: -1 });
    } else {
      return res.status(200).json({ message: "User Exists", status: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: error, status: -2 });
  }
};

module.exports = {
  login,
  sendOTP,
  resetPassword,
  checkIfUserExists,
};

// email : test@gmail.com
// password : test@123
