import Team from "../models/Team.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ===========================
// Upload Image To Cloudinary
// ===========================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ssd-informatics/team",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ===========================
// Create Team Member
// ===========================

export const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      department,
      bio,
      linkedin,
      email,
      order,
      status,
    } = req.body;

    if (!name || !designation) {
      return res.status(400).json({
        success: false,
        message: "Name and designation are required",
      });
    }

    let image = {
      url: "",
      publicId: "",
    };

    // Upload local image to Cloudinary
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer
      );

      image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    const teamMember = await Team.create({
      name,
      designation,
      department,
      bio,
      linkedin,
      email,
      order: Number(order) || 0,
      status: status || "active",
      image,
    });

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: teamMember,
    });
  } catch (error) {
    console.log("Create Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===========================
// Get Active Team Members
// Public
// ===========================

export const getActiveTeamMembers = async (req, res) => {
  try {
    const team = await Team.find({
      status: "active",
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.log("Get Active Team Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get All Team Members
// Admin
// ===========================

export const getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.log("Get All Team Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get Team Member By ID
// ===========================

export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    console.log("Get Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Update Team Member
// ===========================

export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const {
      name,
      designation,
      department,
      bio,
      linkedin,
      email,
      order,
      status,
    } = req.body;

    teamMember.name = name ?? teamMember.name;
    teamMember.designation =
      designation ?? teamMember.designation;
    teamMember.department =
      department ?? teamMember.department;
    teamMember.bio = bio ?? teamMember.bio;
    teamMember.linkedin =
      linkedin ?? teamMember.linkedin;
    teamMember.email = email ?? teamMember.email;
    teamMember.order = order ?? teamMember.order;
    teamMember.status = status ?? teamMember.status;

    // ===========================
    // Replace Image
    // ===========================

    if (req.file) {
      // Delete old image from Cloudinary
      if (teamMember.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(
            teamMember.image.publicId
          );
        } catch (deleteError) {
          console.log(
            "Old Team Image Delete Error:",
            deleteError
          );
        }
      }

      // Upload new image
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer
      );

      teamMember.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    await teamMember.save();

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: teamMember,
    });
  } catch (error) {
    console.log("Update Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===========================
// Delete Team Member
// ===========================

export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    // Delete image from Cloudinary
    if (teamMember.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(
          teamMember.image.publicId
        );
      } catch (deleteError) {
        console.log(
          "Team Image Delete Error:",
          deleteError
        );
      }
    }

    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.log("Delete Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};