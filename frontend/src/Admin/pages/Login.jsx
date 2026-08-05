import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white items-center justify-center p-10 xl:p-12">
        <div className="max-w-md">
          <h1 className="text-4xl xl:text-5xl font-bold mb-6">SSD Informatics</h1>

          <p className="text-xl text-blue-100 leading-9">
            Welcome to the Admin Panel.
            <br />
            Manage your website content, services, pages, and enquiries from one
            place.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex min-h-screen lg:min-h-0 items-center justify-center bg-slate-100 px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Welcome Back 👋
            </h2>

            <p className="text-slate-500 mt-2">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="mt-2 relative">
                <Mail
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="mt-2 relative">
                <Lock
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-12 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <button type="button" className="text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-12 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            © 2026 SSD Informatics Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

