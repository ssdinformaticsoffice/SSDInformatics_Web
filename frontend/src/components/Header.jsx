import logo from "../assets/444 logoai.png";
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
      className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-blue-500/10"
    >
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="min-w-0" onClick={() => setIsOpen(false)}>
          <motion.div className="flex items-center gap-3 sm:gap-4 cursor-pointer min-w-0">
            <motion.img
              src={logo}
              alt="SSD Informatics Logo"
              className="w-11 h-11 sm:w-14 sm:h-14 object-contain flex-shrink-0"
              whileHover={{
                scale: 1.08,
                rotate: 360,
              }}
              transition={{
                duration: 0.9,
                ease: "circOut",
              }}
            />

            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                SSD
              </h2>

              <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs font-semibold text-blue-400 truncate">
                Informatics
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-10 text-sm lg:text-[16px] font-medium text-slate-300">
            {navLinks.map((link) => (
              <motion.li
                key={link.path}
                whileHover={{ scale: 1.05, color: "#60A5FA" }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer relative group whitespace-nowrap"
              >
                <Link to={link.path}>{link.name}</Link>

                <span
                  className="
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  w-0
                  bg-blue-500
                  shadow-[0_0_8px_rgba(96,165,250,0.8)]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
                ></span>
              </motion.li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-slate-900/70 text-slate-100 hover:border-blue-400/50 hover:text-blue-300 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-blue-500/10 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <ul className="flex flex-col gap-2 text-base font-medium text-slate-200">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex min-h-11 items-center rounded-xl px-4 py-3 hover:bg-blue-500/10 hover:text-blue-300 transition"
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
