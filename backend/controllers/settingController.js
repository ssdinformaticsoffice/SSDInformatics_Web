import Setting from "../models/Setting.js";


// Save Settings
export const saveSettings = async (req, res) => {
  try {

    const data = await Setting.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      data
    });

  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// Get Settings
export const getSettings = async (req, res) => {
  try {

    const settings = await Setting.findOne();

    res.json({
      success:true,
      data:settings
    });

  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};