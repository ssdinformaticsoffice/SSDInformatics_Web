import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  Cpu,
  Globe,
  ArrowRight,
  Users,
  Clock,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutImage from "/images/about-image.jpg";

const API_URL = "http://localhost:5000/api/team";

const About = () => {
  // =====================================================
  // TEAM
  // =====================================================

  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamIndex, setTeamIndex] = useState(0);

  // =====================================================
  // MOBILE SWIPE
  // =====================================================

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  // =====================================================
  // WHY CHOOSE US
  // =====================================================

  const whyChooseUs = [
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Skilled professionals with years of experience in technology, design, and digital strategy.",
      gradient: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-400/20",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      delay: 0.1,
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description:
        "Timely delivery of all projects without compromising on quality or performance.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-400/20",
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      delay: 0.2,
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Rigorous testing and quality checks to ensure top-notch performance and reliability.",
      gradient: "from-blue-500/20 to-purple-500/10",
      border: "border-blue-400/20",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      delay: 0.3,
    },
    {
      icon: Shield,
      title: "Client Satisfaction",
      description:
        "Building lasting relationships through trust, transparency, and exceptional service.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-400/20",
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      delay: 0.4,
    },
  ];

  // =====================================================
  // FETCH TEAM
  // =====================================================

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setTeamLoading(true);

        const response = await fetch(API_URL);

        const data = await response.json();

        if (data.success) {
          setTeamMembers(data.data || []);
        } else {
          setTeamMembers([]);
        }
      } catch (error) {
        console.error("Team Fetch Error:", error);
        setTeamMembers([]);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // =====================================================
  // SCROLL TO TEAM
  // =====================================================

  useEffect(() => {
    if (window.location.hash === "#our-team") {
      setTimeout(() => {
        const section = document.getElementById("our-team");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, []);

  // =====================================================
  // NEXT TEAM
  // =====================================================

  const nextTeam = () => {
    if (!teamMembers.length) return;

    setTeamIndex((prev) =>
      prev + 1 >= teamMembers.length ? 0 : prev + 1
    );
  };

  // =====================================================
  // PREVIOUS TEAM
  // =====================================================

  const previousTeam = () => {
    if (!teamMembers.length) return;

    setTeamIndex((prev) =>
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  // =====================================================
  // MOBILE TOUCH START
  // =====================================================

  const handleTouchStart = (event) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  // =====================================================
  // MOBILE TOUCH MOVE
  // =====================================================

  const handleTouchMove = (event) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  // =====================================================
  // MOBILE TOUCH END
  // =====================================================

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (Math.abs(distance) < minSwipeDistance) {
      return;
    }

    if (distance > 0) {
      nextTeam();
    } else {
      previousTeam();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="overflow-x-hidden bg-[#020617] text-white">

      {/* =====================================================
          ABOUT US
      ===================================================== */}

      <section className="relative flex items-center overflow-hidden">
        <div className="absolute inset-0">

          <div
            className="
              absolute
              inset-0
              scale-105
              bg-cover
              bg-center
              bg-no-repeat
              blur-[2px]
            "
            style={{
              backgroundImage: `url(${aboutImage})`,
            }}
          />

          <div className="absolute inset-0 bg-slate-950/75 sm:bg-slate-950/78 lg:bg-slate-950/80" />

          <div className="absolute inset-0 bg-blue-950/20" />

          <motion.div
            className="
              absolute
              left-[-15%]
              top-[10%]
              h-48
              w-48
              rounded-full
              bg-blue-500/10
              blur-[80px]
              sm:left-[5%]
              sm:h-64
              sm:w-64
              sm:blur-[100px]
              lg:left-[10%]
              lg:h-72
              lg:w-72
            "
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="
              absolute
              bottom-[5%]
              right-[-15%]
              h-56
              w-56
              rounded-full
              bg-cyan-500/10
              blur-[90px]
              sm:right-[5%]
              sm:h-72
              sm:w-72
              sm:blur-[120px]
              lg:right-[10%]
              lg:h-80
              lg:w-80
            "
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-5xl
            px-4
            py-8
            sm:px-6
            sm:py-10
            lg:px-8
            lg:py-12
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div
              className="
                mb-3
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-blue-400/30
                bg-blue-500/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-blue-300
                backdrop-blur-md
                sm:mb-4
                sm:px-4
                sm:py-2
                sm:text-sm
              "
            >
              <Sparkles size={14} />
              About SSD Informatics
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Building Technology.

              <span className="block text-blue-400">
                Growing Businesses.
              </span>
            </h2>

            <div className="mx-auto mt-4 max-w-3xl space-y-4 sm:mt-8 sm:space-y-5">

              <p
                className="
                  text-sm
                  leading-6
                  text-slate-300
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                  sm:leading-7
                  md:leading-8
                "
              >
                SSD Informatics is a technology and digital solutions
                company focused on helping businesses build, grow, and
                succeed in the digital world.
              </p>

              <p
                className="
                  text-sm
                  leading-6
                  text-slate-300
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                  sm:leading-7
                  md:leading-8
                "
              >
                We provide
                <span className="font-semibold text-white">
                  {" "}
                  software development, web development, and modern IT
                  solutions
                </span>{" "}
                designed around your business needs.
              </p>

              <p
                className="
                  text-sm
                  leading-6
                  text-slate-300
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                  sm:leading-7
                  md:leading-8
                "
              >
                Our approach combines
                <span className="font-semibold text-blue-300">
                  {" "}
                  technology, creativity, and strategy
                </span>{" "}
                to create reliable, scalable, and result-oriented digital
                solutions.
              </p>
            </div>

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:mt-10
                sm:flex-row
                sm:gap-4
              "
            >
              <a
                href="/services/website-development"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  duration-300
                  hover:bg-blue-500
                  hover:shadow-lg
                  hover:shadow-blue-500/30
                  sm:w-auto
                  sm:px-7
                  sm:py-3.5
                "
              >
                Explore Our Services
                <ArrowRight size={17} />
              </a>

              <a
                href="/contact"
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-600
                  bg-slate-950/20
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:border-blue-500
                  hover:bg-blue-500/10
                  sm:w-auto
                  sm:px-7
                  sm:py-3.5
                "
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}

      <section className="relative px-4 py-10 sm:px-6 sm:py-15 md:py-15 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <h1 className="text-center text-3xl font-bold leading-tight sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
            About Us
          </h1>

          <div className="mx-auto mt-4 h-0.5 w-42 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300 sm:mt-8 sm:space-y-4 sm:text-base md:text-lg">

            <p>
              <strong className="text-white">
                SSD Informatics Pvt. Ltd.
              </strong>{" "}
              is a technology and digital solutions company specializing
              in{" "}
              <strong className="text-blue-300">
                Software Development, Web Development, and Social Media
                Management
              </strong>
              . We help businesses build a strong digital presence through
              innovative technology, creative design, and effective digital
              strategies.
            </p>

            <p>
              From developing customized software and modern websites to
              managing social media platforms and strengthening brand
              visibility, we provide{" "}
              <strong className="text-blue-300">
                end-to-end digital solutions
              </strong>{" "}
              designed around our clients' unique business needs.
            </p>

            <p>
              Our goal is to combine{" "}
              <strong className="text-blue-300">
                technology, creativity, and strategy
              </strong>{" "}
              to help businesses improve their operations, connect with
              their audience, and grow in the digital world.
            </p>

            <p className="mb-10 text-sm font-medium text-blue-200/80 sm:text-base">
              "At SSD Informatics, we believe that every business deserves
              technology that is smart, scalable, reliable, and
              result-oriented."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6 lg:gap-8">

            {/* MISSION */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-full rounded-2xl border border-blue-500/15 bg-slate-900/40 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/30 sm:p-6 md:p-8">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 sm:mb-4 sm:h-12 sm:w-12">
                  <Target size={20} />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Our Mission
                </h2>

                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300 sm:mt-4 sm:space-y-3 sm:text-base">

                  <p>
                    Our mission is to empower businesses with{" "}
                    <strong className="text-blue-300">
                      innovative technology and effective digital solutions
                    </strong>{" "}
                    that simplify operations, strengthen online presence,
                    and accelerate growth.
                  </p>

                  <p>
                    We are committed to delivering high-quality{" "}
                    <strong className="text-blue-300">
                      software, websites, and social media solutions
                    </strong>{" "}
                    that combine performance, creativity, security, and
                    usability while building long-term relationships with
                    our clients through trust and excellence.
                  </p>

                </div>
              </div>
            </motion.div>

            {/* VISION */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-full rounded-2xl border border-blue-500/15 bg-slate-900/40 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/30 sm:p-6 md:p-8">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 sm:mb-4 sm:h-12 sm:w-12">
                  <Eye size={20} />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Our Vision
                </h2>

                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300 sm:mt-4 sm:space-y-3 sm:text-base">

                  <p>
                    Our vision is to become a{" "}
                    <strong className="text-blue-300">
                      trusted technology and digital growth partner
                    </strong>{" "}
                    for businesses by delivering innovative solutions that
                    create measurable impact.
                  </p>

                  <p>
                    We aim to build a future where businesses of every size
                    can leverage{" "}
                    <strong className="text-blue-300">
                      technology, web platforms, and digital media
                    </strong>{" "}
                    to reach their full potential and compete confidently
                    in an evolving digital landscape.
                  </p>

                  <p className="font-medium text-blue-200/80">
                    "Transforming ideas into technology, technology into
                    opportunities, and opportunities into growth."
                  </p>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="relative px-4 py-10 sm:px-6 sm:py-10 md:py-15 lg:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[150px]" />

          <div className="absolute left-1/4 top-1/3 h-40 w-40 rounded-full bg-cyan-500/5 blur-[100px]" />

          <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-blue-500/5 blur-[100px]" />

        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
          >

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400 sm:mb-4 sm:text-xs">
              <Sparkles size={12} />
              Why Choose Us
            </div>

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Why Businesses Choose{" "}
              <span className="text-blue-400">
                SSD Informatics
              </span>
            </h2>

            <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base md:text-lg">
              At SSD Informatics, we combine technology, creativity, and
              strategy to deliver smart, scalable, reliable, and
              result-oriented digital solutions designed around our
              clients' unique business needs.
            </p>

          </motion.div>

          {/* DESKTOP */}

          <div className="hidden gap-5 lg:grid lg:grid-cols-4">

            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: item.delay,
                }}
                className="relative group"
              >

                <div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${item.gradient} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div
                  className={`relative h-full rounded-2xl border ${item.border} bg-slate-900/60 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 group-hover:-translate-y-1.5`}
                >

                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border ${item.border} bg-gradient-to-br ${item.gradient} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>

                  <h4 className="mb-1.5 text-sm font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                </div>
              </motion.div>
            ))}

          </div>

          {/* TABLET */}

          <div className="hidden grid-cols-2 gap-4 sm:gap-5 md:grid lg:hidden">

            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: item.delay,
                }}
                className="relative group"
              >

                <div
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${item.gradient} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div
                  className={`relative rounded-xl border ${item.border} bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1`}
                >

                  <div className="flex items-start gap-3">

                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border ${item.border} bg-gradient-to-br ${item.gradient}`}
                    >
                      <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </div>
              </motion.div>
            ))}

          </div>

          {/* MOBILE */}

          <div className="space-y-3 md:hidden">

            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="relative group"
              >

                <div
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${item.gradient} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div
                  className={`relative flex items-center gap-3 rounded-xl border ${item.border} bg-slate-900/60 p-3.5 backdrop-blur-sm transition-all duration-300`}
                >

                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${item.border} bg-gradient-to-br ${item.gradient}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="relative px-4 py-10 sm:px-6 md:py-10 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center sm:mb-10"
          >

            <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
              Our <span className="text-blue-400">Process</span>
            </h3>

            <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />

          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">

            {[
              {
                icon: Cpu,
                title: "Technology",
                desc: "Innovative tech solutions with cutting-edge tools",
                color: "blue",
              },
              {
                icon: Sparkles,
                title: "Creativity",
                desc: "Creative design thinking that brings ideas to life",
                color: "cyan",
              },
              {
                icon: Globe,
                title: "Strategy",
                desc: "Data-driven strategies for sustainable growth",
                color: "blue",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative group"
              >

                <div className="absolute -inset-1 rounded-xl bg-blue-500/5 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative rounded-xl border border-blue-500/15 bg-slate-900/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 sm:p-6">

                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 sm:h-14 sm:w-14">

                    <item.icon
                      size={24}
                      className={
                        item.color === "cyan"
                          ? "text-cyan-400"
                          : "text-blue-400"
                      }
                    />

                  </div>

                  <h4 className="mb-1.5 text-base font-bold text-white sm:text-lg">
                    {item.title}
                  </h4>

                  <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                    {item.desc}
                  </p>

                  {index < 2 && (
                    <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-blue-400/30 md:block">
                      <ArrowRight size={20} />
                    </div>
                  )}

                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          OUR TEAM
      ===================================================== */}

      <section
        id="our-team"
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8"
      >

        {/* Background Glow */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-[120px]" />

          <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]" />

        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* HEADER */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
          >

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400 sm:mb-4 sm:text-xs">
              <Users size={14} />
              Our Team
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Meet The{" "}
              <span className="text-blue-400">
                People Behind SSD
              </span>
            </h2>

            <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Our talented team brings together technology, creativity,
              strategy, and experience to build solutions that make a real
              difference.
            </p>

          </motion.div>

          {/* LOADING */}

          {teamLoading && (
            <div className="flex min-h-[250px] items-center justify-center">

              <div className="flex items-center gap-3 text-sm text-slate-500">

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-400" />

                Loading our team...

              </div>

            </div>
          )}

          {/* EMPTY */}

          {!teamLoading && teamMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center"
            >

              <Users
                size={35}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-4 text-lg font-bold text-slate-300">
                Our team is growing
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Team members will appear here soon.
              </p>

            </motion.div>
          )}

          {/* TEAM SLIDER */}

          {!teamLoading && teamMembers.length > 0 && (
            <div className="relative">

              {/* =========================
                  LEFT ARROW
              ========================= */}

              {teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={previousTeam}
                  aria-label="Previous team member"
                  className="
                    absolute
                    left-1
                    top-1/2
                    z-30
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-500/20
                    bg-slate-900/95
                    text-slate-400
                    shadow-xl
                    backdrop-blur-xl
                    transition-all
                    hover:border-blue-400/40
                    hover:bg-blue-500/10
                    hover:text-white
                    md:left-0
                    md:h-11
                    md:w-11
                    md:-translate-x-1/2
                  "
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* =========================
                  RIGHT ARROW
              ========================= */}

              {teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={nextTeam}
                  aria-label="Next team member"
                  className="
                    absolute
                    right-1
                    top-1/2
                    z-30
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-500/20
                    bg-slate-900/95
                    text-slate-400
                    shadow-xl
                    backdrop-blur-xl
                    transition-all
                    hover:border-blue-400/40
                    hover:bg-blue-500/10
                    hover:text-white
                    md:right-0
                    md:h-11
                    md:w-11
                    md:translate-x-1/2
                  "
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* =========================
                  TEAM CARDS
              ========================= */}

              <div
                className="
                  overflow-hidden
                  px-10
                  py-4
                  sm:px-8
                  md:px-12
                "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >

                {/* =================================
                    MOBILE
                    ONE CARD AT A TIME
                ================================= */}

                <div className="md:hidden">

                  {teamMembers[teamIndex] && (
                    <motion.div
                      key={teamMembers[teamIndex]._id}
                      initial={{
                        opacity: 0,
                        x: 70,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="
                        group
                        relative
                        mx-auto
                        max-w-sm
                        overflow-hidden
                        rounded-3xl
                        border
                        border-blue-500/15
                        bg-slate-900/60
                        p-5
                        backdrop-blur-xl
                        transition-all
                        duration-300
                      "
                    >

                      {/* Glow */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-20
                          -top-20
                          h-40
                          w-40
                          rounded-full
                          bg-blue-500/10
                          blur-3xl
                          transition-all
                          duration-500
                          group-hover:bg-cyan-500/15
                        "
                      />

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          mx-auto
                          h-60
                          w-full
                          overflow-hidden
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-950
                        "
                      >

                        <img
                          src={
                            teamMembers[teamIndex].image?.url ||
                            teamMembers[teamIndex].imageUrl ||
                            teamMembers[teamIndex].image ||
                            "/images/default-team.jpg"
                          }
                          alt={
                            teamMembers[teamIndex].name ||
                            "Team Member"
                          }
                          onError={(event) => {
                            event.currentTarget.src =
                              "/images/default-team.jpg";
                          }}
                          draggable="false"
                          className="
                            h-full
                            w-full
                            select-none
                            object-cover
                            object-center
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      </div>

                      {/* CONTENT */}

                      <div className="mt-5 text-center">

                        <h3 className="text-xl font-bold text-white">
                          {teamMembers[teamIndex].name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-blue-400">
                          {teamMembers[teamIndex].designation}
                        </p>

                        {teamMembers[teamIndex].bio && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                            {teamMembers[teamIndex].bio}
                          </p>
                        )}

                        {teamMembers[teamIndex].linkedin && (
                          <a
                            href={teamMembers[teamIndex].linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${teamMembers[teamIndex].name} LinkedIn`}
                            className="
                              mt-4
                              inline-flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-blue-500/20
                              bg-blue-500/10
                              text-blue-400
                              transition-all
                              duration-300
                              hover:border-blue-400/40
                              hover:bg-blue-500
                              hover:text-white
                            "
                          >
                            <span className="text-xs font-bold">
                              in
                            </span>
                          </a>
                        )}

                      </div>

                    </motion.div>
                  )}

                </div>

                {/* =================================
                    TABLET / DESKTOP
                ================================= */}

                <div
                  className="
                    hidden
                    gap-6
                    md:grid
                    md:grid-cols-2
                    lg:grid-cols-3
                  "
                >

                  {teamMembers
                    .map((member, index) => ({
                      member,
                      index,
                    }))
                    .filter(({ index }) => {

                      if (teamMembers.length <= 3) {
                        return true;
                      }

                      return (
                        index === teamIndex ||
                        index ===
                          (teamIndex + 1) %
                            teamMembers.length ||
                        index ===
                          (teamIndex + 2) %
                            teamMembers.length
                      );
                    })
                    .map(({ member }) => (

                      <motion.div
                        key={member._id}
                        whileHover={{ y: -7 }}
                        transition={{ duration: 0.25 }}
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-3xl
                          border
                          border-blue-500/15
                          bg-slate-900/60
                          p-5
                          backdrop-blur-xl
                          transition-all
                          duration-300
                          hover:border-blue-500/40
                        "
                      >

                        {/* Glow */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-40
                            w-30
                            rounded-full
                            bg-blue-500/10
                            blur-3xl
                            transition-all
                            duration-500
                            group-hover:bg-cyan-500/15
                          "
                        />

                        {/* IMAGE */}

                        <div
                          className="
                            relative
                            mx-auto
                            h-60
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-950
                            sm:h-80
                          "
                        >

                          <img
                            src={
                              member.image?.url ||
                              member.imageUrl ||
                              member.image ||
                              "/images/default-team.jpg"
                            }
                            alt={
                              member.name ||
                              "Team Member"
                            }
                            onError={(event) => {
                              event.currentTarget.src =
                                "/images/default-team.jpg";
                            }}
                            className="
                              h-full
                              w-full
                              object-fit
                              object-center
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                        </div>

                        {/* CONTENT */}

                        <div className="mt-5 text-center">

                          <h3 className="text-lg font-bold text-white sm:text-xl">
                            {member.name}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-blue-400">
                            {member.designation}
                          </p>

                          {member.bio && (
                            <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-400 sm:text-sm">
                              {member.bio}
                            </p>
                          )}

                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} LinkedIn`}
                              className="
                                mt-4
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-blue-500/20
                                bg-blue-500/10
                                text-blue-400
                                transition-all
                                duration-300
                                hover:border-blue-400/40
                                hover:bg-blue-500
                                hover:text-white
                              "
                            >
                              <span className="text-xs font-bold">
                                in
                              </span>
                            </a>
                          )}

                        </div>

                      </motion.div>

                    ))}

                </div>

              </div>

              {/* =========================
                  DOTS
              ========================= */}

              {teamMembers.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">

                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setTeamIndex(index)}
                      aria-label={`Go to team member ${index + 1}`}
                      className={`
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          index === teamIndex
                            ? "w-8 bg-blue-400"
                            : "w-2 bg-slate-700 hover:bg-slate-500"
                        }
                      `}
                    />
                  ))}

                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-1/2 h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-[100px]" />

        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl"
        >

          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8 md:p-10 lg:p-12">

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-5 lg:gap-10">

              <div className="text-center lg:col-span-3 lg:text-left">

                <h2 className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl">
                  Let's Build Something{" "}
                  <span className="text-blue-400">
                    Together
                  </span>
                </h2>

                <p className="mx-auto max-w-lg text-sm text-slate-300 sm:text-base lg:mx-0">
                  Ready to take your digital presence to the next
                  level? Let's connect and create something amazing.
                </p>

                <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

                  <Link to="/contact">

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-blue-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-lg
                        shadow-blue-500/25
                        transition-all
                        duration-300
                        hover:from-blue-600
                        hover:to-blue-700
                        hover:shadow-blue-500/40
                        sm:px-6
                      "
                    >
                      Let's Talk →
                    </motion.button>

                  </Link>

                </div>

              </div>

              <div className="flex justify-center lg:col-span-2 lg:justify-end">

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm sm:h-20 sm:w-20">

                    <div className="flex gap-1.5">

                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 sm:h-2 sm:w-2" />

                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 delay-75 sm:h-2 sm:w-2" />

                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 delay-150 sm:h-2 sm:w-2" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          </div>

        </motion.div>
      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="relative px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        />

      </section>

    </div>
  );
};

export default About;