import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Globe2,
  Smartphone,
  Database,
  Sparkles,
  Zap,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Website Development",
  "Mobile Apps",
  "ERP Solutions",
  "Digital Marketing",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const services = [
  {
    title: "Web",
    icon: Globe2,
    position: "left-4 top-[24%]",
    color: "blue",
  },
  {
    title: "Mobile",
    icon: Smartphone,
    position: "right-4 top-[24%]",
    color: "cyan",
  },
  {
    title: "ERP",
    icon: Database,
    position: "left-4 bottom-[22%]",
    color: "blue",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    position: "right-4 bottom-[22%]",
    color: "cyan",
  },
];

const AboutPreview = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050816] py-8 sm:py-16 lg:py-10">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-center gap-6 px-4 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* =====================================================
            LEFT SIDE - COMPACT TECH VISUAL
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          {/* Glow */}

          <div className="pointer-events-none absolute inset-10 rounded-full bg-blue-500/10 blur-[90px]" />

          {/* Main Visual */}

          <div className="relative mx-auto h-[360px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#0a1831] via-[#071326] to-[#050b19] shadow-[0_25px_70px_rgba(0,0,0,0.4)] sm:h-[400px]">
            {/* Grid */}

            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)",
                backgroundSize: "35px 35px",
              }}
            />

            {/* Top Glow */}

            <div className="absolute left-1/2 top-[-100px] h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[90px]" />

            {/* Bottom Glow */}

            <div className="absolute bottom-[-100px] right-[-60px] h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-[90px]" />

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10">
                  <Sparkles
                    size={14}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-slate-300">
                    SSD INFORMATICS
                  </p>

                  <p className="text-[8px] tracking-[2px] text-slate-600">
                    DIGITAL SOLUTIONS
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />

                <span className="text-[9px] font-medium text-emerald-300">
                  ONLINE
                </span>
              </div>
            </div>

            {/* =================================================
                CONNECTION LINES
            ================================================== */}

            <div className="absolute left-1/2 top-1/2 h-[210px] w-[280px] -translate-x-1/2 -translate-y-1/2">
              {/* Horizontal */}

              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

              {/* Vertical */}

              <div className="absolute bottom-0 left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />

              {/* Circle */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[175px] w-[175px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10"
              >
                <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
              </motion.div>
            </div>

            {/* =================================================
                SERVICE CARDS
            ================================================== */}

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  animate={{
                    y: [0, index % 2 === 0 ? -5 : 5, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${service.position} z-20`}
                >
                  <div
                    className={`flex h-[58px] w-[72px] flex-col items-center justify-center rounded-xl border ${
                      service.color === "cyan"
                        ? "border-cyan-400/20 bg-cyan-500/5"
                        : "border-blue-400/20 bg-blue-500/5"
                    } shadow-[0_12px_30px_rgba(0,0,0,.3)] backdrop-blur-xl`}
                  >
                    <Icon
                      size={21}
                      className={
                        service.color === "cyan"
                          ? "text-cyan-400"
                          : "text-blue-400"
                      }
                    />

                    <span className="mt-1 text-[8px] font-medium uppercase tracking-wide text-slate-500">
                      {service.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* =================================================
                CENTER CORE
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -5, 0],
                boxShadow: [
                  "0 0 25px rgba(37,99,235,.12)",
                  "0 0 45px rgba(37,99,235,.28)",
                  "0 0 25px rgba(37,99,235,.12)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 z-30 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border border-blue-400/30 bg-gradient-to-br from-blue-600/20 via-blue-900/80 to-cyan-900/60 backdrop-blur-xl"
            >
              <div className="absolute inset-2 rounded-[19px] border border-white/5" />

              <Code2
                size={38}
                strokeWidth={1.5}
                className="relative text-blue-400"
              />

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-blue-400/20 bg-[#071326] px-2.5 py-0.5 text-[8px] font-semibold tracking-[1.5px] text-blue-300">
                CORE
              </div>
            </motion.div>

            {/* =================================================
                BOTTOM STATS
            ================================================== */}

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute bottom-5 left-5 z-30 rounded-xl border border-white/10 bg-[#081426]/90 px-3 py-2.5 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                  <BarChart3
                    size={14}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-[7px] uppercase tracking-wider text-slate-600">
                    Growth
                  </p>

                  <p className="text-xs font-bold text-white">
                    +84.6%
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
              }}
              className="absolute bottom-5 right-5 z-30 rounded-xl border border-cyan-400/10 bg-[#081426]/90 px-3 py-2.5 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Zap
                    size={14}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-[7px] uppercase tracking-wider text-slate-600">
                    Performance
                  </p>

                  <p className="text-xs font-bold text-white">
                    99.9%
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating dots */}

            {[...Array(8)].map((_, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="absolute h-1 w-1 rounded-full bg-cyan-400"
                style={{
                  left: `${10 + ((index * 21) % 80)}%`,
                  top: `${20 + ((index * 27) % 60)}%`,
                }}
              />
            ))}

            {/* Bottom Label */}

            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[7px] font-medium tracking-[2.5px] text-slate-600">
                BUILD • SCALE • INNOVATE
              </span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full max-w-xl min-w-0 text-center lg:text-left"
        >
          {/* Label */}

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-500/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[2px] text-blue-400 sm:text-xs">
              <Sparkles size={13} />
              About Us
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            variants={item}
            className="mt-3 max-w-lg break-words text-xl font-bold leading-[1.2] tracking-tight text-white sm:mt-4 sm:text-3xl lg:text-[40px]"
          >
            We Build Digital Products That{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Help Businesses Grow
            </span>
          </motion.h2>

          {/* Description */}

          <motion.p
            variants={item}
            className="mt-4 max-w-lg break-words text-xs leading-5 text-slate-400 sm:mt-5 sm:text-base sm:leading-7"
          >
            SSD Informatics is a technology company providing Website
            Development, Mobile Applications, ERP Software, UI/UX Design, SEO
            and Digital Marketing services for startups and businesses.
          </motion.p>

          {/* Features */}

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-6 sm:grid-cols-2 sm:gap-y-4">
            {features.map((feature) => (
              <motion.div
                key={feature}
                variants={item}
                whileHover={{ x: 5 }}
                className="group flex items-center justify-center gap-2.5 sm:justify-start"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <CheckCircle
                    size={15}
                    className="text-blue-400 transition group-hover:text-cyan-400"
                  />
                </div>

                <span className="text-xs font-medium text-slate-200 sm:text-base">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Button */}

          <motion.div variants={item}>
            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,.30)] sm:mt-7 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-sm"
            >
              Explore About Us

              <ArrowRight
                size={15}
                className="transition duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;