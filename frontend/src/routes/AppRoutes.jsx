import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../Admin/Layout/AdminLayout";

// Website Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import ServiceDetails from "../Pages/ServiceDetails";

// Admin Auth
import Login from "../Admin/pages/Login";
import Signup from "../Admin/pages/Signup";

// Admin Pages
import Dashbord from "../Admin/pages/Dashbord";
import ManageHome from "../Admin/pages/ManageHome/ManageHome";
import ManageAbout from "../Admin/pages/ManageAbout";
import ManageServices from "../Admin/pages/ManageServices";
import ManageContact from "../Admin/pages/ManageContact";
import Settings from "../Admin/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Website Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Auth */}
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />

      {/* Admin Auth */}
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />

      {/* Admin Panel */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashbord />} />
        <Route path="/admin/home" element={<ManageHome />} />
        <Route path="/admin/about" element={<ManageAbout />} />
        <Route path="/admin/services" element={<ManageServices />} />
        <Route path="/admin/contact" element={<ManageContact />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes >
  );
};

export default AppRoutes;