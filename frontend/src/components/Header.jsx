import logo from "../assets/ssd-white-logo.png";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-2xl border-b border-blue-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
    >
      <div className="max-w-7xl mx-auto h-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={logo}
              alt="SSD Informatics Logo"
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
                rotate: 360,
                scale: 1.08,
              }}
              transition={{
                rotate: {
                  duration: 0.9,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.25,
                },
              }}
            />

            <div className="-ml-7 leading-none">
              <h2 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-extrabold 
              text-white
              leading-tight
              ">
                SSD
              </h2>

              <p className="
              uppercase
              tracking-[4px]
              sm:tracking-[5px]
              text-xs
              sm:text-sm
              font-semibold 
              text-blue-400
              mt-0.5
              ">
                Informatics
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10 text-[16px] font-medium text-slate-300">
            {navLinks.map((link) => (
              <motion.li
                key={link.path}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link
                  to={link.path}
                  className="hover:text-cyan-300 transition-all duration-300"
                >
                  {link.name}
                </Link>

                <span
                  className="
                    absolute
                    left-0
                    -bottom-2
                    h-[2px]
                    w-0
                    bg-blue-500
                    shadow-[0_0_15px_rgba(59,130,246,1)]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-slate-900/70 text-slate-100 hover:border-blue-400/50 hover:text-blue-300 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-blue-500/10 bg-slate-950/95 backdrop-blur-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <ul className="flex flex-col gap-2 text-base font-medium">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center rounded-xl px-4 py-3 text-slate-200 hover:bg-blue-500/10 hover:text-cyan-300 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;