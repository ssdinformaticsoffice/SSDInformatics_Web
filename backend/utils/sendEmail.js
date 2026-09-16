import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env") });

console.log("========== SMTP DEBUG ==========");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "LOADED" : "MISSING"
);
console.log("================================");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables for SMTP");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"SSD Informatics" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

export default sendEmail;