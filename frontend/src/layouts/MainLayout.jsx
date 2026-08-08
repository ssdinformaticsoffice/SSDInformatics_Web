import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";

const MainLayout = () => {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
    </main>
    <Footer/>

     <FloatingCTA />
    </>
  );
};

export default MainLayout;