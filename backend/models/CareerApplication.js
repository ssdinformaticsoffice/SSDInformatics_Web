import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    resume: {
      fileName: {
        type: String,
        required: true,
      },

      fileUrl: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CareerApplication = mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);

export default CareerApplication;