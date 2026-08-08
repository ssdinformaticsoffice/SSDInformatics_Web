import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import Loader from "../components/Loader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <FloatingCTA />

      <Footer />
    </>
  );
};

export default MainLayout;