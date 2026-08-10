import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      alert(response.data.message);

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-3 sm:px-5">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#040a14] via-[#08182d] to-[#0b2342]" />

      <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse sm:h-96 sm:w-96" />

      <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl animate-pulse sm:h-96 sm:w-96" />

      {/* Center Circles */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/5 sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] lg:h-[750px] lg:w-[750px]" />

      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/5 sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]" />

      {/* Top Horizontal Lines */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="absolute left-4 top-6 h-px w-16 bg-cyan-400/10 sm:left-8 sm:top-8 sm:w-32" />

      <div className="absolute right-4 top-6 h-px w-16 bg-cyan-400/10 sm:right-8 sm:top-8 sm:w-32" />

      {/* Bottom Horizontal Lines */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="absolute bottom-6 left-4 h-px w-16 bg-cyan-400/10 sm:bottom-8 sm:left-8 sm:w-32" />

      <div className="absolute bottom-6 right-4 h-px w-16 bg-cyan-400/10 sm:bottom-8 sm:right-8 sm:w-32" />

      {/* Vertical Lines */}
      <div className="absolute left-1/4 top-0 h-12 w-px bg-cyan-400/10 sm:h-16" />

      <div className="absolute right-1/4 top-0 h-12 w-px bg-cyan-400/10 sm:h-16" />

      <div className="absolute bottom-0 left-1/4 h-12 w-px bg-cyan-400/10 sm:h-16" />

      <div className="absolute bottom-0 right-1/4 h-12 w-px bg-cyan-400/10 sm:h-16" />

      {/* Connected Nodes */}
      <div className="absolute left-6 top-12 h-1.5 w-1.5 rounded-full bg-cyan-400/30 sm:left-16 sm:top-16 sm:h-2 sm:w-2" />

      <div className="absolute right-6 top-12 h-1.5 w-1.5 rounded-full bg-cyan-400/30 sm:right-16 sm:top-16 sm:h-2 sm:w-2" />

      <div className="absolute bottom-12 left-6 h-1.5 w-1.5 rounded-full bg-cyan-400/30 sm:bottom-16 sm:left-16 sm:h-2 sm:w-2" />

      <div className="absolute bottom-12 right-6 h-1.5 w-1.5 rounded-full bg-cyan-400/30 sm:bottom-16 sm:right-16 sm:h-2 sm:w-2" />

      {/* Abstract Data Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        preserveAspectRatio="none"
      >
        <line
          x1="5%"
          y1="20%"
          x2="25%"
          y2="35%"
          stroke="#00d4ff"
          strokeWidth="0.5"
        />

        <line
          x1="75%"
          y1="15%"
          x2="95%"
          y2="30%"
          stroke="#00d4ff"
          strokeWidth="0.5"
        />

        <line
          x1="5%"
          y1="80%"
          x2="25%"
          y2="65%"
          stroke="#00d4ff"
          strokeWidth="0.5"
        />

        <line
          x1="95%"
          y1="75%"
          x2="75%"
          y2="60%"
          stroke="#00d4ff"
          strokeWidth="0.5"
        />

        <circle cx="5%" cy="20%" r="2" fill="#00d4ff" />
        <circle cx="25%" cy="35%" r="2" fill="#00d4ff" />
        <circle cx="75%" cy="15%" r="2" fill="#00d4ff" />
        <circle cx="95%" cy="30%" r="2" fill="#00d4ff" />
        <circle cx="5%" cy="80%" r="2" fill="#00d4ff" />
        <circle cx="25%" cy="65%" r="2" fill="#00d4ff" />
        <circle cx="95%" cy="75%" r="2" fill="#00d4ff" />
        <circle cx="75%" cy="60%" r="2" fill="#00d4ff" />
      </svg>

      {/* Particles */}
      <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-cyan-400/40 animate-ping" />

      <div className="absolute right-1/4 top-1/3 h-1 w-1 rounded-full bg-cyan-400/40 animate-ping [animation-delay:700ms]" />

      <div className="absolute bottom-1/3 left-1/3 h-1 w-1 rounded-full bg-cyan-400/40 animate-ping [animation-delay:500ms]" />

      <div className="absolute bottom-1/4 right-1/3 h-1 w-1 rounded-full bg-cyan-400/40 animate-ping [animation-delay:300ms]" />

      {/* Side Glow */}
      <div className="absolute left-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl sm:h-40 sm:w-40" />

      <div className="absolute right-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl sm:h-40 sm:w-40" />

      {/* =====================================================
          LOGIN WRAPPER
      ====================================================== */}

      <div className="relative z-10 flex w-full max-w-[340px] flex-col items-center sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[520px]">

        {/* Card Outer Glow */}
        <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-cyan-500/15 blur-2xl sm:rounded-[28px]" />

        {/* =================================================
            LOGIN CARD
        ================================================== */}

        <div className="relative w-full overflow-hidden rounded-[24px] border border-cyan-400/20 bg-[#091526]/80 p-5 shadow-2xl backdrop-blur-2xl sm:rounded-[28px] sm:p-7 md:p-8 lg:p-10">

          {/* Card Inner Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5" />

          {/* Card Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

          {/* Top Border Glow */}
          <div className="absolute left-1/4 right-1/4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* =================================================
              CARD CONTENT
          ================================================== */}

          <div className="relative z-10">

            {/* =================================================
                SSD LOGO - BIGGER
            ================================================== */}

            <div className="mb-3 flex justify-center sm:mb-4 md:mb-5">

              <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px]">

                {/* Logo Glow */}
                <div className="absolute -inset-4 rounded-2xl bg-cyan-400/5 blur-xl" />

                {/* LOGO - NO BORDER */}
                <div className="relative flex w-full items-center justify-center">

                  <img
                    src="/images/ssd white logo (1).png"
                    alt="SSD Informatics"
                    className="relative z-10 h-auto w-full max-h-[120px] object-contain sm:max-h-[140px] md:max-h-[160px]"
                  />

                </div>

                {/* Logo Bottom Glow */}
                <div className="absolute -bottom-2 left-1/2 h-0.5 w-3/4 -translate-x-1/2 rounded-full bg-cyan-400/30 blur-sm" />

              </div>

            </div>

            {/* =================================================
                ADMIN LOGIN
            ================================================== */}

            <div className="text-center">
              <h2 className="text-xl font-bold tracking-wide text-white sm:text-2xl md:text-3xl lg:text-4xl">
                ADMIN LOGIN
              </h2>
            </div>

            {/* Subtitle */}
            <div className="mb-5 mt-1 text-center sm:mb-6 md:mb-7">
              <p className="text-[8px] font-light tracking-[0.15em] text-cyan-300/60 sm:text-[10px] md:text-xs lg:text-sm">
                SSD INFORMATICS DASHBOARD
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 sm:space-y-4 md:space-y-5"
            >

              {/* USERNAME */}

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-gray-300 sm:text-xs md:text-sm">
                  Username
                </label>

                <div className="group relative">

                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/30 transition-colors duration-300 group-focus-within:text-cyan-400 sm:left-4"
                    size={16}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="h-10 w-full rounded-xl border border-cyan-500/20 bg-white/5 pl-9 pr-3 text-xs text-white outline-none transition-all duration-300 placeholder:text-gray-500 hover:bg-white/10 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 sm:h-11 sm:pl-10 sm:text-sm md:h-12 md:pl-11 md:text-base"
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-cyan-500/0 transition-all duration-500 group-focus-within:from-cyan-500/5 group-focus-within:to-blue-500/5" />

                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-gray-300 sm:text-xs md:text-sm">
                  Password
                </label>

                <div className="group relative">

                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/30 transition-colors duration-300 group-focus-within:text-cyan-400 sm:left-4"
                    size={16}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-10 w-full rounded-xl border border-cyan-500/20 bg-white/5 pl-9 pr-10 text-xs text-white outline-none transition-all duration-300 placeholder:text-gray-500 hover:bg-white/10 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 sm:h-11 sm:pl-10 sm:pr-11 sm:text-sm md:h-12 md:pl-11 md:pr-12 md:text-base"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-300/40 transition-colors duration-300 hover:text-cyan-300 sm:right-4"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-cyan-500/0 transition-all duration-500 group-focus-within:from-cyan-500/5 group-focus-within:to-blue-500/5" />

                </div>
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-1 flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 md:h-12"
              >

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                {loading ? (
                  <span className="relative flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">

                    <svg
                      className="h-4 w-4 animate-spin sm:h-5 sm:w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>

                    LOGGING IN...
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">
                    LOG IN

                    <ChevronRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                )}

              </button>

              {/* FORGOT PASSWORD */}

              <div className="pt-1 text-center">
                <button
                  type="button"
                  className="text-[9px] font-light text-cyan-400/60 transition-colors hover:text-cyan-400 hover:underline sm:text-xs"
                >
                  Forgot Password?
                </button>
              </div>

              {/* REQUEST ACCESS */}

              <div className="text-center">
                <button
                  type="button"
                  className="text-[9px] font-light text-gray-400/60 transition-colors hover:text-gray-300 sm:text-xs"
                >
                  Request Access
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div className="relative z-10 mt-4 text-center sm:mt-5">
          <p className="text-[7px] tracking-[0.12em] text-cyan-200/20 sm:text-[8px] md:text-[10px]">
            © 2026 SSD INFORMATICS. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;