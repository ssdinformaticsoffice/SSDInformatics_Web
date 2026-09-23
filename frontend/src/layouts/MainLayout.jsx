import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import Loader from "../components/Loader";
import TopHeader from "../components/TopHeader";

const MainLayout = () => {
  const skipLoader =
    new URLSearchParams(window.location.search).get("skipLoader") === "true";

  const [loading, setLoading] = useState(!skipLoader);

  useEffect(() => {
    if (skipLoader) {
      const url = new URL(window.location.href);
      url.searchParams.delete("skipLoader");

      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  }, [skipLoader]);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <TopHeader />

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