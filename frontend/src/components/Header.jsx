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
      className="
        sticky
        top-0
        left-0
        right-0
        z-[9999]
        w-full
        border-b
        border-blue-500/20
        bg-slate-950/70
        backdrop-blur-2xl
        shadow-[0_10px_35px_rgba(0,0,0,0.35)]
      "
    >
      {/* Main Header */}
      <div
        className="
          mx-auto
          flex
          min-h-[70px]
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-4
          sm:min-h-[76px]
          sm:px-6
          lg:px-8
        "
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <motion.div
            className="
              flex
              cursor-pointer
              items-center
              gap-1
              sm:gap-2
            "
            whileHover={{ scale: 1.03 }}
          >
            {/* Logo Image */}
            <motion.img
              src={logo}
              alt="SSD Informatics Logo"
              className="
                h-auto
                w-12
                shrink-0
                object-contain
                xs:w-14
                sm:w-16
                md:w-20
                lg:w-20
                xl:w-24
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

            {/* Logo Text */}
            <div className="min-w-0 leading-none">
              <h2
                className="
                  truncate
                  text-xl
                  font-extrabold
                  leading-tight
                  text-white
                  sm:text-2xl
                  md:text-3xl
                  lg:text-3xl
                "
              >
                SSD
              </h2>

              <p
                className="
                  mt-0.5
                  whitespace-nowrap
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-blue-400
                  xs:text-[9px]
                  sm:text-[10px]
                  sm:tracking-[3px]
                  md:text-xs
                  md:tracking-[4px]
                "
              >
                Informatics
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul
            className="
              flex
              items-center
              gap-7
              text-[15px]
              font-medium
              text-slate-300
              lg:gap-10
              lg:text-[16px]
            "
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.path}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="group relative"
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="
                    whitespace-nowrap
                    transition-all
                    duration-300
                    hover:text-cyan-300
                  "
                >
                  {link.name}
                </Link>

                {/* Underline */}
                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-[2px]
                    w-0
                    rounded-full
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
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            inline-flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue-500/20
            bg-slate-900/70
            text-slate-100
            transition-all
            duration-300
            hover:border-blue-400/50
            hover:text-cyan-300
            sm:h-11
            sm:w-11
            md:hidden
          "
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
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
            className="
              overflow-hidden
              border-t
              border-blue-500/10
              bg-slate-950/95
              backdrop-blur-2xl
              md:hidden
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-7xl
                px-4
                py-3
                sm:px-6
                sm:py-4
              "
            >
              <ul className="flex flex-col gap-1.5 text-base font-medium">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="
                        flex
                        min-h-11
                        items-center
                        rounded-xl
                        px-4
                        py-2.5
                        text-slate-200
                        transition-all
                        duration-300
                        hover:bg-blue-500/10
                        hover:text-cyan-300
                      "
                    >
                      {link.name}
                    </Link>
                  </motion.li>
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