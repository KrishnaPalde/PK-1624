const GlobalSetting = require("../models/GlobalSetting");

const getCalendarLinks = async (req, res) => {
  try {
    const globalSettings = await GlobalSetting.findOne(); // Assuming there's only one settings document
    if (!globalSettings || !globalSettings.calendarLinks) {
      return res.status(404).json({ message: "No calendar links found." });
    }
    res.status(200).json(globalSettings.calendarLinks);
  } catch (error) {
    console.error("Error fetching calendar links:", error.message);
    res.status(500).json({ message: "Failed to fetch calendar links." });
  }
};

const updateCalendarLinks = async (req, res) => {
  try {
    const updatedLinks = req.body; // Expect an array of calendar links

    const globalSettings = await GlobalSetting.findOne();
    if (!globalSettings) {
      return res.status(404).json({ message: "Global settings not found." });
    }

    // Replace the existing calendar links with the updated ones
    globalSettings.calendarLinks = updatedLinks;

    await globalSettings.save();

    res.status(200).json({ message: "Calendar links updated successfully." });
  } catch (error) {
    console.error("Error updating calendar links:", error.message);
    res.status(500).json({ message: "Failed to update calendar links." });
  }
};

const saveGlobalSettings = async (req, res) => {
  try {
    const { tax, serviceCharges, extraPersonCharges, keyId, secretKey } =
      req.body;

    const newSetting = new GlobalSetting({
      roomTaxesAndCharges: {
        tax,
        serviceCharges,
        extraPersonCharges,
      },
      paymentGateway: {
        keyId,
        secretKey,
      },
    });

    await newSetting.save();
    return res.status(201).json({
      message: "Global Settings saved successfully!",
      setting: newSetting,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save global settings",
      error: error.message,
    });
  }
};

const editGlobalSettings = async (req, res) => {
  try {
    const { tax, serviceCharges, extraPersonCharges, keyId, secretKey } =
      req.body;

    const updatedSetting = await GlobalSetting.findOneAndUpdate(
      {},
      {
        $set: {
          roomTaxesAndCharges: { tax, serviceCharges, extraPersonCharges },
          paymentGateway: { keyId, secretKey },
        },
      },
      { new: true }
    );

    if (!updatedSetting) {
      return res.status(404).json({ message: "Global Setting not found" });
    }

    return res.status(200).json({
      message: "Global Settings updated successfully!",
      setting: updatedSetting,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update global settings",
      error: error.message,
    });
  }
};

const getGlobalSettings = async (req, res) => {
  try {
    const settings = await GlobalSetting.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Global Settings not found" });
    }
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch global settings",
      error: error.message,
    });
  }
};

const getGatewaySettings = async (req, res) => {
  try {
    const settings = await GlobalSetting.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Global settings not found" });
    }

    const clientSettings = {
      roomTaxesAndCharges: settings.roomTaxesAndCharges,
      paymentGateway: {
        keyId: settings.paymentGateway.keyId,
      },
    };

    res.json(clientSettings);
  } catch (error) {
    console.error("Error fetching global settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  saveGlobalSettings,
  editGlobalSettings,
  getGlobalSettings,
  getGatewaySettings,
  getCalendarLinks,
  updateCalendarLinks,
};
