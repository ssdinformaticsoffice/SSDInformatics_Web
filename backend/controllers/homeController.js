import Home from "../models/Home.js";

// ==========================
// Create Home Data
// ==========================

export const createHome = async (req, res) => {
  try {
    const { title, description, image, buttonText, buttonLink } = req.body;

    const home = await Home.create({
      title,
      description,
      image,
      buttonText,
      buttonLink,
    });

    res.status(201).json({
      success: true,
      message: "Home data saved successfully",
      home,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get Home Data
// ==========================

export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      home,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
