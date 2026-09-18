import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  X,
  UsersRound,
} from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile = false,
  onMobileClose,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Home",
      path: "/admin/home",
      icon: Home,
    },
    {
      name: "Manage About",
      path: "/admin/about",
      icon: Info,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: Briefcase,
    },
    {
    name: "Manage Careers",
    path: "/admin/careers",
    icon: Briefcase,
  },

  {
  name: "Manage Team",
  path: "/admin/team",
  icon: UsersRound,
},
    {
      name: "Manage Contact",
      path: "/admin/contact",
      icon: MessageSquare,
    },
    {
  name: "Career Applications",
  path: "/admin/career-applications",
  icon: Briefcase,
},
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/");

    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <aside
      className={`
        fixed
        lg:sticky
        top-0
        left-0
        z-50
        h-screen
        w-[270px]
        flex-shrink-0
        bg-slate-950
        text-white
        flex
        flex-col
        border-r
        border-slate-800

        transition-transform
        duration-300
        ease-in-out

        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* ==============================
          LOGO SECTION - Large & Responsive
      =============================== */}

      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* SSD Informatics Logo - Larger */}
          <img
            src="/images/ssd white logo (1).png"
            alt="SSD Informatics"
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] object-contain flex-shrink-0"
          />
          
          {/* SSD Informatics Text - In One Line */}
          <span className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">
            SSD Informatics
          </span>
        </div>

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={() => {
              if (onMobileClose) {
                onMobileClose();
              }
            }}
            className="
              lg:hidden
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-slate-400
              hover:text-white
              hover:bg-slate-800
              transition
              flex-shrink-0
              ml-2
            "
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* ==============================
          MENU
      =============================== */}

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  relative
                  overflow-hidden

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-700
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                      `
                      : `
                        text-slate-400
                        hover:text-white
                        hover:bg-slate-900
                      `
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-lg shadow-cyan-400/50"></div>
                    )}
                    <Icon 
                      size={20} 
                      className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                      }`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ==============================
          LOGOUT BUTTON
      =============================== */}

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3
            py-3
            rounded-xl
            text-sm
            font-medium
            text-slate-400
            hover:text-white
            hover:bg-red-500/10
            transition
            group
          "
        >
          <LogOut 
            size={20} 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:text-red-400"
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;