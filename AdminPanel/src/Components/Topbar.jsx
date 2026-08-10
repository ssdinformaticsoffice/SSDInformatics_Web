import {
  Bell,
  UserCircle,
  User,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Topbar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications");

        console.log("Notification API Response:", res.data);

        setNotifications(res.data.data);
      } catch (error) {
        console.log("Notification Error:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Close Dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const markNotificationsAsRead = async () => {
    try {
      await axios.put("http://localhost:5000/api/notifications/read");

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/", { replace: true });
  };

  return (
    <div className="w-full flex items-center justify-between gap-5 px-6 py-4 bg-slate-950 border-b border-slate-800">
      {/* Left - Welcome Section */}
      <div>
        <h2 className="text-white text-2xl font-bold">
          Welcome back, {admin?.name || "Admin"} 👋
        </h2>

        <p className="text-slate-400 mt-1">
          Here's what's happening with your SSD Informatics platform today.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* PART 2 YAHAN PAS      {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2.5 w-56 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={async () => {
              setNotificationOpen(!notificationOpen);

              if (!notificationOpen) {
                await markNotificationsAsRead();
              }
            }}
            className="relative h-11 w-11 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 flex items-center justify-center transition"
          >
            <Bell className="text-white" size={20} />
            {notifications.filter((item) => !item.isRead).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {notifications.filter((item) => !item.isRead).length}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-3 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-5 py-4 border-b border-slate-700 flex justify-between">
                <h3 className="text-white font-semibold">Notifications</h3>

                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                  {notifications.filter((item) => !item.isRead).length} New
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 px-5 py-4 border-b border-slate-800 hover:bg-slate-800"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <Mail size={18} className="text-white" />
                    </div>

                    <div>
                      <h4 className="text-white text-sm font-semibold">
                        New Contact Message
                      </h4>

                      <p className="text-slate-400 text-sm">{item.message}</p>

                      <span className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl px-3 py-2"
          >
            <UserCircle className="text-blue-500" size={42} />

            <div>
              <h3 className="text-white font-semibold">
                {admin?.name || "Admin"}
              </h3>

              <p className="text-slate-400 text-xs">Administrator</p>
            </div>

            <ChevronDown
              className={`text-slate-400 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-xl z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
