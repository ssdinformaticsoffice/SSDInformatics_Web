import Career from "../models/Career.js";

// ===========================
// Create Career
// ===========================

export const createCareer = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      skills,
      status,
    } = req.body;

    // Validation
    if (
      !title ||
      !department ||
      !location ||
      !type ||
      !experience ||
      !description ||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const career = await Career.create({
      title,
      department,
      location,
      type,
      experience,
      description,
      skills,
      status: status || "open",
    });

    res.status(201).json({
      success: true,
      message: "Career position created successfully",
      data: career,
    });
  } catch (error) {
    console.log("Create Career Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get Open Career Positions
// ===========================

export const getOpenCareers = async (req, res) => {
  try {
    const careers = await Career.find({
      status: "open",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.log("Get Open Careers Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get All Career Positions
// ===========================

export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.log("Get All Careers Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get Career By ID
// ===========================

export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career position not found",
      });
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.log("Get Career By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Update Career
// ===========================

export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career position not found",
      });
    }

    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      skills,
      status,
    } = req.body;

    career.title = title ?? career.title;
    career.department = department ?? career.department;
    career.location = location ?? career.location;
    career.type = type ?? career.type;
    career.experience = experience ?? career.experience;
    career.description = description ?? career.description;
    career.skills = skills ?? career.skills;
    career.status = status ?? career.status;

    await career.save();

    res.status(200).json({
      success: true,
      message: "Career position updated successfully",
      data: career,
    });
  } catch (error) {
    console.log("Update Career Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Delete Career
// ===========================

export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career position not found",
      });
    }

    await Career.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Career position deleted successfully",
    });
  } catch (error) {
    console.log("Delete Career Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};