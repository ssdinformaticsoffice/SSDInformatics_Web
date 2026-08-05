import { Bell, UserCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 px-4 sm:px-6 lg:px-8 py-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6 lg:mb-8">

      {/* Left */}
      <div className="min-w-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
          Welcome, {admin?.name || "Admin"} 👋
        </h2>

        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Manage your SSD Informatics website from your dashboard.
        </p>
      </div>

      {/* Right */}
      <div className="flex w-full xl:w-auto flex-wrap items-center gap-3 sm:gap-5">

        {/* Notification */}
        <button className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-slate-100 hover:bg-blue-100 transition inline-flex items-center justify-center flex-shrink-0">
          <Bell className="text-slate-700" size={22} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex min-w-0 flex-1 sm:flex-none items-center gap-3 bg-slate-100 rounded-xl px-3 sm:px-4 py-2">

          <UserCircle
            size={44}
            className="text-blue-700 flex-shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-800 truncate">
              {admin?.name || "Admin"}
            </h3>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

        </div>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/admin/profile")}
          className="min-h-11 w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          <User size={18} />
          My Profile
        </button>

      </div>

    </div>
  );
};

export default Topbar;
