import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Layout
import AdminLayout from "./Layout/AdminLayout";

// Pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SendOtp from "./Pages/SendOtp";
import NewPassword from "./Pages/NewPassword";

import Dashboard from "./Pages/Dashboard";
import ManageAbout from "./Pages/ManageAbout";
import ManageServices from "./Pages/ManageServices";
import ManageContact from "./Pages/ManageContact";
import Settings from "./Pages/Settings";

// Manage Home
import ManageHome from "./Pages/ManageHome/ManageHome";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ==================== Admin Authentication ==================== */}

        <Route path="/" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/sendotp" element={<SendOtp />} />
        <Route path="/newpassword" element={<NewPassword />} />


        {/* ==================== Admin Panel ==================== */}

        <Route element={<AdminLayout />}>

          {/* Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />

          {/* Manage Home */}
          <Route
            path="/admin/home"
            element={<ManageHome />}
          />

          {/* Manage About */}
          <Route
            path="/admin/about"
            element={<ManageAbout />}
          />

          {/* Manage Services */}
          <Route
            path="/admin/services"
            element={<ManageServices />}
          />

          {/* Manage Contact */}
          <Route
            path="/admin/contact"
            element={<ManageContact />}
          />

          {/* Settings */}
          <Route
            path="/admin/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </Router>
  );
};

export default App;