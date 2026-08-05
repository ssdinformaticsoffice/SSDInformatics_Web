import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import ServiceDetails from "../Pages/ServiceDetails";
import Login from "../Admin/pages/Login";
import Signup from "../Admin/pages/Signup";
import Dashbord from "../Admin/pages/Dashbord";
import ManageHome from "../Admin/pages/ManageHome/ManageHome";
import ManageContact from "../Admin/pages/ManageContact";
import Settings from "../Admin/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/services/:slug" element={<ServiceDetails />} />

        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* admin */}
      <Route path="/admin/signup" element={<Signup />}></Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashbord />} />
      <Route path="/admin/home" element={<ManageHome />}></Route>
      <Route path="/admin/contact" element={<ManageContact />}></Route>
      <Route path="/admin/settings" element={<Settings />}></Route>
    </Routes>
  );
};

export default AppRoutes;
