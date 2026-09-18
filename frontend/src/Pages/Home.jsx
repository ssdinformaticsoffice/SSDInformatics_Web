import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/home"
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