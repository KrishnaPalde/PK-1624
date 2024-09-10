const User = require("../models/Admin");
const { sendOTPForForgotPassword } = require("../controller/emailController");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const OTP = require("../models/OTP");
const crypto = require("crypto");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = {
      id: admin._id,
      email: admin.email,
    };

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = crypto.randomInt(100000, 999999);
    const newOTP = new OTP({
      otp,
      email,
    });
    await newOTP.save();
    await sendOTPForForgotPassword(email, otp);
    res.status(200).json({ message: "OTP Sent" });
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

const resetPasswordAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide both current and new passwords." });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
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

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await Admin.findOne({ email });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }

    if (!emailCheck) {
      const admin = await Admin.create({ email, password });
      return res.status(201).json(admin);
    } else {
      return res.status(200).json({ message: "User Exists", status: 0 });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the OTP record from the database
    const otpRecord = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .exec(); // Sort to get the latest OTP if multiple exist

    if (!otpRecord) {
      return res.status(200).json({ status: 0, message: "Incorrect OTP" });
    }

    // Check if the OTP has expired
    if (otpRecord.expiry < new Date()) {
      return res.status(200).json({ status: -1, message: "OTP expired" });
    }

    // Verify the OTP
    if (otpRecord.otp === otp) {
      return res
        .status(200)
        .json({ status: 1, message: "OTP verified successfully" });
    } else {
      return res.status(200).json({ status: 0, message: "Incorrect OTP" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  resetPasswordAdmin,
  checkIfUserExists,
  createAdmin,
};

// email : test@gmail.com
// password : test@111
