import Career from "../models/Career.js";
import CareerApplication from "../models/CareerApplication.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/Notification.js";
import streamifier from "streamifier";

// =====================================================
// Create Career Application - Public
// =====================================================

export const createCareerApplication = async (req, res) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
      experience,
      coverLetter,
    } = req.body;

    // Validation
    if (
      !jobId ||
      !name ||
      !email ||
      !phone ||
      !experience ||
      !coverLetter
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check open job
    const job = await Career.findOne({
      _id: jobId,
      status: "open",
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "This job position is no longer available.",
      });
    }

    // Check resume
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    // Upload resume to Cloudinary
    const uploadResume = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ssd-informatics/career-resumes",
            resource_type: "raw",
            public_id: `${Date.now()}-${req.file.originalname
              .replace(/\s+/g, "-")
              .replace(/\.[^/.]+$/, "")}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);
      });
    };

    const resumeUpload = await uploadResume();

    // Save application
    const application = await CareerApplication.create({
      jobId: job._id,

      name: name.trim(),

      email: email.trim().toLowerCase(),

      phone: phone.trim(),

      experience: experience.trim(),

      coverLetter: coverLetter.trim(),

      resume: {
        fileName: req.file.originalname,
        fileUrl: resumeUpload.secure_url,
      },

      status: "Applied",

      isRead: false,
    });

    // Admin notification
    await Notification.create({
      title: "New Job Application",
      message: `${name} applied for ${job.title}.`,
    });

    return res.status(201).json({
      success: true,
      message: "Your application has been submitted successfully.",
      data: {
        applicationId: application._id,

        job: {
          id: job._id,
          title: job.title,
        },

        name: application.name,

        email: application.email,

        status: application.status,
      },
    });
  } catch (error) {
    console.error(
      "Create Career Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit application.",
    });
  }
};


// =====================================================
// Get All Career Applications - Admin
// =====================================================

export const getAllCareerApplications = async (req, res) => {
  try {
    const applications = await CareerApplication.find()
      .populate(
        "jobId",
        "title department location type experience"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error(
      "Get Career Applications Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications.",
    });
  }
};


// =====================================================
// Get Single Career Application - Admin
// =====================================================

export const getCareerApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await CareerApplication.findById(id)
      .populate(
        "jobId",
        "title department location type experience description skills"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(
      "Get Career Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch application.",
    });
  }
};


// =====================================================
// Update Application Status - Admin
// =====================================================

export const updateCareerApplicationStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const application =
      await CareerApplication.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "jobId",
        "title department location type experience"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Update Career Application Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// Mark Application As Read - Admin
// =====================================================

export const markCareerApplicationRead = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const application =
      await CareerApplication.findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application marked as read.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Mark Application Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update application.",
    });
  }
};


// =====================================================
// Delete Career Application - Admin
// =====================================================

export const deleteCareerApplication = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const application =
      await CareerApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Career Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete application.",
    });
  }
};