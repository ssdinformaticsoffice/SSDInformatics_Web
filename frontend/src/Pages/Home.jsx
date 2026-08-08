import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Process from "../components/home/Process";
import PortfolioPreview from "../components/home/PortfolioPreview";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import HomePage from "./homePage";

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

  if (!homeData) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.99,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <HomePage />

        <AboutPreview />

        <ServicesPreview />

        <WhyChooseUs />

        <Process />

        <PortfolioPreview />

        <Stats />

        <Testimonials />

        <CTA />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.99,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Your dynamic home content will go here */}
    </motion.div>
  );
};

export default Home;