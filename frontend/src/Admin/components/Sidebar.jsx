import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
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
      name: "Manage Contact",
      path: "/admin/contact",
      icon: MessageSquare,
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

    navigate("/admin/login");
  };

  return (
    <aside className="w-full lg:w-72 lg:min-h-screen bg-blue-900 text-white p-4 sm:p-6 flex-shrink-0">
      {/* Logo */}

      <h1 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-10">
        SSD Informatics
      </h1>

      {/* Menu */}

      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 p-3 rounded-xl transition
                  ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <button
        onClick={logout}
        className="flex min-h-11 items-center gap-3 mt-4 lg:mt-20 p-3 rounded-xl w-full hover:bg-red-600 transition"
      >
        <LogOut size={20} className="flex-shrink-0" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
