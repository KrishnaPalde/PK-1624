const GlobalSetting = require('../models/GlobalSetting');


const saveGlobalSettings = async (req, res) => {
  try {
    const { tax, serviceCharges, keyId, secretKey } = req.body;

    
    const newSetting = new GlobalSetting({
      roomTaxesAndCharges: {
        tax,
        serviceCharges,
      },
      paymentGateway: {
        keyId,
        secretKey,
      },
    });

    await newSetting.save();
    return res.status(201).json({ message: 'Global Settings saved successfully!', setting: newSetting });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save global settings', error: error.message });
  }
};


const editGlobalSettings = async (req, res) => {
    try {
      const { tax, serviceCharges, keyId, secretKey } = req.body;
  
      const updatedSetting = await GlobalSetting.findOneAndUpdate(
        {},
        {
          $set: {
            roomTaxesAndCharges: { tax, serviceCharges },
            paymentGateway: { keyId, secretKey },
          },
        },
        { new: true }
      );
  
      if (!updatedSetting) {
        return res.status(404).json({ message: 'Global Setting not found' });
      }
  
      return res.status(200).json({ message: 'Global Settings updated successfully!', setting: updatedSetting });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update global settings', error: error.message });
    }
  };

  const getGlobalSettings = async (req, res) => {
    try {
      const settings = await GlobalSetting.findOne(); 
      if (!settings) {
        return res.status(404).json({ message: 'Global Settings not found' });
      }
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch global settings', error: error.message });
    }
  };


module.exports = {
    saveGlobalSettings,
    editGlobalSettings,
    getGlobalSettings,
};