import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [settings, setSettings] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================================
  // GET ADMIN PROFILE
  // ================================

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Admin session not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const admin = response.data?.admin;

      if (admin) {
        setSettings({
          name: admin.name || "",
          email: admin.email || "",
          role: admin.role || "",
        });
      } else {
        toast.error("Admin profile not found");
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load admin profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // UPDATE PROFILE
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = settings.name.trim();
    const email = settings.email.trim();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Admin session expired. Please login again.");
        return;
      }

      const response = await axios.put(
        `${API_URL}/admin/profile`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const admin = response.data?.admin;

      if (response.data?.success && admin) {
        toast.success(
          response.data.message ||
            "Profile updated successfully"
        );

        // Update localStorage admin data
        const savedAdmin = localStorage.getItem("admin");

        if (savedAdmin) {
          try {
            const oldAdmin = JSON.parse(savedAdmin);

            localStorage.setItem(
              "admin",
              JSON.stringify({
                ...oldAdmin,
                name: admin.name,
                email: admin.email,
                role: admin.role,
              })
            );
          } catch (error) {
            console.error(
              "Local Storage Admin Error:",
              error
            );
          }
        }

        // Update form with latest data
        setSettings({
          name: admin.name || "",
          email: admin.email || "",
          role: admin.role || "",
        });
      } else {
        toast.error(
          response.data?.message ||
            "Profile update failed"
        );
      }
    } catch (error) {
      console.error("Profile Update Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      {/* ================================
          HEADER
      ================================= */}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Profile Settings
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage your admin profile information.
        </p>
      </div>

      {/* ================================
          PROFILE FORM
      ================================= */}

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-4xl
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          p-5
          shadow-xl
          sm:p-6
          lg:p-8
        "
      >
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-500" />
              Loading profile...
            </div>
          </div>
        ) : (
          <>
            {/* ================================
                FORM FIELDS
            ================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-500
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                  "
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-500
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                  "
                />
              </div>

              {/* Role */}

              <div className="md:col-span-2">
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Role
                </label>

                <input
                  id="role"
                  type="text"
                  name="role"
                  value={settings.role}
                  readOnly
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-4
                    py-3
                    text-sm
                    text-slate-400
                    outline-none
                    cursor-not-allowed
                  "
                />

                <p className="mt-2 text-xs text-slate-500">
                  Admin role cannot be changed from profile settings.
                </p>
              </div>
            </div>

            {/* ================================
                SAVE BUTTON
            ================================= */}

            <div className="mt-7 flex justify-end border-t border-slate-800 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  rounded-xl
                  bg-blue-600
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Settings;