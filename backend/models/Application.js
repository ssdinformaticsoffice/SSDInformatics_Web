import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
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
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "shortlisted",
        "rejected",
        "hired",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;