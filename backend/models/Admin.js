import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    // emailotp start------------------------

    isVerified: { type: Boolean, default: false },

    otp: { type: String, default: null },

    otpExpiry: { type: Date, default: null }

    // emailotp end------------------------

  }, {
  timestamps: true,
});

export default mongoose.model("Admin", adminSchema);