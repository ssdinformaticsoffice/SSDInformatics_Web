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
      path: "/admin",
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
    <aside className="w-72 min-h-screen bg-blue-900 text-white p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        SSD Informatics
      </h1>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition-all duration-300"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;