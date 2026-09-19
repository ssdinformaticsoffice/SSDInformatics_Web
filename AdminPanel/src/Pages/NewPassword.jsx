import React, { useEffect, useState } from "react";
import axios from "axios";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = import.meta.env.VITE_API_URL  ;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const [resetToken, setResetToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const tokenFromState = location.state?.resetToken;
        const tokenFromStorage = sessionStorage.getItem("resetToken");

        if (tokenFromState) {
            setResetToken(tokenFromState);
            sessionStorage.setItem("resetToken", tokenFromState);
        } else if (tokenFromStorage) {
            setResetToken(tokenFromStorage);
        } else {
            setError("Reset session expired. Please verify OTP again.");
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const { newPassword, confirmNewPassword } = formData;

        // Password validation
        if (!newPassword || !confirmNewPassword) {
            setError("Please fill both password fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!resetToken) {
            setError("Reset session expired. Please verify OTP again.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/admin/new-password`,
                {
                    newPassword,
                    confirmNewPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${resetToken}`,
                    },
                }
            );

            if (response.data.success) {
                setSuccess("Password changed successfully!");

                // Token remove karo
                sessionStorage.removeItem("resetToken");

                // Thoda delay ke baad login page
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setError(
                    response.data.message || "Failed to change password."
                );
            }
        } catch (error) {
            console.error("Password change error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to change password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-8">

            <div className="w-full max-w-[560px] rounded-[30px] border border-white/10 bg-[#1b2436] px-6 py-8 shadow-2xl sm:px-10 sm:py-10">

                {/* Header */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20">
                        <ShieldCheck size={32} />
                    </div>

                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                        Create New Password
                    </h1>

                    <p className="mt-3 text-base text-slate-400">
                        Set a new password for your admin account
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                        >
                            New Password
                        </label>

                        <div className="relative">

                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                            />

                            <input
                                id="newPassword"
                                name="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-slate-600 bg-[#252e42] py-4 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-400"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmNewPassword"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                        >
                            Confirm New Password
                        </label>

                        <div className="relative">

                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                            />

                            <input
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-slate-600 bg-[#252e42] py-4 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-400"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Changing Password...
                            </>
                        ) : (
                            "Change Password"
                        )}
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-white/5 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        © 2026 SSD Informatics Pvt. Ltd.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default NewPassword;