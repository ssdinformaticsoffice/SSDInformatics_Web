import {
  Target,
  Eye,
  Award,
  Users,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Clock,
  Star,
  Code2,
  Smartphone,
  Globe,
  Heart,
  Rocket,
  BadgeCheck,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   SHARED ANIMATION VARIANTS  (identical to ServiceDetails.jsx)
───────────────────────────────────────────────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const heroStats = [
  { icon: Briefcase, value: "150+", label: "Projects Completed" },
  { icon: Users,    value: "200+", label: "Happy Clients"       },
  { icon: Award,    value: "5+",   label: "Years of Excellence" },
  { icon: TrendingUp, value: "99%", label: "Client Satisfaction"},
];

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "We deliver secure, scalable and high-quality software solutions with zero compromise.",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    desc: "Every project is completed within the committed timeline — respecting your schedule.",
    color: "from-purple-500 to-purple-700",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Experienced developers, designers and digital marketing professionals on your side.",
    color: "from-cyan-500 to-cyan-700",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    icon: BadgeCheck,
    title: "Client Satisfaction",
    desc: "We focus on long-term relationships and consistently exceeding expectations.",
    color: "from-yellow-500 to-orange-600",
    glow: "rgba(234,179,8,0.2)",
  },
];

const whatWeOffer = [
  { icon: Code2,       label: "Website Development" },
  { icon: Smartphone,  label: "Mobile App Development" },
  { icon: Globe,       label: "Digital Marketing" },
  { icon: Target,      label: "ERP Solutions" },
  { icon: Eye,         label: "UI / UX Design" },
  { icon: Zap,         label: "SEO Optimization" },
  { icon: Shield,      label: "Cloud Solutions" },
  { icon: Rocket,      label: "Software Development" },
];

