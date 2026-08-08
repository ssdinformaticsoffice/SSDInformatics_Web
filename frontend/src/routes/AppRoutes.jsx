import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";


// Website Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import ServiceDetails from "../Pages/ServiceDetails";
import { Scroll } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* Website Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

    </Routes >
    </>
  );
};

export default AppRoutes;