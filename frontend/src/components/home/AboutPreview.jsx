import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Globe2,
  LayoutDashboard,
  Smartphone,
  Database,
  ShieldCheck,
  Sparkles,
  Zap,
  BarChart3,
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

const AboutPreview = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050816] py-14 sm:py-20 lg:py-10">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* =====================================================
            LEFT SIDE - PREMIUM TECH VISUAL
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto min-w-0 w-full max-w-xl"
        >
          {/* Outer Glow */}

          <div className="pointer-events-none absolute inset-10 rounded-full bg-blue-500/10 blur-[100px]" />

          {/* Main Dashboard */}

          <div className="relative min-h-[470px] overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-[#0a1831] via-[#071326] to-[#050b19] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:min-h-[540px] lg:min-h-[580px]">
            {/* Grid */}

            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Top Gradient */}

            <div className="absolute left-1/2 top-[-100px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px]" />

            {/* Bottom Gradient */}

            <div className="absolute bottom-[-120px] right-[-80px] h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[100px]" />

            {/* =================================================
                TOP BAR
            ================================================== */}

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-400/20">
                  <Sparkles
                    size={15}
                    className="text-blue-400"
                  />
                </div>

                <span className="text-xs font-medium tracking-wide text-slate-400">
                  SSD DIGITAL LAB
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

                <span className="text-[10px] font-medium text-emerald-300">
                  ONLINE
                </span>
              </div>
            </div>

            {/* =================================================
                ORBIT SYSTEM
            ================================================== */}

            <div className="absolute left-1/2 top-[44%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[300px] lg:h-[330px] lg:w-[330px]">
              {/* Outer Orbit */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-blue-400/10"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_15px_#60a5fa]" />
              </motion.div>

              {/* Middle Orbit */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "linear",
                }}
                className="absolute left-[10%] top-[10%] h-[80%] w-[80%] rounded-full border border-dashed border-cyan-400/15"
              >
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
              </motion.div>

              {/* Horizontal Line */}

              <div className="absolute left-[-40px] right-[-40px] top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

              {/* Vertical Line */}

              <div className="absolute bottom-[-40px] left-1/2 top-[-40px] w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />

              {/* Center Core */}

              <motion.div
                animate={{
                  y: [0, -7, 0],
                  boxShadow: [
                    "0 0 25px rgba(37,99,235,.15)",
                    "0 0 55px rgba(37,99,235,.35)",
                    "0 0 25px rgba(37,99,235,.15)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 flex h-[105px] w-[105px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border border-blue-400/30 bg-gradient-to-br from-blue-600/20 via-blue-900/80 to-cyan-900/60 backdrop-blur-xl sm:h-[125px] sm:w-[125px]"
              >
                <div className="absolute inset-2 rounded-[22px] border border-white/5" />

                <Code2
                  size={48}
                  strokeWidth={1.5}
                  className="relative text-blue-400 sm:h-14 sm:w-14"
                />

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-400/20 bg-[#071326] px-3 py-1 text-[9px] font-semibold tracking-[2px] text-blue-300">
                  CORE
                </div>
              </motion.div>

              {/* =================================================
                  WEBSITE NODE
              ================================================== */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 0.5,
                }}
                className="absolute -left-1 top-[25%] z-30 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-[#081426]/95 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:-left-2 sm:h-16 sm:w-16"
              >
                <Globe2
                  size={25}
                  className="text-blue-400"
                />

                <span className="absolute -bottom-5 whitespace-nowrap text-[9px] text-slate-500">
                  WEB
                </span>
              </motion.div>

              {/* =================================================
                  MOBILE NODE
              ================================================== */}

              <motion.div
                animate={{
                  y: [0, 7, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  delay: 0.7,
                }}
                className="absolute -right-1 top-[25%] z-30 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#081426]/95 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:-right-2 sm:h-16 sm:w-16"
              >
                <Smartphone
                  size={25}
                  className="text-cyan-400"
                />

                <span className="absolute -bottom-5 whitespace-nowrap text-[9px] text-slate-500">
                  MOBILE
                </span>
              </motion.div>

              {/* =================================================
                  ERP NODE
              ================================================== */}

              <motion.div
                animate={{
                  y: [0, 7, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.2,
                  delay: 1,
                }}
                className="absolute bottom-[3%] left-1/2 z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-blue-400/20 bg-[#081426]/95 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:h-16 sm:w-16"
              >
                <Database
                  size={25}
                  className="text-blue-400"
                />

                <span className="absolute -bottom-5 whitespace-nowrap text-[9px] text-slate-500">
                  ERP
                </span>
              </motion.div>
            </div>

            {/* =================================================
                LEFT MINI CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-7 left-5 z-40 rounded-2xl border border-white/10 bg-[#081426]/90 p-3 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:bottom-9 sm:left-7 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10">
                  <BarChart3
                    size={17}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Growth
                  </p>

                  <p className="text-sm font-bold text-white">
                    +84.6%
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                RIGHT MINI CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
              }}
              className="absolute bottom-7 right-5 z-40 rounded-2xl border border-cyan-400/10 bg-[#081426]/90 p-3 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:bottom-9 sm:right-7 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Zap
                    size={17}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Performance
                  </p>

                  <p className="text-sm font-bold text-white">
                    99.9%
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                FLOATING PARTICLES
            ================================================== */}

            {[...Array(12)].map((_, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + index * 0.25,
                  delay: index * 0.2,
                }}
                className="absolute h-1 w-1 rounded-full bg-cyan-400"
                style={{
                  left: `${8 + ((index * 17) % 84)}%`,
                  top: `${12 + ((index * 23) % 72)}%`,
                }}
              />
            ))}

            {/* Bottom Label */}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
              <span className="text-[9px] font-medium tracking-[3px] text-slate-600">
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
          className="min-w-0 w-full text-center lg:text-left"
        >
          {/* Label */}

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-blue-400 sm:text-sm">
              <Sparkles size={14} />
              About Us
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            variants={item}
            className="mt-5 break-words text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[48px]"
          >
            We Build Digital Products That{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Help Businesses Grow
            </span>
          </motion.h2>

          {/* Description */}

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl break-words text-base leading-7 text-slate-400 sm:mt-7 sm:text-lg sm:leading-8 lg:max-w-xl"
          >
            SSD Informatics is a technology company providing Website
            Development, Mobile Applications, ERP Software, UI/UX Design,
            SEO and Digital Marketing services for startups and businesses.
          </motion.p>

          {/* Features */}

          <div className="mt-8 space-y-4 sm:mt-9 sm:space-y-5">
            {features.map((feature) => (
              <motion.div
                key={feature}
                variants={item}
                whileHover={{
                  x: 8,
                }}
                className="group flex items-center justify-center gap-3 lg:justify-start"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <CheckCircle
                    size={17}
                    className="text-blue-400 transition group-hover:text-cyan-400"
                  />
                </div>

                <span className="text-base font-medium text-slate-200 sm:text-lg">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Button */}

          <motion.div variants={item}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(6,182,212,.35)] sm:mt-11 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore About Us

              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;