const team = [
  {
    name:  "Rohan Verma",
    role:  "Developer",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80",
    tag:   "Development",
    tagColor: "from-cyan-600 to-cyan-800",
  },
  {
    name:  "Priya Mehta",
    role:  "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    tag:   "Design",
    tagColor: "from-purple-600 to-purple-800",
  },
  {
    name:  "Aryan Sharma",
    role:  "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
    tag:   "Leadership",
    tagColor: "from-blue-600 to-blue-800",
  },
  {
    name:  "Sneha Patel",
    role:  "Marketing Head",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    tag:   "Marketing",
    tagColor: "from-emerald-600 to-emerald-800",
  },
  {
    name:  "Kabir Singh",
    role:  "Project Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
    tag:   "Management",
    tagColor: "from-indigo-600 to-indigo-800",
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const About = () => {
  return (
    <main className="bg-[#020617] text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col pt-20 sm:pt-28 lg:pt-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 72% 30%, rgba(37,99,235,0.22) 0%, transparent 55%)," +
            "radial-gradient(circle at 18% 68%, rgba(29,78,216,0.14) 0%, transparent 50%)," +
            "linear-gradient(to bottom, #020617 0%, #040a22 65%, #020617 100%)",
        }}
      >
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none select-none opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#3b82f6 1px,transparent 1px)," +
              "linear-gradient(to bottom,#3b82f6 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[auto] lg:min-h-[480px]">

            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col z-20"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-7 h-[3px] bg-[#2563eb] rounded-full" />
                <span className="text-[#60a5fa] text-xs font-bold tracking-[0.2em] uppercase select-none">
                  ABOUT SSD INFORMATICS
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.12] tracking-tight break-words">
                <span className="text-white">Empowering Businesses</span>
                <br />
                <span className="text-[#3b82f6]">Through Technology</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                SSD Informatics is a full-service technology company delivering
                innovative web, mobile, ERP, design, and digital marketing
                solutions that help businesses grow confidently in the digital era.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    className="min-h-12 w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-base shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all duration-300"
                  >
                    Get In Touch
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/services"
                    className="min-h-12 w-full sm:w-auto justify-center px-7 py-3.5 rounded-xl border border-blue-500/30 bg-[#081230]/70 hover:bg-[#0c1a44] text-white font-semibold text-base flex items-center gap-2 transition-all duration-300"
                  >
                    Our Services
                    <ArrowRight size={18} className="text-blue-400" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Right: Premium Image Composition ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end w-full"
            >
              {/* Ambient glow blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-600/15 blur-[80px] rounded-full pointer-events-none" />

              {/* Main image */}
              <div className="relative w-full max-w-[580px]">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-3xl overflow-hidden border border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.2)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                    alt="SSD Informatics Team"
                    className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent" />
                </motion.div>

                {/* Floating stat card — bottom-left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute -bottom-5 left-2 sm:-left-8 glass-panel rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(37,99,235,0.2)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-[#3b82f6] leading-none">5+ Years</p>
                    <p className="text-slate-400 text-xs mt-0.5">of Excellence</p>
                  </div>
                </motion.div>

                {/* Floating stat card — top-right */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-5 right-2 sm:-right-8 glass-panel rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(37,99,235,0.2)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-[#3b82f6] leading-none">200+</p>
                    <p className="text-slate-400 text-xs mt-0.5">Happy Clients</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full relative z-10 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="rounded-2xl px-6 py-6 sm:py-7 border border-blue-500/20 bg-[#060e2a]/85 backdrop-blur-xl shadow-[0_15px_40px_rgba(2,6,23,0.8)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-0 md:divide-x md:divide-blue-500/20">
                {heroStats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 py-2 md:py-0 md:px-6 lg:px-8"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/35 flex items-center justify-center flex-shrink-0 text-[#3b82f6] shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#3b82f6] leading-none tracking-tight">
                          {s.value}
                        </p>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium leading-snug">
                          {s.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHO WE ARE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Premium overlapping image layout ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[320px] sm:h-[480px] lg:h-[520px] w-full max-w-2xl mx-auto lg:max-w-none"
            >
              {/* Glow blob */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/12 blur-3xl rounded-full pointer-events-none" />

              {/* Main large image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-[75%] h-[72%] rounded-3xl overflow-hidden border border-blue-500/20 shadow-[0_0_35px_rgba(37,99,235,0.18)] z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent" />
              </motion.div>

              {/* Secondary image — bottom-right, overlapping */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 right-0 w-[58%] h-[58%] rounded-3xl overflow-hidden border border-blue-400/25 shadow-[0_0_35px_rgba(37,99,235,0.22)] z-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
                  alt="Development workspace"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#020617]/40 to-transparent" />
              </motion.div>

              {/* Accent floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-[60%] left-1/2 sm:left-[55%] -translate-x-1/2 glass-panel rounded-2xl px-3 sm:px-4 py-3 flex items-center gap-3 shadow-[0_8px_32px_rgba(37,99,235,0.25)] z-30"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <Rocket size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">150+</p>
                  <p className="text-slate-400 text-xs mt-0.5">Projects</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-6">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                We Build Digital Products That Help Businesses Grow
              </h2>
              <p className="mt-6 text-slate-300 leading-relaxed text-base sm:text-lg">
                Founded with a vision to bridge the gap between technology and
                business, SSD Informatics has grown into a trusted digital partner
                for businesses across industries. We combine creativity,
                engineering, and strategy to deliver exceptional results.
              </p>
              <p className="mt-4 text-slate-400 leading-relaxed text-sm sm:text-base">
                Whether you're a startup seeking your first digital product or an
                established enterprise modernizing operations — we bring the
                expertise, dedication, and innovation to make it happen.
              </p>

              {/* Services checklist grid */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {whatWeOffer.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-blue-400" />
                      </div>
                      <span className="text-sm font-medium">{s.label}</span>
                    </div>
                  );
                })}
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block mt-10"
              >
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all duration-300"
                >
                  Work With Us
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. MISSION & VISION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-14 bg-[#050b18] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-950/40 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-blue-500/10 hover:border-blue-400/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Target size={30} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">
                  To deliver innovative, high-quality technology solutions that
                  empower businesses of all sizes to succeed and grow confidently
                  in the digital era — with transparency, integrity, and care at
                  every step.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  {["Innovation-first mindset", "Client-centric delivery", "Ethical & transparent practices"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-950/40 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-blue-500/10 hover:border-blue-400/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-700/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Eye size={30} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">
                  To become a globally trusted technology partner by building
                  smart, scalable, and impactful digital solutions — creating a
                  world where every business can harness the full power of modern
                  technology.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  {["Global technology impact", "Scalable & future-ready", "Long-term trusted partnerships"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. WHY CHOOSE US
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-15 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050b18] to-[#020617]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
              Why Businesses Trust SSD Informatics
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-slate-300 leading-relaxed text-base sm:text-lg">
              We combine creativity, technology, and innovation to build reliable
              digital solutions that help your business grow faster and smarter.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 border border-blue-900/30 rounded-3xl overflow-hidden bg-[#020617]/80 backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.05)]"
          >
            {coreValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative p-6 sm:p-8 lg:p-10 text-center border-b sm:border-b-0 sm:border-r border-blue-900/30 last:border-0 sm:last:border-r-0 lg:last:border-r-0 hover:bg-[#0a1128] transition-colors duration-500 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px]"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#081230] flex items-center justify-center mx-auto text-blue-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-6 border border-blue-500/20 group-hover:border-blue-400/40">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TEAM SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-15 bg-[#050b18] relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              The People Behind the Work
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-slate-300 leading-relaxed text-base sm:text-lg">
              A passionate team of developers, designers, and strategists united
              by one goal — delivering excellence for every client.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:flex sm:flex-nowrap justify-center items-end gap-3 sm:gap-4 lg:gap-5 mt-10 sm:mt-16 w-full max-w-5xl mx-auto"
          >
            {team.map((member, i) => {
              // Creating the arched carousel look by varying heights and aligning to bottom
              const isOuter = i === 0 || i === 4;
              const isMid = i === 1 || i === 3;
              
              const hClass = 
                isOuter ? "h-[200px] sm:h-[280px] lg:h-[340px]" : 
                isMid ? "h-[240px] sm:h-[320px] lg:h-[400px]" : 
                "h-[280px] sm:h-[360px] lg:h-[460px]"; // Center is tallest

              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`group relative w-full min-w-0 sm:flex-1 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#0a1128] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(37,99,235,0.3)] hover:z-10 cursor-pointer ${hClass}`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Name overlay appears on hover to match the clean look of the reference image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 sm:p-5 text-center">
                    <h3 className="text-sm sm:text-lg font-bold text-white leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-blue-400 text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-widest truncate">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. CTA SECTION  (mirrors ServiceDetails CTA exactly)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-15 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)," +
              "linear-gradient(to right, #020617, #0b1329, #020617)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,#3b82f6 1px,transparent 1px)," +
              "linear-gradient(to bottom,#3b82f6 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium tracking-wide mb-6">
              Let's Work Together
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight">
              Ready To Grow Your Business?
            </h2>

            <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Let's build powerful digital solutions together. Contact SSD
              Informatics today and take the first step toward your digital
              transformation.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
                >
                  Get Free Quote
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/services"
                  className="w-full sm:w-auto justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-slate-900/40 text-white font-semibold hover:bg-slate-800/60 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-3"
                >
                  <Heart size={18} />
                  Our Services
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-slate-400">
              {["Free Consultation", "No Hidden Costs", "5+ Years Experience", "200+ Happy Clients"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-blue-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default About;
