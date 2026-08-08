import {
  ArrowRight,
  CheckCircle,
  Code2,
  Shield,
  Clock,
  Headphones,
  Smartphone,
  Palette,
  Database,
  Globe,
  Zap,
  Users,
  Award,
  BarChart,
  Settings,
  Mail,
  Phone,
  MapPin,
  Play,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Cpu,
  Cloud,
  Lock,
  RefreshCw,
  Server,
  TrendingUp,
  PenTool,
  Video,
  Search,
  Megaphone,
  ShoppingBag,
  Brain,
  Coffee,
  Home,
  Plane,
  Heart,
  GraduationCap,
  Briefcase,
  Truck,
  Building,
  Film,
  Music,
  Camera,
  Gift,
  Rocket,
  AppWindow,
  Apple,
  MonitorSmartphone,
  Laptop,
  Tablet,
  Lightbulb,
  TestTube2,
  LayoutDashboard,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { servicesData } from "../data/serviceData";

// ── Count-up animation hook ──────────────────────────────────────────────────
const useCountUp = (target, duration = 2200) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = nodeRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          const start = performance.now();

          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, nodeRef };
};

// ── Hero Stat Card ────────────────────────────────────────────────────────────
const HeroStatCard = ({ stat, index }) => {
  const { count, nodeRef } = useCountUp(
    stat.numericValue ?? 0,
    2000 + index * 300
  );

  const Icon = stat.icon;

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.1,
      }}
      className="
        flex
        min-w-0
        items-center
        gap-3
        py-2
        sm:gap-4
        md:px-6
        md:py-0
        lg:px-8
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          flex-shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-blue-500/35
          bg-blue-600/20
          text-[#3b82f6]
          shadow-[0_0_15px_rgba(37,99,235,0.2)]
        "
      >
        {Icon && <Icon size={22} />}
      </div>

      <div>
        <p
          className="
            text-2xl
            font-extrabold
            leading-none
            tracking-tight
            text-[#3b82f6]
            sm:text-3xl
          "
        >
          {count}
          {stat.suffix}
        </p>

        <p
          className="
            mt-1
            text-xs
            font-medium
            leading-snug
            text-slate-300
            sm:text-sm
          "
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};

// ── Process Icon Helper ──────────────────────────────────────────────────────
const getProcessIcon = (title = "") => {
  const name = title.toLowerCase();

  if (
    name.includes("discover") ||
    name.includes("research") ||
    name.includes("analysis")
  ) {
    return Search;
  }

  if (
    name.includes("idea") ||
    name.includes("planning") ||
    name.includes("strategy")
  ) {
    return Lightbulb;
  }

  if (
    name.includes("design") ||
    name.includes("ui") ||
    name.includes("ux")
  ) {
    return Palette;
  }

  if (
    name.includes("develop") ||
    name.includes("coding") ||
    name.includes("build")
  ) {
    return Code2;
  }

  if (
    name.includes("test") ||
    name.includes("testing") ||
    name.includes("quality")
  ) {
    return TestTube2;
  }

  if (
    name.includes("security") ||
    name.includes("secure")
  ) {
    return Shield;
  }

  if (
    name.includes("launch") ||
    name.includes("deploy") ||
    name.includes("deployment")
  ) {
    return Rocket;
  }

  return LayoutDashboard;
};

// ── Main Component ────────────────────────────────────────────────────────────
const ServiceDetails = () => {
  const { slug } = useParams();
  const service = servicesData[slug];

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  if (!service) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617] text-3xl text-white">
        Service Not Found
      </div>
    );
  }

  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.6,
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="overflow-x-hidden bg-[#020617] text-white">

      {/* ═══════════════════════════════════════════════════════════
           HERO SECTION
      ═══════════════════════════════════════════════════════════ */}

      <section
        className="
          relative
          flex
          flex-col
          overflow-hidden
          bg-[#020617]
          pt-20
          sm:pt-24
          lg:pt-32
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(37,99,235,0.22) 0%, transparent 55%), " +
            "radial-gradient(circle at 18% 65%, rgba(29,78,216,0.15) 0%, transparent 50%), " +
            "linear-gradient(to bottom, #020617 0%, #040a22 65%, #020617 100%)",
        }}
      >
        {/* Tech Grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            select-none
            opacity-[0.07]
          "
          style={{
            backgroundImage:
              "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Main Hero Content */}

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-7xl
            px-4
            pb-8
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-2
              lg:gap-12
              lg:min-h-[480px]
            "
          >
            {/* Left */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="z-20 flex flex-col"
            >
              {/* Tagline */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="mb-6 flex items-center gap-3"
              >
                <div className="h-[3px] w-7 rounded-full bg-[#2563eb]" />

                <span
                  className="
                    select-none
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#60a5fa]
                  "
                >
                  {service.heroTagline || "SSD INFORMATICS"}
                </span>
              </motion.div>

              {/* Heading */}

              <h1
                className="
                  break-words
                  text-3xl
                  font-extrabold
                  leading-[1.12]
                  tracking-tight
                  sm:text-5xl
                  lg:text-[3.25rem]
                  xl:text-[3.75rem]
                "
              >
                {service.heroTitle?.before ? (
                  <>
                    <span className="text-white">
                      {service.heroTitle.before}
                    </span>

                    <br />

                    {service.heroTitle.middle && (
                      <span className="text-white">
                        {service.heroTitle.middle}{" "}
                      </span>
                    )}

                    <span className="text-[#3b82f6]">
                      {service.heroTitle.highlight}
                    </span>
                  </>
                ) : (
                  <span className="text-[#3b82f6]">
                    {service.title}
                  </span>
                )}
              </h1>

              {/* Description */}

              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  font-normal
                  leading-relaxed
                  text-slate-300
                  sm:text-lg
                "
              >
                {service.description}
              </p>

              {/* CTA */}

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#2563eb]
                    px-7
                    py-3.5
                    text-base
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-600/30
                    transition-all
                    hover:bg-[#1d4ed8]
                    sm:w-auto
                  "
                >
                  {service.heroButtons?.primary || "Explore Services"}

                  <ArrowRight size={18} />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-blue-500/30
                    bg-[#081230]/70
                    px-7
                    py-3.5
                    text-base
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-[#0c1a44]
                    sm:w-auto
                  "
                >
                  {service.heroButtons?.secondary || "Contact Us"}

                  <Mail
                    size={18}
                    className="text-blue-400"
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Illustration */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="
                relative
                flex
                w-full
                items-center
                justify-center
                lg:justify-end
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[95%]
                  w-[95%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-blue-600/15
                  blur-[95px]
                "
              />

              <img
                src={service.image}
                alt={service.title}
                className="
                  relative
                  z-10
                  h-auto
                  w-full
                  max-w-[620px]
                  select-none
                  object-contain
                  drop-shadow-[0_12px_40px_rgba(37,99,235,0.25)]
                  xl:max-w-[680px]
                "
                style={{
                  maskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)",
                }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}

        <div
          className="
            relative
            z-10
            mx-auto
            mt-6
            w-full
            max-w-7xl
            px-4
            pb-12
            sm:mt-10
            sm:px-6
            sm:pb-16
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
          >
            <div
              className="
                rounded-2xl
                border
                border-blue-500/20
                bg-[#060e2a]/85
                px-6
                py-6
                shadow-[0_15px_40px_rgba(2,6,23,0.8)]
                backdrop-blur-xl
                sm:py-7
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  sm:gap-6
                  md:grid-cols-4
                  md:gap-0
                  md:divide-x
                  md:divide-blue-500/20
                "
              >
                {service.heroStats?.map((stat, i) => (
                  <HeroStatCard
                    key={i}
                    stat={stat}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Service Overview
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              {service.overview.title}
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-3xl
                text-base
                leading-relaxed
                text-slate-300
                sm:text-lg
              "
            >
              {service.overview.description}
            </p>

            <div
              className="
                mx-auto
                mt-10
                grid
                max-w-4xl
                grid-cols-1
                gap-5
                sm:mt-12
                sm:grid-cols-2
                sm:gap-6
                md:grid-cols-4
              "
            >
              {service.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-400/30
                  "
                >
                  <p className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </p>

                  <p className="text-sm text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}

      <section className="relative bg-[#050b18] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-1/3 top-0 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {service.offers.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group
                    relative
                    rounded-3xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:border-blue-400/40
                    sm:p-8
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-3xl
                      bg-gradient-to-br
                      from-blue-500/5
                      to-transparent
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative z-10">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-blue-500/10
                        bg-gradient-to-br
                        from-blue-500/20
                        to-blue-600/10
                        text-blue-400
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    >
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-relaxed text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Key Features
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              {service.featuresTitle ||
                "What Makes Our Apps Stand Out"}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {service.features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-400/40
                  "
                >
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      ${item.color}
                      shadow-[0_0_10px_rgba(59,130,246,0.15)]
                    `}
                  >
                    <Icon size={24} />
                  </div>

                  <span className="font-medium text-white transition-colors group-hover:text-blue-300">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
            {/* ═══════════════════════════════════════════════════════════
          DEVELOPMENT PROCESS
      ═══════════════════════════════════════════════════════════ */}

      <section className="relative overflow-hidden bg-[#020617] py-16 sm:py-20 lg:py-24">

        {/* Background Decorative Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            top-20
            h-72
            w-72
            rounded-full
            bg-blue-600/10
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            bottom-20
            h-72
            w-72
            rounded-full
            bg-cyan-500/10
            blur-[100px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* Development Process */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-12 text-center sm:mb-16"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              <span className="text-white">
                Development{" "}
              </span>

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  to-indigo-500
                  bg-clip-text
                  text-transparent
                "
              >
                Process
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                leading-relaxed
                text-slate-400
                sm:text-base
              "
            >
              Our step-by-step approach ensures quality,
              transparency, and on-time delivery.
            </p>
          </motion.div>

          {/* Process Timeline */}

          <div className="relative mx-auto max-w-6xl">

            {/* Center Line */}

            <div
              className="
                absolute
                bottom-0
                left-1/2
                top-0
                hidden
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-blue-500/20
                via-blue-500/70
                to-blue-500/20
                lg:block
              "
            />

            {/* Top Line Glow */}

            <div
              className="
                absolute
                left-1/2
                top-0
                hidden
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-blue-400
                shadow-[0_0_15px_rgba(59,130,246,1)]
                lg:block
              "
            />

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">

              {service.process.map((item, index) => {
                const isLeft = index % 2 === 0;

                const ProcessIcon = getProcessIcon(
                  item.title
                );

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -40 : 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="relative"
                  >

                    {/* ═══════════════════════════════
                        DESKTOP
                    ═══════════════════════════════ */}

                    <div className="hidden min-h-[130px] items-center lg:flex">

                      {/* LEFT SIDE */}

                      {isLeft ? (
                        <>
                          <div className="w-[43%]">

                            <div
                              className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-blue-500/30
                                bg-gradient-to-br
                                from-slate-900/90
                                via-slate-950/80
                                to-blue-950/30
                                px-7
                                py-5
                                backdrop-blur-xl
                                shadow-[0_0_25px_rgba(37,99,235,0.08)]
                                transition-all
                                duration-500
                                hover:border-blue-400/60
                                hover:shadow-[0_0_35px_rgba(37,99,235,0.18)]
                              "
                            >

                              {/* Card Glow */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -right-10
                                  -top-10
                                  h-24
                                  w-24
                                  rounded-full
                                  bg-blue-500/10
                                  blur-2xl
                                "
                              />

                              {/* Bottom Glow */}

                              <div
                                className="
                                  absolute
                                  bottom-0
                                  left-1/2
                                  h-[2px]
                                  w-1/2
                                  -translate-x-1/2
                                  bg-gradient-to-r
                                  from-transparent
                                  via-blue-500
                                  to-transparent
                                "
                              />

                              <div className="relative z-10 flex items-center gap-5">

                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                  <span className="text-sm font-bold text-blue-400">
                                    {String(index + 1).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  <h3 className="mt-1 text-xl font-bold text-white">
                                    {item.title}
                                  </h3>

                                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                                    {item.desc}
                                  </p>

                                </div>

                                {/* RIGHT ICON */}

                                <motion.div
                                  whileHover={{
                                    scale: 1.08,
                                    rotate: 6,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                  }}
                                  className="
                                    relative
                                    flex
                                    h-20
                                    w-20
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-blue-400/20
                                    bg-gradient-to-br
                                    from-blue-500/15
                                    via-indigo-500/10
                                    to-cyan-500/10
                                    text-blue-400
                                    shadow-[0_0_25px_rgba(59,130,246,0.15)]
                                  "
                                >
                                  <div
                                    className="
                                      absolute
                                      inset-2
                                      rounded-xl
                                      border
                                      border-blue-400/10
                                    "
                                  />

                                  <ProcessIcon
                                    size={34}
                                    strokeWidth={1.6}
                                  />
                                </motion.div>

                              </div>
                            </div>
                          </div>

                          {/* Connector */}

                          <div
                            className="
                              h-px
                              w-[7%]
                              bg-gradient-to-r
                              from-blue-500/10
                              to-blue-500/70
                            "
                          />

                          {/* Center Number */}

                          <div
                            className="
                              relative
                              z-20
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-blue-400/70
                              bg-[#020617]
                              text-sm
                              font-bold
                              text-blue-300
                              shadow-[0_0_20px_rgba(59,130,246,0.45)]
                            "
                          >
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          {/* Floating Empty Right Side */}

                          <div className="relative h-[130px] w-[50%] overflow-visible">

                            {/* Large Ring */}

                            <motion.div
                              animate={{
                                y: [0, -12, 0],
                                rotate: [0, 20, 0],
                              }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="
                                absolute
                                left-16
                                top-1/2
                                h-16
                                w-16
                                -translate-y-1/2
                                rounded-full
                                border
                                border-cyan-400/20
                                shadow-[0_0_25px_rgba(34,211,238,0.08)]
                              "
                            />

                            {/* Small Ring */}

                            <motion.div
                              animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.3, 0.7, 0.3],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                left-32
                                top-5
                                h-5
                                w-5
                                rounded-full
                                border
                                border-blue-400/40
                              "
                            />

                            {/* Floating Line */}

                            <motion.div
                              animate={{
                                x: [0, 12, 0],
                                opacity: [0.2, 0.6, 0.2],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                bottom-8
                                left-24
                                h-px
                                w-24
                                rotate-[-20deg]
                                bg-gradient-to-r
                                from-transparent
                                via-blue-400/50
                                to-transparent
                              "
                            />

                            {/* Floating Square */}

                            <motion.div
                              animate={{
                                y: [0, 10, 0],
                                rotate: [0, 45, 90],
                              }}
                              transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="
                                absolute
                                left-48
                                top-1/2
                                h-7
                                w-7
                                rounded-lg
                                border
                                border-blue-400/25
                                bg-blue-500/5
                              "
                            />

                            {/* Tiny Dot */}

                            <motion.div
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.8, 0.2],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                bottom-4
                                left-40
                                h-2
                                w-2
                                rounded-full
                                bg-cyan-400
                                shadow-[0_0_12px_rgba(34,211,238,0.8)]
                              "
                            />

                          </div>
                        </>
                      ) : (
                        <>
                          {/* Floating Empty Left Side */}

                          <div className="relative h-[130px] w-[50%] overflow-visible">

                            {/* Large Ring */}

                            <motion.div
                              animate={{
                                y: [0, 12, 0],
                                rotate: [0, -25, 0],
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="
                                absolute
                                right-20
                                top-1/2
                                h-20
                                w-20
                                -translate-y-1/2
                                rounded-full
                                border
                                border-blue-400/20
                                shadow-[0_0_30px_rgba(59,130,246,0.08)]
                              "
                            />

                            {/* Small Circle */}

                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.25, 0.7, 0.25],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                right-40
                                top-8
                                h-4
                                w-4
                                rounded-full
                                bg-cyan-400/30
                                shadow-[0_0_15px_rgba(34,211,238,0.4)]
                              "
                            />

                            {/* Floating Line */}

                            <motion.div
                              animate={{
                                x: [0, -12, 0],
                                opacity: [0.2, 0.6, 0.2],
                              }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                bottom-8
                                right-28
                                h-px
                                w-28
                                rotate-[20deg]
                                bg-gradient-to-r
                                from-transparent
                                via-cyan-400/40
                                to-transparent
                              "
                            />

                            {/* Square */}

                            <motion.div
                              animate={{
                                y: [0, -10, 0],
                                rotate: [0, -45, -90],
                              }}
                              transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="
                                absolute
                                right-56
                                top-1/2
                                h-6
                                w-6
                                rounded-md
                                border
                                border-cyan-400/25
                                bg-cyan-500/5
                              "
                            />

                            {/* Tiny Dot */}

                            <motion.div
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.8, 0.2],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                              className="
                                absolute
                                bottom-5
                                right-44
                                h-2
                                w-2
                                rounded-full
                                bg-blue-400
                                shadow-[0_0_12px_rgba(59,130,246,0.8)]
                              "
                            />

                          </div>

                          {/* Center Number */}

                          <div
                            className="
                              relative
                              z-20
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-blue-400/70
                              bg-[#020617]
                              text-sm
                              font-bold
                              text-blue-300
                              shadow-[0_0_20px_rgba(59,130,246,0.45)]
                            "
                          >
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          {/* Connector */}

                          <div
                            className="
                              h-px
                              w-[7%]
                              bg-gradient-to-r
                              from-blue-500/70
                              to-blue-500/10
                            "
                          />

                          {/* RIGHT SIDE CARD */}

                          <div className="w-[43%]">
                            <div
                              className="
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-blue-500/30
                                bg-gradient-to-br
                                from-slate-900/90
                                via-slate-950/80
                                to-blue-950/30
                                px-7
                                py-5
                                backdrop-blur-xl
                                shadow-[0_0_25px_rgba(37,99,235,0.08)]
                                transition-all
                                duration-500
                                hover:border-blue-400/60
                                hover:shadow-[0_0_35px_rgba(37,99,235,0.18)]
                              "
                            >

                              {/* Card Glow */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -right-10
                                  -top-10
                                  h-24
                                  w-24
                                  rounded-full
                                  bg-cyan-500/10
                                  blur-2xl
                                "
                              />

                              {/* Bottom Glow */}

                              <div
                                className="
                                  absolute
                                  bottom-0
                                  left-1/2
                                  h-[2px]
                                  w-1/2
                                  -translate-x-1/2
                                  bg-gradient-to-r
                                  from-transparent
                                  via-blue-500
                                  to-transparent
                                "
                              />

                              <div className="relative z-10 flex items-center gap-5">

                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                  <span className="text-sm font-bold text-blue-400">
                                    {String(index + 1).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  <h3 className="mt-1 text-xl font-bold text-white">
                                    {item.title}
                                  </h3>

                                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                                    {item.desc}
                                  </p>

                                </div>

                                {/* RIGHT ICON */}

                                <motion.div
                                  whileHover={{
                                    scale: 1.08,
                                    rotate: -6,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                  }}
                                  className="
                                    relative
                                    flex
                                    h-20
                                    w-20
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-cyan-400/20
                                    bg-gradient-to-br
                                    from-blue-500/15
                                    via-indigo-500/10
                                    to-cyan-500/10
                                    text-cyan-400
                                    shadow-[0_0_25px_rgba(34,211,238,0.12)]
                                  "
                                >
                                  <div
                                    className="
                                      absolute
                                      inset-2
                                      rounded-xl
                                      border
                                      border-cyan-400/10
                                    "
                                  />

                                  <ProcessIcon
                                    size={34}
                                    strokeWidth={1.6}
                                  />
                                </motion.div>

                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ═══════════════════════════════
                        MOBILE / TABLET
                    ═══════════════════════════════ */}

                    <div className="lg:hidden">

                      <div
                        className="
                          relative
                          overflow-hidden
                          rounded-2xl
                          border
                          border-blue-500/20
                          bg-gradient-to-br
                          from-slate-900/90
                          via-slate-950/80
                          to-blue-950/30
                          p-5
                          backdrop-blur-xl
                          shadow-[0_0_25px_rgba(37,99,235,0.08)]
                        "
                      >

                        {/* Mobile Decorative Ring */}

                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.08, 1],
                          }}
                          transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="
                            pointer-events-none
                            absolute
                            -right-6
                            -top-6
                            h-24
                            w-24
                            rounded-full
                            border
                            border-blue-400/10
                          "
                        />

                        {/* Mobile Decorative Square */}

                        <motion.div
                          animate={{
                            rotate: [0, 45, 90],
                            y: [0, 6, 0],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="
                            pointer-events-none
                            absolute
                            bottom-5
                            right-5
                            h-5
                            w-5
                            rounded-md
                            border
                            border-cyan-400/20
                          "
                        />

                        {/* Number */}

                        <div
                          className="
                            relative
                            z-10
                            mb-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-blue-400/50
                            bg-blue-500/10
                            text-sm
                            font-bold
                            text-blue-400
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        <div className="relative z-10 flex items-center gap-4">

                          {/* Mobile Content */}

                          <div className="min-w-0 flex-1">

                            <h3 className="text-lg font-bold text-white sm:text-xl">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                              {item.desc}
                            </p>

                          </div>

                          {/* Mobile Icon */}

                          <motion.div
                            whileHover={{
                              scale: 1.08,
                              rotate: 6,
                            }}
                            className="
                              flex
                              h-14
                              w-14
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-blue-400/20
                              bg-blue-500/10
                              text-blue-400
                              shadow-[0_0_20px_rgba(59,130,246,0.12)]
                              sm:h-16
                              sm:w-16
                            "
                          >
                            <ProcessIcon
                              size={26}
                              strokeWidth={1.7}
                            />
                          </motion.div>

                        </div>

                        {/* Bottom Glow */}

                        <div
                          className="
                            absolute
                            bottom-0
                            left-1/2
                            h-[2px]
                            w-1/2
                            -translate-x-1/2
                            bg-gradient-to-r
                            from-transparent
                            via-blue-500
                            to-transparent
                          "
                        />

                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Use */}

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Technologies We Use
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              {service.techTitle || "Modern Mobile Tech Stack"}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="
              grid
              grid-cols-2
              gap-6
              md:grid-cols-3
              lg:grid-cols-6
            "
          >
            {service.technologies.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  className="
                    group
                    rounded-2xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    text-center
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-400/40
                  "
                >
                  <div
                    className={`
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${tech.color}
                      text-white
                      shadow-[0_0_10px_rgba(59,130,246,0.1)]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
                  >
                    <Icon size={28} />
                  </div>

                  <p className="mt-4 font-semibold text-white transition-colors group-hover:text-blue-300">
                    {tech.name}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

            {/* Why Choose Us */}

      <section className="bg-[#050b18] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Why Choose Us
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              Your Trusted Mobile App Partner
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {service.whyChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    group
                    rounded-3xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    text-center
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:border-blue-400/40
                    sm:p-8
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-blue-500/10
                      bg-gradient-to-br
                      from-blue-500/20
                      to-blue-600/10
                      text-blue-400
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon size={32} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Industries We Serve
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              {service.industryTitle ||
                "Mobile Solutions for Every Industry"}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="
              grid
              grid-cols-2
              gap-4
              md:grid-cols-3
              lg:grid-cols-6
            "
          >
            {service.industries.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    group
                    rounded-2xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-4
                    text-center
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-400/40
                  "
                >
                  <div className="text-blue-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>

                  <p className="mt-2 text-sm font-medium text-white transition-colors group-hover:text-blue-300">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-[#050b18] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              FAQ
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-blue-500/10
                  bg-slate-950/40
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-blue-400/30
                "
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-6
                    py-5
                    text-left
                  "
                >
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>

                  {activeFaq === index ? (
                    <ChevronUp
                      size={20}
                      className="flex-shrink-0 text-blue-400"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="flex-shrink-0 text-blue-400"
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
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
                        duration: 0.3,
                      }}
                      className="px-6 pb-5"
                    >
                      <p className="leading-relaxed text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-16 text-center"
          >
            <span
              className="
                mb-4
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-400
              "
            >
              Related Services
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                to-blue-200
                bg-clip-text
                text-3xl
                font-bold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-5xl
              "
            >
              Explore Our Other Services
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {service.relatedServices.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group
                    rounded-2xl
                    border
                    border-blue-500/10
                    bg-slate-950/40
                    p-6
                    text-center
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-blue-400/40
                  "
                >
                  <div
                    className={`
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      ${item.color}
                      shadow-[0_0_10px_rgba(59,130,246,0.1)]
                    `}
                  >
                    <Icon size={24} />
                  </div>

                  <p className="mt-4 text-sm font-medium text-white transition-colors group-hover:text-blue-300">
                    {item.label}
                  </p>

                  <ExternalLink
                    size={14}
                    className="
                      mx-auto
                      mt-2
                      text-blue-400/50
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Strong Call-to-Action */}

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), linear-gradient(to right, #020617, #0b1329, #020617)",
          }}
        />

        <div
          className="
            absolute
            inset-0
            bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]
            opacity-20
          "
        />

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-1/2
            rounded-full
            bg-gradient-to-l
            from-blue-500/5
            to-transparent
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-1/2
            w-1/3
            rounded-full
            bg-gradient-to-r
            from-indigo-500/5
            to-transparent
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            px-4
            text-center
            sm:px-6
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span
              className="
                mb-6
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                tracking-wide
                text-blue-300
              "
            >
              {service.cta.badge || "Let's Build Your App"}
            </span>

            <h2
              className="
                bg-gradient-to-r
                from-white
                via-blue-100
                to-blue-300
                bg-clip-text
                text-3xl
                font-extrabold
                leading-tight
                text-transparent
                sm:text-4xl
                lg:text-6xl
              "
            >
              {service.cta.title}
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-relaxed
                text-slate-300
              "
            >
              {service.cta.description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  px-8
                  py-4
                  font-bold
                  text-white
                  shadow-xl
                  shadow-blue-500/20
                  transition-all
                  duration-300
                  hover:shadow-blue-500/40
                  sm:w-auto
                  sm:px-10
                  sm:py-5
                "
              >
                {service.cta.primaryBtn}

                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-blue-500/20
                  bg-slate-900/40
                  px-8
                  py-4
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-blue-400/50
                  hover:bg-slate-800/60
                  sm:w-auto
                  sm:px-10
                  sm:py-5
                "
              >
                <Phone size={18} />

                {service.cta.secondaryBtn}
              </motion.button>

            </div>

            <div
              className="
                mt-10
                flex
                flex-wrap
                justify-center
                gap-4
                text-sm
                text-slate-400
                sm:mt-12
                sm:gap-8
              "
            >
              <div className="flex items-center gap-2">
                <CheckCircle
                  size={16}
                  className="text-blue-400"
                />

                <span>Free Consultation</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  size={16}
                  className="text-blue-400"
                />

                <span>No Hidden Costs</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  size={16}
                  className="text-blue-400"
                />

                <span>24/7 Support</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  size={16}
                  className="text-blue-400"
                />

                <span>100% Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;