import Application from "../models/Application.js";
import Career from "../models/Career.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/Notification.js";

// =====================================================
// Create Job Application
// =====================================================

export const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
      experience,
      coverLetter,
    } = req.body;

    // -----------------------------
    // Validation
    // -----------------------------

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
        message: "All fields are required",
      });
    }

    // -----------------------------
    // Resume validation
    // -----------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    // -----------------------------
    // Check Job
    // -----------------------------

    const job = await Career.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job position not found",
      });
    }

    // -----------------------------
    // Check Job Status
    // -----------------------------

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This position is no longer open",
      });
    }

    // -----------------------------
    // Upload Resume to Cloudinary
    // -----------------------------

    const uploadResume = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ssd-informatics/resumes",
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

        uploadStream.end(req.file.buffer);
      });
    };

    const uploadedResume = await uploadResume();

    // -----------------------------
    // Save Application
    // -----------------------------

    const application = await Application.create({
      job: job._id,
      jobTitle: job.title,

      name,
      email,
      phone,
      experience,
      coverLetter,

      resume: uploadedResume.secure_url,

      status: "pending",
    });

    // -----------------------------
    // Create Notification
    // -----------------------------

    await Notification.create({
      title: "New Job Application",
      message: `${name} applied for ${job.title}.`,
    });

    // -----------------------------
    // Response
    // -----------------------------

    return res.status(201).json({
      success: true,
      message:
        "Your application has been submitted successfully.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Create Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};