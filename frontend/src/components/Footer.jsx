import { useEffect, useState } from "react";
import axios from "axios";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/ssd-white-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/settings");
        setSettings(res.data.data || {});
      } catch (error) {
        console.log(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-blue-500/10  relative overflow-hidden">

      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div
        className="
        max-w-7xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        py-9 
        sm:py-16
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-10 
        relative 
        z-10
        "
      >

        {/* Company */}
        <div className="min-w-0">

          <motion.div
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:.5}}
            className="
            flex 
            md:flex-col 
            xs:flex-row
            sm:flex-col
            md:flex-row
            items-center
            sm:items-start
            mb-4
            md:mb-6
            "
          >

            <motion.img
              src={logo}
              alt="SSD Logo"
              className="
              w-16
              xs:w-20
              sm:w-24
              md:w-28
              lg:w-24
              xl:w-28
              2xl:w-32
              h-auto
              object-contain
              flex-shrink-0
              "
              whileHover={{
                rotate:360,
                scale:1.08
              }}
              transition={{
                duration:.8
              }}
            />

            <div className="text-center sm:text-left ">

              <h2 className="
              text-2xl 
              sm:text-3xl 
              md:text-4xl
              font-extrabold 
              text-white

              leading-tight
              ">
                {settings.websiteName || "SSD"}
              </h2>

              <p className="
              uppercase
              tracking-[4px]
              sm:tracking-[5px]
              text-xs
              sm:text-sm
              text-blue-400
              font-semibold
              mt-0.5
              ">
                Informatics
              </p>

            </div>

          </motion.div>

          <h3 className="
          text-sm
          sm:text-[15px]
          font-extrabold
          uppercase
          text-blue-400
          leading-tight
          ">
            Smart Solutions
            <br/>
            For A
            <br/>
            Stronger
            <br/>
            Digital
            <br/>
            Future
          </h3>

          <p className="
          mt-5
          text-slate-400
          leading-7
          max-w-sm
          text-sm
          sm:text-base
          ">
            We build modern websites, powerful web applications and
            result-driven digital solutions that help businesses grow.
          </p>

        </div>

        {/* Links */}
        <div>

          <h3 className="
          text-xl 
          font-bold 
          text-white 
          mb-6
          ">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-400">

          {
            [
              {name:"Home",path:"/"},
              {name:"About",path:"/about"},
              {name:"Services",path:"/services"},
              {name:"Contact",path:"/contact"}
            ].map((link,index)=>(

              <motion.li
              key={index}
              whileHover={{x:8}}
              className="
              w-fit
              hover:text-blue-400
              transition
              "
              >

              <Link to={link.path}>
                {link.name}
              </Link>

              </motion.li>

            ))
          }

          </ul>

        </div>

        {/* Contact */}
        <div className="min-w-0">

          <h3 className="
          text-xl
          font-bold
          text-white
          mb-6
          ">
            Contact Us
          </h3>

          <div className="space-y-5 text-slate-400">

          {
            [
              {
                icon:<Phone size={18}/>,
                text:settings.phone || "+91 70546 38002"
              },
              {
                icon:<Globe size={18}/>,
                text:settings.websiteName || "www.ssdinformatics.com"
              },
              {
                icon:<Mail size={18}/>,
                text:settings.email || "ssdinformatics.office@gmail.com"
              },
              {
                icon:<MapPin size={18}/>,
                text:settings.address || "Lucknow, Uttar Pradesh"
              }
            ].map((item,index)=>(

              <motion.div
              key={index}
              whileHover={{x:8}}
              className="
              flex
              gap-3
              items-start
              max-w-full
              "
              >

                <span className="text-blue-400 mt-1 flex-shrink-0">
                  {item.icon}
                </span>

                <span className="
                break-all
                text-sm
                sm:text-base
                leading-6
                ">
                  {item.text}
                </span>

              </motion.div>

            ))
          }

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="
      border-t
      border-blue-500/10
      ">

        <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-5
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-5
        text-center
        ">

          <p className="
          text-slate-500
          text-sm
          ">
            © 2026 {settings.websiteName || "SSD Informatics Private Limited"}.
            All Rights Reserved.
          </p>

          <div className="
          flex
          gap-5
          text-xl
          ">

          {
            [
              <FaFacebook/>,
              <FaLinkedin/>,
              <FaGithub/>
            ].map((icon,index)=>(

              <motion.div
              key={index}
              whileHover={{
                scale:1.3,
                y:-5
              }}
              className="
              cursor-pointer
              text-slate-400
              hover:text-blue-400
              "
              >

              {icon}

              </motion.div>

            ))
          }

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;