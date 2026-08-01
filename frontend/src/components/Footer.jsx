import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/444 logoai.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">
        {/* Company */}

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.img
              src={logo}
              alt="SSD Informatics Logo"
              className="w-14 cursor-pointer"
              whileHover={{
                scale: 1.08,
                rotate: 360,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
            />

            <div>
              <h2 className="text-3xl font-extrabold text-[#0B3C91] leading-none">
                SSD
              </h2>

              <p className="uppercase tracking-[4px] text-xs font-semibold text-slate-600">
                Informatics
              </p>
            </div>
          </motion.div>

          <h3 className="text-[15px] font-extrabold uppercase leading-tight text-[#0B3C91]">
            Smart Solutions
            <br />
            For A
            <br />
            Stronger
            <br />
            Digital
            <br />
            Future
          </h3>

          <p className="mt-5 text-slate-800 leading-6">
            We build modern websites, powerful web applications and
            result-driven digital solutions that help businesses grow with
            innovative technology.
          </p>
        </div>

        {/* Services */}

        <div>
          <h3 className="text-xl font-bold text-[#0B3C91] mb-6">
            Our Services
          </h3>

          <ul className="space-y-3 text-slate-700">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 8 }}
                className="
      hover:text-[#0B3C91]
      cursor-pointer
      transition
      relative
      group
      w-fit
    "
              >
                <Link to={link.path}>{link.name}</Link>

                <span
                  className="
        absolute
        left-0
        -bottom-1
        h-[2px]
        w-0
        bg-[#0B3C91]
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

        {/* Contact */}

        <div>
          <h3 className="text-xl font-bold text-[#0B3C91] mb-6">Contact Us</h3>

          <div className="space-y-5 text-slate-700">
            {[
              {
                icon: <Phone size={18} />,
                text: "+91 70546 38002",
              },

              {
                icon: <Globe size={18} />,
                text: "www.ssdinformatics.com",
              },

              {
                icon: <Mail size={18} />,
                text: "ssdinformatics.office@gmail.com",
              },

              {
                icon: <MapPin size={18} />,
                text: "Lucknow, Uttar Pradesh",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 8 }}
                className="
          flex
          items-center
          gap-3
          cursor-pointer
          relative
          group
          w-fit
        "
              >
                <span className="text-[#0B3C91]">{item.icon}</span>

                <span>{item.text}</span>

                {/* Underline Animation */}

                <span
                  className="
            absolute
            left-0
            -bottom-2
            h-[2px]
            w-0
            bg-[#0B3C91]
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

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-600 text-sm">
            © 2026 SSD Informatics. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 mt-4 md:mt-0 text-xl">
            <motion.div
              whileHover={{
                scale: 1.3,
                y: -5,
                rotate: 10,
              }}
              className="cursor-pointer text-slate-600 hover:text-[#0B3C91]"
            >
              <FaFacebook />
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.3,
                y: -5,
                rotate: 10,
              }}
              className="cursor-pointer text-slate-600 hover:text-[#0B3C91]"
            >
              <FaLinkedin />
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.3,
                y: -5,
                rotate: 10,
              }}
              className="cursor-pointer text-slate-600 hover:text-[#0B3C91]"
            >
              <FaGithub />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
