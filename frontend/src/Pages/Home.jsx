import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Process from "../components/home/Process";
import PortfolioPreview from "../components/home/PortfolioPreview";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/home");
        setHomeData(res.data.home);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomeData();
  }, []);

  if (!homeData) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Hero data={homeData} />
      <AboutPreview/>
       <ServicesPreview/>
       <WhyChooseUs/>
       <Process/>
       <PortfolioPreview/>
       <Stats/>
       <Testimonials/>
       <CTA/>
    </>
  );
};

export default Home;