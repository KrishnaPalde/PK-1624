const mongoose = require("mongoose");

const GlobalSettingSchema = new mongoose.Schema(
  {
    roomTaxesAndCharges: {
      tax: {
        type: Number,
        required: true,
      },
      serviceCharges: {
        type: Number,
        required: true,
      },
      extraPersonCharges: {
        type: Number,
        required: true,
      },
    },
    paymentGateway: {
      keyId: {
        type: String,
        required: true,
      },
      secretKey: {
        type: String,
        required: true,
      },
    },
    calendarLinks: [
      {
        roomType: {
          type: String,
          required: true,
        },
        sources: [
          {
            source: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GlobalSetting", GlobalSettingSchema);
