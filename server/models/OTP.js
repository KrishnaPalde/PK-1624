const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
    default: function () {
      return new Date(Date.now() + 60 * 60 * 1000);
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

otpSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
