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
            if (progress < 1) requestAnimationFrame(step);
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
  const { count, nodeRef } = useCountUp(stat.numericValue ?? 0, 2000 + index * 300);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="flex items-center gap-3 sm:gap-4 py-2 md:py-0 md:px-6 lg:px-8 min-w-0"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/35 flex items-center justify-center flex-shrink-0 text-[#3b82f6] shadow-[0_0_15px_rgba(37,99,235,0.2)]">
        {Icon && <Icon size={22} />}
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#3b82f6] leading-none tracking-tight">
          {count}
          {stat.suffix}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium leading-snug">{stat.label}</p>
      </div>
    </motion.div>
  );
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
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white text-3xl">
        Service Not Found
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="bg-[#020617] text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════
           HERO SECTION — Exact Reference Image Design
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#020617] flex flex-col pt-20 sm:pt-24 lg:pt-32"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(37,99,235,0.22) 0%, transparent 55%), " +
            "radial-gradient(circle at 18% 65%, rgba(29,78,216,0.15) 0%, transparent 50%), " +
            "linear-gradient(to bottom, #020617 0%, #040a22 65%, #020617 100%)",
        }}
      >
        {/* Tech grid overlay like reference image */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none select-none"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Main hero content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[auto] lg:min-h-[480px]">

            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col z-20"
            >
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-7 h-[3px] bg-[#2563eb] rounded-full" />
                <span className="text-[#60a5fa] text-xs font-bold tracking-[0.2em] uppercase select-none">
                  {service.heroTagline || "SSD INFORMATICS"}
                </span>
              </motion.div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.12] tracking-tight break-words">
                {service.heroTitle?.before ? (
                  <>
                    <span className="text-white">{service.heroTitle.before}</span>
                    <br />
                    {service.heroTitle.middle && (
                      <span className="text-white">{service.heroTitle.middle} </span>
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
              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                {service.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="min-h-12 w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-base shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
                >
                  {service.heroButtons?.primary || "Explore Services"}
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="min-h-12 w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl border border-blue-500/30 bg-[#081230]/70 hover:bg-[#0c1a44] text-white font-semibold text-base flex items-center gap-2 transition-all"
                >
                  {service.heroButtons?.secondary || "Contact Us"}
                  <Mail size={18} className="text-blue-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* ── Right: 3D Illustration matching reference position & sizing ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end w-full"
            >
              {/* Background ambient light bloom */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-blue-600/15 blur-[95px] rounded-full pointer-events-none" />

              {/* 3D Illustration — Seamless soft edge fade into background */}
              <img
                src={service.image}
                alt={service.title}
                className="relative w-full max-w-[620px] xl:max-w-[680px] h-auto object-contain z-10 drop-shadow-[0_12px_40px_rgba(37,99,235,0.25)] select-none"
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

        {/* ── Bottom Stats Bar Card ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full relative z-10 mt-6 sm:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="rounded-2xl px-6 py-6 sm:py-7 border border-blue-500/20 bg-[#060e2a]/85 backdrop-blur-xl shadow-[0_15px_40px_rgba(2,6,23,0.8)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-0 md:divide-x md:divide-blue-500/20">
                {service.heroStats?.map((stat, i) => (
                  <HeroStatCard key={i} stat={stat} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Service Overview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              {service.overview.title}
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-slate-300 leading-relaxed text-base sm:text-lg">
              {service.overview.description}
            </p>
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 max-w-4xl mx-auto">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-slate-950/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300"
                >
                  <p className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#050b18] relative">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {service.offers.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group relative bg-slate-950/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-blue-500/10 hover:border-blue-400/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-blue-500/10">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-xl font-semibold mt-6 text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-slate-400 leading-relaxed">
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
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Key Features
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              {service.featuresTitle || "What Makes Our Apps Stand Out"}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-slate-950/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10 hover:border-blue-400/40 transition-all duration-300 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.15)]`}
                  >
                    <Icon size={24} />
                  </div>

                  <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#050b18] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Development Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
             {service.processTitle || "From Idea to App Store"} 
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-blue-400/15 to-transparent hidden lg:block"></div>
            <div className="space-y-12">
              {service.process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="lg:w-1/2">
                    <div className="bg-slate-950/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-1/2 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center text-2xl font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Technologies We Use
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
             {service.techTitle || "Modern Mobile Tech Stack"} 
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {service.technologies.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-slate-950/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-500/10 hover:border-blue-400/40 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)]`}
                  >
                    <Icon size={28} />
                  </div>

                  <p className="mt-4 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {tech.name}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#050b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Why Choose Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Your Trusted Mobile App Partner
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {service.whyChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group bg-slate-950/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center border border-blue-500/10 hover:border-blue-400/40 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-blue-500/10">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-xl font-semibold mt-6 text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Industries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              {service.industryTitle || "Mobile Solutions for Every Industry"}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {service.industries.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-950/40 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-500/10 hover:border-blue-400/40 transition-all duration-300 group"
                >
                  <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>

                  <p className="mt-2 text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#050b18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-slate-950/40 backdrop-blur-sm rounded-2xl border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>

                  {activeFaq === index ? (
                    <ChevronUp
                      size={20}
                      className="text-blue-400 flex-shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-blue-400 flex-shrink-0"
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5"
                    >
                      <p className="text-slate-400 leading-relaxed">
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
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Related Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Explore Our Other Services
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {service.relatedServices.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group bg-slate-950/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-500/10 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(59,130,246,0.1)]`}
                  >
                    <Icon size={24} />
                  </div>

                  <p className="mt-4 text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                    {item.label}
                  </p>

                  <ExternalLink
                    size={14}
                    className="mx-auto mt-2 text-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Strong Call-to-Action */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), linear-gradient(to right, #020617, #0b1329, #020617)",
          }}
        ></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium tracking-wide mb-6">
              {service.cta.badge || "Let's Build Your App"}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight">
              {service.cta.title}
            </h2>

            <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              {service.cta.description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
              >
                {service.cta.primaryBtn}
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-slate-900/40 text-white font-semibold hover:bg-slate-800/60 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-3"
              >
                <Phone size={18} />
                {service.cta.secondaryBtn}
              </motion.button>
            </div>
            <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
                <span>No Hidden Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
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

