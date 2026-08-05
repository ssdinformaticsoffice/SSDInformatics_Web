import { useEffect, useState } from "react";
import axios from "axios";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/444 logoai.png";
import { Link } from "react-router-dom";


const Footer = () => {

  const [settings, setSettings] = useState({});


  useEffect(()=>{

    const fetchSettings = async()=>{

      try{

        const res = await axios.get(
          "http://localhost:5000/api/settings"
        );

        setSettings(res.data.data || {});

      }catch(error){
        console.log(error);
      }

    };


    fetchSettings();

  },[]);



  return (
    <footer className="bg-slate-950 border-t border-blue-500/10 mt-12 sm:mt-16 lg:mt-20 relative overflow-hidden">


      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">



        {/* Company */}

        <div>

          <motion.div
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5}}
            className="flex items-center gap-3 sm:gap-4 mb-6 min-w-0"
          >

            <motion.img
              src={logo}
              alt="SSD Informatics Logo"
              className="w-12 sm:w-14 cursor-pointer flex-shrink-0"
              whileHover={{
                scale:1.08,
                rotate:360
              }}
              transition={{
                duration:0.7,
                ease:"easeInOut"
              }}
            />


            <div className="min-w-0">

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none break-words">
                {settings.websiteName || "SSD"}
              </h2>


              <p className="uppercase tracking-[4px] text-xs font-semibold text-blue-400">
                Informatics
              </p>

            </div>

          </motion.div>



          <h3 className="text-[15px] font-extrabold uppercase leading-tight text-blue-400">
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



          <p className="mt-5 max-w-sm text-slate-400 leading-6">
            We build modern websites, powerful web applications and
            result-driven digital solutions that help businesses grow with
            innovative technology.
          </p>

        </div>





        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-bold text-white mb-6">
            Quick Links
          </h3>


          <ul className="space-y-3 text-slate-400">


          {[
            {name:"Home",path:"/"},
            {name:"About",path:"/about"},
            {name:"Services",path:"/services"},
            {name:"Contact",path:"/contact"}

          ].map((link,index)=>(


            <motion.li
            key={index}
            whileHover={{x:8}}
            className="hover:text-blue-400 cursor-pointer transition relative group w-fit"
            >

              <Link to={link.path}>
                {link.name}
              </Link>


              <span
              className="
              absolute
              left-0
              -bottom-1
              h-[2px]
              w-0
              bg-blue-500
              transition-all
              duration-500
              group-hover:w-full
              "
              ></span>


            </motion.li>


          ))}


          </ul>


        </div>





        {/* Contact */}

        <div>

          <h3 className="text-xl font-bold text-white mb-6">
            Contact Us
          </h3>


          <div className="space-y-5 text-slate-400">


          {[
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
            items-start
            gap-3
            cursor-pointer
            relative
            group
            w-full
            max-w-full
            sm:w-fit
            min-w-0
            hover:text-blue-400
            "
            >

              <span className="text-blue-400 flex-shrink-0 mt-1">
                {item.icon}
              </span>


              <span className="min-w-0 break-words leading-6">
                {item.text}
              </span>


              <span
              className="
              absolute
              left-0
              -bottom-2
              h-[2px]
              w-0
              bg-blue-500
              transition-all
              duration-500
              group-hover:w-full
              "
              ></span>


            </motion.div>


          ))}


          </div>


        </div>


      </div>





      {/* Bottom */}

      <div className="border-t border-blue-500/10 relative z-10">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">


          <p className="text-slate-500 text-sm leading-relaxed">
            © 2026 {settings.websiteName || "SSD Informatics"}. 
            All Rights Reserved.
          </p>



          <div className="flex items-center justify-center gap-5 text-xl">


            <motion.div
            whileHover={{
              scale:1.3,
              y:-5,
              rotate:10
            }}
            className="cursor-pointer text-slate-400 hover:text-blue-400"
            >
              <FaFacebook/>
            </motion.div>



            <motion.div
            whileHover={{
              scale:1.3,
              y:-5,
              rotate:10
            }}
            className="cursor-pointer text-slate-400 hover:text-blue-400"
            >
              <FaLinkedin/>
            </motion.div>



            <motion.div
            whileHover={{
              scale:1.3,
              y:-5,
              rotate:10
            }}
            className="cursor-pointer text-slate-400 hover:text-blue-400"
            >
              <FaGithub/>
            </motion.div>


          </div>


        </div>


      </div>



    </footer>
  );
};


export default Footer;


