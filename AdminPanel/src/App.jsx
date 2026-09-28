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
import ManageContact from "./Pages/ManageContact";
import Settings from "./Pages/Settings";
import CareerApplications from "./Pages/CareerApplications";
import ManageCareers from "./Pages/ManageCareers";

import ManageTeam from "./Pages/ManageTeam";
import ManageBranches from "./Pages/ManageBranches";

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

          {/* Manage Contact */}
          <Route
            path="/admin/contact"
            element={<ManageContact />}
          />

          {/* Career Applications */}
          <Route
            path="/admin/career-applications"
            element={<CareerApplications />}
          />

          {/* Manage Career */}
          <Route
            path="/admin/careers"
            element={<ManageCareers />}
          />

          {/* Manage Team */}
          <Route
            path="/admin/team"
            element={<ManageTeam />}
          />

          {/* Manage Branches */}
          <Route
            path="/admin/branches"
            element={<ManageBranches />}
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