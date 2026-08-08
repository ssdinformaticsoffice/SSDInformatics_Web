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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        formData,
      );

      // Token Save
      localStorage.setItem("token", response.data.token);

      // Admin Data Save
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      alert(response.data.message);

      // Dashboard Redirect
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a1120]">
      {/* Left Side - Branding & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a1120] via-[#0f1a2e] to-[#1a2a44] text-white items-center justify-center p-10 xl:p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full"></div>
        
        <div className="max-w-lg relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20">
              <span className="text-xl font-bold text-white">SSD</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SSD Informatics</h1>
              <p className="text-blue-300 text-sm">Admin Portal</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Welcome to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Admin Dashboard
              </span>
            </h2>
            
            <p className="text-blue-200/80 text-lg leading-relaxed">
              Manage your website content, services, pages, and enquiries from one centralized, powerful platform.
            </p>

            {/* Feature list */}
            <div className="space-y-3 pt-4">
              {[
                "Content Management System",
                "Service & Page Editor",
                "Enquiry Tracking",
                "Analytics Dashboard"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-blue-200/70">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Illustration */}
            <div className="mt-8 flex justify-center">
              <svg className="w-64 h-48 opacity-80" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="160" height="90" rx="8" fill="#1a2a44" stroke="#2a4a7a" strokeWidth="1.5"/>
                <rect x="30" y="50" width="140" height="10" rx="3" fill="#2a4a7a"/>
                <rect x="30" y="68" width="140" height="8" rx="2" fill="#1f3a5f"/>
                <rect x="30" y="82" width="140" height="8" rx="2" fill="#1f3a5f"/>
                <rect x="30" y="96" width="90" height="8" rx="2" fill="#1f3a5f"/>
                <circle cx="160" cy="55" r="8" fill="#3b82f6" opacity="0.6"/>
                <circle cx="160" cy="55" r="4" fill="#60a5fa"/>
                <path d="M100 130 L80 115 L120 115 L100 130Z" fill="#3b82f6" opacity="0.4"/>
                <path d="M60 115 L80 115" stroke="#3b82f6" strokeWidth="2"/>
                <path d="M120 115 L140 115" stroke="#3b82f6" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Glassmorphism Login Form */}
      <div className="w-full lg:w-1/2 flex min-h-screen lg:min-h-0 items-center justify-center bg-[#0f1629] px-4 sm:px-6 py-8 lg:py-12">
        <div className="w-full max-w-md">
          {/* Glass card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                <img
                  src="/images/ssd white logo.png"
                  alt="SSD logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">SSD Informatics</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome Back 👋
              </h2>
              <p className="text-blue-200/60 mt-2">Sign in to your admin account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-blue-200/80 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-blue-300/40" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@ssdinformatics.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-blue-200/80 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-blue-300/40" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-blue-200/30 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-blue-300/40 hover:text-blue-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
                <label className="flex items-center gap-2 text-blue-200/60 cursor-pointer hover:text-blue-200/80 transition-colors">
                  <input type="checkbox" className="accent-blue-500 w-4 h-4 rounded" />
                  <span>Remember Me</span>
                </label>
                <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full min-h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging In...
                  </span>
                ) : (
                  <>
                    Login
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-blue-200/30 text-sm mt-8">
              © 2026 SSD Informatics Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;