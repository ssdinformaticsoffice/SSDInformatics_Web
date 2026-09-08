import React, { useState } from "react";
import { Mail, Send, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SendOtp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000/api";

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/admin/send-otp`, {
        email,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setMessage(data.message || "OTP has been sent to your email.");
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/admin/verify-otp`, {
        email,
        otp,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Invalid OTP");
      }

      sessionStorage.setItem("resetEmail", email);
      sessionStorage.setItem("resetToken", data.resetToken);
      navigate("/newpassword", { state: { resetToken: data.resetToken } });
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] px-4 py-8 text-white sm:px-6 lg:px-8">

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Login
      </button>

      <div className="flex min-h-[80vh] items-center justify-center">

        {/* Card */}
        <div className="w-full max-w-xl rounded-[30px] border border-slate-700 bg-[#1b2437] px-6 py-8 shadow-2xl shadow-black/30 sm:px-10 sm:py-10">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <ShieldCheck size={32} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Forgot Password?
            </h1>

            <p className="mt-3 text-base text-slate-400">
              {otpSent
                ? "Enter the OTP sent to your email"
                : "Enter your email to receive a verification OTP"}
            </p>

          </div>

          {/* Email */}
          <form onSubmit={handleSendOtp} className="space-y-5">

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <div className="relative">

                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ssdinformatics.com"
                  disabled={otpSent}
                  required
                  className="w-full rounded-xl border border-slate-600 bg-[#252e42] py-4 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>
            </div>

            {!otpSent && (
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    Send OTP
                  </>
                )}
              </button>
            )}

          </form>

          {/* OTP */}
          {otpSent && (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">

              <div>
                <label htmlFor="otp" className="mb-2 block text-sm font-semibold text-slate-300">
                  Enter OTP
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-600 bg-[#252e42] px-4 py-4 text-center text-2xl font-bold tracking-[10px] text-white placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Verify OTP
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setOtp("");
                  setOtpSent(false);
                  setMessage("");
                  setError("");
                }}
                className="mx-auto block text-sm font-medium text-blue-400 transition hover:text-blue-300 disabled:opacity-50"
              >
                Create new password
              </button>

            </form>
          )}

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            © 2026 SSD Informatics Pvt. Ltd.
          </p>

        </div>
      </div>
    </div>
  );
}

export default SendOtp;