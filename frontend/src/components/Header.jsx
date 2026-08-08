import logo from "../assets/ssd-white-logo.png";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Share2,
  Palette,
  Code2,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    dropdown: true,

    sections: [
      {
        title: "Social Media",
        items: [
          {
            name: "Social Media Marketing",
            path: "/services/digital-marketing",
          },
          {
            name: "Google Ads",
            path: "/services/google-ads",
          },
          {
            name: "Meta Ads",
            path: "/services/meta-ads",
          },
          {
            name: "SEO Optimization",
            path: "/services/seo-optimization",
          },
        ],
      },

      {
        title: "UI/UX & Editing",
        items: [
          {
            name: "UI/UX Design",
            path: "/services/ui-ux-design",
          },
          {
            name: "Graphic Design",
            path: "/services/graphic-design",
          },
          {
            name: "Video Editing",
            path: "/services/video-editing",
          },
        ],
      },

      {
        title: "Development",
        items: [
          {
            name: "Web Development",
            path: "/services/website-development",
          },
          {
            name: "App Development",
            path: "/services/mobile-app-development",
          },
          {
            name: "Cloud Solutions",
            path: "/services/cloud-solutions",
          },
        ],
      },
    ],
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const serviceDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target)
      ) {
        setServiceOpen(false);
        setActiveSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      ref={serviceDropdownRef}
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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
          <ul className="flex items-center gap-8 lg:gap-10 text-[16px] font-medium text-slate-300">

            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >

                {link.dropdown ? (
                  <>
                    {/* Services Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setServiceOpen((prev) => !prev);
                        setActiveSection(null);
                      }}
                      className="
                flex
                items-center
                gap-1.5
                transition-all
                duration-300
                hover:text-cyan-300
              "
                    >
                      {link.name}

                      <ChevronDown
                        size={16}
                        className={`
                  transition-transform
                  duration-300
                  ${serviceOpen
                            ? "rotate-180 text-blue-400"
                            : "text-slate-400"
                          }
                `}
                      />
                    </button>

                    {/* Desktop Services Dropdown */}
                    <AnimatePresence>
                      {serviceOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.97,
                          }}
                          transition={{ duration: 0.2 }}
                          className="
                    absolute
                    left-1/2
                    top-full
                    mt-4
                    w-[300px]
                    -translate-x-1/2
                    overflow-hidden
                    rounded-2xl
                    border
                    border-blue-500/20
                    bg-slate-950/95
                    p-3
                    shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                    backdrop-blur-2xl
                  "
                        >

                          {/* Top Glow */}
                          <div
                            className="
                      absolute
                      left-0
                      right-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-blue-500
                      to-transparent
                    "
                          />

                          {/* 3 Sections */}
                          <div className="space-y-1">

                            {link.sections.map((section, index) => {
                              const icons = [
                                Share2,
                                Palette,
                                Code2,
                              ];

                              const SectionIcon = icons[index];

                              const isActive =
                                activeSection === section.title;

                              return (
                                <div key={section.title}>

                                  {/* Section Button */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveSection(
                                        isActive
                                          ? null
                                          : section.title
                                      );
                                    }}
                                    className={`
                              group
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-xl
                              px-3
                              py-3
                              text-left
                              transition-all
                              duration-200

                              ${isActive
                                        ? "bg-blue-500/10 text-white"
                                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                                      }
                            `}
                                  >
                                    <span className="flex items-center gap-3">

                                      <span
                                        className={`
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg

                                  ${isActive
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-500/10 text-blue-400"
                                          }
                                `}
                                      >
                                        <SectionIcon size={17} />
                                      </span>

                                      <span className="text-sm font-semibold">
                                        {section.title}
                                      </span>

                                    </span>

                                    <ChevronDown
                                      size={16}
                                      className={`
                                transition-transform
                                duration-300
                                ${isActive
                                          ? "rotate-180 text-blue-400"
                                          : "text-slate-500"
                                        }
                              `}
                                    />
                                  </button>

                                  {/* Services Items */}
                                  <AnimatePresence>
                                    {isActive && (
                                      <motion.div
                                        initial={{
                                          height: 0,
                                          opacity: 0,
                                        }}
                                        animate={{
                                          height: "auto",
                                          opacity: 1,
                                        }}
                                        exit={{
                                          height: 0,
                                          opacity: 0,
                                        }}
                                        transition={{
                                          duration: 0.2,
                                        }}
                                        className="overflow-hidden"
                                      >
                                        <div className="ml-12 border-l border-blue-500/20 py-1 pl-2">

                                          {section.items.map(
                                            (item) => (
                                              <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => {
                                                  setServiceOpen(false);
                                                  setActiveSection(null);
                                                  setIsOpen(false);
                                                }}
                                                className="
                                          group/item
                                          flex
                                          items-center
                                          justify-between
                                          rounded-lg
                                          px-3
                                          py-2.5
                                          text-sm
                                          text-slate-400
                                          transition-all
                                          duration-200
                                          hover:bg-blue-500/10
                                          hover:text-cyan-300
                                        "
                                              >
                                                <span>
                                                  {item.name}
                                                </span>

                                                <ArrowUpRight
                                                  size={14}
                                                  className="
                                            text-slate-600
                                            transition-all
                                            duration-200
                                            group-hover/item:text-blue-400
                                          "
                                                />
                                              </Link>
                                            )
                                          )}

                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                </div>
                              );
                            })}

                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  /* Normal Links */
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      setServiceOpen(false);
                      setActiveSection(null);
                    }}
                    className="
              transition-all
              duration-300
              hover:text-cyan-300
            "
                  >
                    {link.name}
                  </Link>
                )}

              </motion.li>
            ))}

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setServiceOpen(false);
            setActiveSection(null);
          }}
          className="
            inline-flex
            h-11
            w-11
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
            md:hidden
          "
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
            kdrop-blur-2xl
            className="
    md:hidden
    max-h-[calc(100vh-80px)]
    overflow-y-auto
    overflow-x-hidden
    border-t
    border-blue-500/10
    bg-slate-950/95
    backdrop-blur-2xl
  "
          >
            <div className="mx-auto max-w-7xl px-4 py-4 pb-8">
              <ul className="flex flex-col gap-2 text-base font-medium">

                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >

                    {link.dropdown ? (
                      <>
                        {/* Services */}
                        <button
                          type="button"
                          onClick={() => {
                            setServiceOpen((prev) => !prev);
                            setActiveSection(null);
                          }}
                          className="
    flex
    w-full
    items-center
    justify-between
    rounded-xl
    px-4
    py-3
    text-slate-200
    transition-all
    duration-300
    hover:bg-blue-500/10
    hover:text-cyan-300
  "
                        >
                          <span>{link.name}</span>

                          <ChevronDown
                            size={18}
                            className={`
      transition-transform
      duration-300
      ${serviceOpen
                                ? "rotate-180 text-blue-400"
                                : "text-slate-400"
                              }
    `}
                          />
                        </button>

                        {/* Mobile Services Dropdown */}
                        <AnimatePresence>
                          {serviceOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-2 mt-2 space-y-1 border-l border-blue-500/20 pl-3">

                                {link.sections.map((section, index) => {
                                  const icons = [Share2, Palette, Code2];
                                  const SectionIcon = icons[index];

                                  const isActive =
                                    activeSection === section.title;

                                  return (
                                    <div key={section.title}>

                                      {/* Section */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveSection(
                                            isActive ? null : section.title
                                          );
                                        }}
                                        className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  duration-200

                  ${isActive
                                            ? "bg-blue-500/10 text-white"
                                            : "text-slate-300 hover:bg-blue-500/10 hover:text-white"
                                          }
                `}
                                      >
                                        <span className="flex items-center gap-3">

                                          {/* Icon */}
                                          <span
                                            className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg

                      ${isActive
                                                ? "bg-blue-600 text-white"
                                                : "bg-blue-500/10 text-blue-400"
                                              }
                    `}
                                          >
                                            <SectionIcon size={17} />
                                          </span>

                                          <span className="text-sm font-semibold">
                                            {section.title}
                                          </span>

                                        </span>

                                        <ChevronDown
                                          size={16}
                                          className={`
                    shrink-0
                    transition-transform
                    duration-300
                    ${isActive
                                              ? "rotate-180 text-blue-400"
                                              : "text-slate-500"
                                            }
                  `}
                                        />
                                      </button>

                                      {/* Section Services */}
                                      <AnimatePresence>
                                        {isActive && (
                                          <motion.div
                                            initial={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            animate={{
                                              height: "auto",
                                              opacity: 1,
                                            }}
                                            exit={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            transition={{
                                              duration: 0.2,
                                            }}
                                            className="overflow-hidden"
                                          >
                                            <div className="ml-8 border-l border-blue-500/20 py-1 pl-2">

                                              {section.items.map((item) => (
                                                <Link
                                                  key={item.path}
                                                  to={item.path}
                                                  onClick={() => {
                                                    setServiceOpen(false);
                                                    setActiveSection(null);
                                                    setIsOpen(false);
                                                  }}
                                                  className="
                            group
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-sm
                            text-slate-400
                            transition-all
                            duration-200
                            hover:bg-blue-500/10
                            hover:text-cyan-300
                          "
                                                >
                                                  <span>{item.name}</span>

                                                  <ArrowUpRight
                                                    size={14}
                                                    className="
                              text-slate-600
                              transition-all
                              duration-200
                              group-hover:text-blue-400
                            "
                                                  />
                                                </Link>
                                              ))}

                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>

                                    </div>
                                  );
                                })}

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => {
                          setIsOpen(false);
                          setServiceOpen(false);
                        }}
                        className="
                    flex
                    items-center
                    rounded-xl
                    px-4
                    py-3
                    text-slate-200
                    transition-all
                    duration-300
                    hover:bg-blue-500/10
                    hover:text-cyan-300
                  "
                      >
                        {link.name}
                      </Link>
                    )}

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