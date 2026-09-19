import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Process from "../components/home/Process";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import HomePage from "./HomePage";
import OurTopClient from "../components/home/OurTopClient";
import Cirtficates from "../components/home/Cirtficates";

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL  ;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/home`
        );

        setHomeData(res.data.home);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomeData();
  }, []);

  
    return (

      <>

      <SEO
  title="SSD Informatics | Web Development & IT Solutions"
  description="SSD Informatics helps businesses grow with professional website development, mobile applications, ERP software, UI/UX design and digital marketing solutions."
  canonical="https://www.ssdinformatics.com/"
/>


        <HomePage />

        <AboutPreview />
        <ServicesPreview />
        <WhyChooseUs />
        <Process />
        <OurTopClient/>
        <Stats />
        <Testimonials />
        <Cirtficates/>
        <CTA />
      </>
    );
  

  return (
    <>



    </>
  );
};

export default Home;