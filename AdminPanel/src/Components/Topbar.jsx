import {
  Bell,
  UserCircle,
  Search,
  ChevronDown,
  LogOut,
  Mail,
  Menu,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Topbar = ({ setSidebarOpen, isMobile, sidebarOpen, onHamburgerClick }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000/api";

  // ================================
  // Fetch Notifications
  // ================================

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_URL}/notifications`);

        console.log("Notification API Response:", res.data);

        setNotifications(res.data.data || []);
      } catch (error) {
        console.log("Notification Error:", error);
      }
    };

    fetchNotifications();
  }, []);

  // ================================
  // Close Dropdowns Outside Click
  // ================================

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================================
  // Mark Notifications Read
  // ================================

  const markNotificationsAsRead = async () => {
    try {
      await axios.put(`${API_URL}/notifications/read`);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );
    } catch (error) {
      console.log("Notification Read Error:", error);
    }
  };

  // ================================
  // Logout
  // ================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/", { replace: true });
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 flex-shrink-0">
      <div
        className="
          w-full
          px-3
          sm:px-5
          md:px-6
          lg:px-8
          py-3
          sm:py-4
          md:py-5
          flex
          items-center
          gap-2
          sm:gap-3
          md:gap-4
          lg:gap-6
        "
      >
        {/* ================================
            LEFT SECTION
        ================================= */}

        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
          <button
            id="hamburger-button"
            onClick={onHamburgerClick || (() => setSidebarOpen(true))}
            className="
              lg:hidden
              flex-shrink-0
              w-10
              h-10
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              hover:bg-blue-700
              transition
              shadow-lg
              shadow-blue-600/20
              z-10
            "
            aria-label="Toggle sidebar"
          >
            <Menu size={21} />
          </button>

          {/* Welcome Content - With proper spacing next to hamburger */}
          <div className="min-w-0 flex-1">
            <h2
              className="
                text-sm
                sm:text-base
                md:text-xl
                lg:text-2xl
                font-bold
                text-white
                leading-tight
                truncate
              "
            >
              Welcome back, {admin?.name || "Admin"} 👋
            </h2>

            {/* Description - Hidden on very small screens */}
            <p
              className="
                hidden
                sm:block
                text-slate-400
                text-[10px]
                sm:text-xs
                md:text-sm
                mt-0.5
                sm:mt-1
                leading-relaxed
                truncate
                max-w-full
              "
            >
              Here's what's happening with your SSD Informatics platform today.
            </p>
          </div>
        </div>

        {/* ================================
            RIGHT SECTION
        ================================= */}

        <div
          className="
            flex
            items-center
            gap-1.5
            sm:gap-2
            md:gap-3
            flex-shrink-0
          "
        >
          {/* ================================
              SEARCH - Hidden on very small screens
          ================================= */}

          <div
            className="
              hidden
              sm:block
              relative
              flex-shrink-0
            "
          >
            <Search
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                pl-9
                pr-3
                py-2
                md:py-2.5
                w-32
                md:w-44
                lg:w-56
                bg-slate-900
                border
                border-slate-700
                rounded-xl
                text-sm
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-blue-500
                transition
              "
            />
          </div>

          {/* ================================
              NOTIFICATION
          ================================= */}

          <div className="relative flex-shrink-0" ref={notificationRef}>
            <button
              onClick={async () => {
                const newState = !notificationOpen;

                setNotificationOpen(newState);

                if (newState && unreadCount > 0) {
                  await markNotificationsAsRead();
                }
              }}
              className="
                relative
                h-10
                w-10
                sm:h-11
                sm:w-11
                rounded-xl
                bg-slate-900
                border
                border-slate-700
                hover:border-blue-500
                flex
                items-center
                justify-center
                transition
              "
            >
              <Bell className="text-white" size={18} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    bg-red-500
                    text-white
                    text-[10px]
                    font-semibold
                    min-w-[18px]
                    h-[18px]
                    px-1
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}

            {notificationOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  sm:mt-3
                  w-[calc(100vw-32px)]
                  sm:w-80
                  md:w-96
                  max-w-96
                  bg-slate-900
                  border
                  border-slate-700
                  rounded-2xl
                  shadow-2xl
                  overflow-hidden
                  z-[100]
                "
              >
                {/* Header */}

                <div
                  className="
                    px-4
                    sm:px-5
                    py-3
                    sm:py-4
                    border-b
                    border-slate-700
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <h3 className="text-white font-semibold text-sm sm:text-base">Notifications</h3>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      bg-blue-600
                      text-white
                      px-2
                      py-1
                      rounded-full
                      whitespace-nowrap
                    "
                  >
                    {unreadCount} New
                  </span>
                </div>

                {/* Notification List */}

                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((item) => (
                      <div
                        key={item.id || item._id}
                        className="
                          flex
                          gap-3
                          px-4
                          sm:px-5
                          py-3
                          sm:py-4
                          border-b
                          border-slate-800
                          hover:bg-slate-800
                          transition
                        "
                      >
                        <div
                          className="
                            h-8
                            w-8
                            sm:h-10
                            sm:w-10
                            flex-shrink-0
                            rounded-full
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Mail size={15} className="text-white" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-white text-xs sm:text-sm font-semibold">
                            New Contact Message
                          </h4>

                          <p
                            className="
                              text-slate-400
                              text-xs
                              sm:text-sm
                              mt-0.5
                              sm:mt-1
                              break-words
                            "
                          >
                            {item.message}
                          </p>

                          <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5 sm:mt-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-500 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================================
              PROFILE
          ================================= */}

          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="
                flex
                items-center
                gap-1.5
                sm:gap-3
                bg-slate-900
                border
                border-slate-700
                hover:border-blue-500
                rounded-xl
                px-1.5
                sm:px-3
                py-1.5
                sm:py-2
                transition
              "
            >
              <UserCircle className="text-blue-500" size={28} sm:size={36} />

              {/* Profile Text - Hidden on very small screens */}
              <div className="hidden sm:block text-left min-w-0">
                <h3 className="text-white font-semibold text-xs sm:text-sm truncate max-w-[80px] md:max-w-[120px]">
                  {admin?.name || "Admin"}
                </h3>

                <p className="text-slate-400 text-[10px] sm:text-xs">Administrator</p>
              </div>

              <ChevronDown
                size={16}
                className={`
                  text-slate-400
                  transition-transform
                  duration-200
                  flex-shrink-0
                  ${dropdownOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* Profile Dropdown */}

            {dropdownOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  sm:mt-3
                  w-48
                  sm:w-56
                  bg-slate-900
                  border
                  border-slate-700
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                  z-[100]
                "
              >
                <button
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-3
                    w-full
                    px-4
                    py-3
                    text-red-400
                    hover:bg-red-500/10
                    transition
                    text-sm
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;