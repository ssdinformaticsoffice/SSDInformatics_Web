import Branch from "../models/Branch.js";

// ===========================
// Create Branch
// ===========================

export const createBranch = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      phone,
      email,
      mapLink,
      order,
      status,
    } = req.body;

    if (!name || !city || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, city and address are required",
      });
    }

    const branch = await Branch.create({
      name,
      city,
      address,
      phone,
      email,
      mapLink,
      order: Number(order) || 0,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    console.log("Create Branch Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===========================
// Get Active Branches
// Public
// ===========================

export const getActiveBranches = async (req, res) => {
  try {
    const branches = await Branch.find({
      status: "active",
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    console.log("Get Active Branches Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get All Branches
// Admin
// ===========================

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    console.log("Get All Branches Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get Branch By ID
// Admin
// ===========================

export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    res.status(200).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    console.log("Get Branch Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Update Branch
// ===========================

export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    const {
      name,
      city,
      address,
      phone,
      email,
      mapLink,
      order,
      status,
    } = req.body;

    branch.name = name ?? branch.name;
    branch.city = city ?? branch.city;
    branch.address = address ?? branch.address;
    branch.phone = phone ?? branch.phone;
    branch.email = email ?? branch.email;
    branch.mapLink = mapLink ?? branch.mapLink;
    branch.order = order ?? branch.order;
    branch.status = status ?? branch.status;

    await branch.save();

    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
      data: branch,
    });
  } catch (error) {
    console.log("Update Branch Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===========================
// Delete Branch
// ===========================

export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    await Branch.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    console.log("Delete Branch Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};