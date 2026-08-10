import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1024
  );

  // =================================
  // Detect Screen Size
  // =================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile(mobile);

      // Close mobile sidebar when switching to desktop
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =================================
  // Close Sidebar Outside Click
  // =================================

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen) {
        const sidebar =
          document.getElementById("mobile-sidebar");

        const hamburger =
          document.getElementById("hamburger-button");

        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          hamburger &&
          !hamburger.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isMobile, sidebarOpen]);

  // =================================
  // Prevent Body Scroll
  // =================================

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  // =================================
  // Sidebar Functions
  // =================================

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b1628]">

      {/* =================================
          DESKTOP SIDEBAR
      ================================== */}

      <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0 h-full">
        <Sidebar
          sidebarOpen={true}
          setSidebarOpen={setSidebarOpen}
          isMobile={false}
          onMobileClose={closeSidebar}
        />
      </aside>

      {/* =================================
          MOBILE SIDEBAR
      ================================== */}

      {isMobile && (
        <>
          {/* Overlay */}

          <div
            className={`
              fixed
              inset-0
              bg-black/50
              z-40
              transition-opacity
              duration-300
              ${
                sidebarOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            `}
            onClick={closeSidebar}
          />

          {/* Mobile Drawer */}

          <aside
            id="mobile-sidebar"
            className={`
              fixed
              top-0
              left-0
              bottom-0
              w-64
              max-w-[85vw]
              bg-white
              z-50
              transform
              transition-transform
              duration-300
              ease-in-out
              shadow-2xl
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
              }
            `}
          >
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isMobile={true}
              onMobileClose={closeSidebar}
            />
          </aside>
        </>
      )}

      {/* =================================
          MAIN CONTENT AREA
      ================================== */}

      <div
        className="
          flex-1
          min-w-0
          w-full
          h-full
          flex
          flex-col
          overflow-hidden
          bg-[#0b1628]
        "
      >

        {/* =================================
            TOPBAR
        ================================== */}

        <div className="flex-shrink-0 w-full">
          <Topbar
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
            sidebarOpen={sidebarOpen}
            onHamburgerClick={toggleSidebar}
          />
        </div>

        {/* =================================
            PAGE CONTENT
        ================================== */}

        <main
          className="
            flex-1
            min-w-0
            w-full
            overflow-y-auto
            overflow-x-hidden
            bg-[#0b1628]
          "
        >
          <div className="w-full min-w-0 max-w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;