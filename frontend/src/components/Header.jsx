import logo from "../assets/444 logoai.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}

        <motion.div className="flex items-center gap-4 cursor-pointer">
          <motion.img
            src={logo}
            alt="SSD Informatics Logo"
            className="w-14 h-14 object-contain"
            whileHover={{
              scale: 1.08,
              rotate: 360,
            }}
            transition={{
              duration: 0.9,
              ease: "circOut",
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

        {/* Menu */}

        <nav>
          <ul className="flex items-center gap-10 text-[16px] font-medium text-slate-700">
            <motion.li
              whileHover={{ scale: 1.1, color: "#0B3C91" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer relative group"
            >
              <Link to="/">Home</Link>

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
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.1, color: "#0B3C91" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer relative group"
            >
              <Link to="/about">About</Link>
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
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.1, color: "#0B3C91" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer relative group"
            >
              <Link to="/services">Services</Link>
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
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.1, color: "#0B3C91" }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer relative group"
            >
              <Link to="/contact">Contact Us</Link>
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
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
