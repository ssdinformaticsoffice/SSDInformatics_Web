import { Link } from "react-router-dom";
import {
  Code2,
  Smartphone,
  Palette,
  Database,
  Search,
  Megaphone,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Clapperboard,
  Shield,
} from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Website Development",
    slug: "website-development",
    icon: <Code2 size={35} />,
    description:
      "We create fast, responsive and modern websites that help businesses build a strong online presence.",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: <Smartphone size={35} />,
    description:
      "Powerful Android and iOS applications with smooth user experience and advanced features.",
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    icon: <Palette size={35} />,
    description:
      "Creative and user-friendly designs that improve customer experience and engagement.",
  },
  {
    title: "ERP Software Solutions",
    slug: "erp-solutions",
    icon: <Database size={35} />,
    description:
      "Custom ERP solutions to manage business operations efficiently.",
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    icon: <Search size={35} />,
    description:
      "Improve your search ranking and grow organic traffic with our SEO strategies.",
  },
  {
    title: "Google Ads",
    slug: "google-ads",
    icon: <BarChart3 size={35} />,
    description:
      "Result-driven Google Ads campaigns to reach the right audience.",
  },
  {
    title: "Meta Ads",
    slug: "meta-ads",
    icon: <Megaphone size={35} />,
    description:
      "Grow your brand with targeted Facebook and Instagram advertising campaigns.",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    icon: <Palette size={35} />,
    description:
      "Creative graphic designs including logos, banners, social media posts, brochures and complete brand identity solutions.",
  },

  {
    title: "Video Editing",
    slug: "video-editing",
    icon: <Clapperboard size={35} />,
    description:
      "Professional video editing for YouTube, Instagram Reels, promotional videos, advertisements and business branding.",
  },
];

const FloatingCard = ({ x, y, children, delay = 0 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="absolute backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
      style={{
        x,
        y,
        width: 200,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: y, transition: { delay: delay + 0.5 } }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.8 }}
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3C91] to-[#03112F] flex items-center justify-center text-white mb-3"
      >
        {children}
      </motion.div>
      <h4 className="text-white font-semibold text-sm">AI-Powered</h4>
      <p className="text-white/50 text-xs mt-1">Real-time insights</p>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMouseX((e.clientX - rect.left) / rect.width - 0.5);
      setMouseY((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-20 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #03112F 0%, #061F4A 25%, #082C6C 50%, #0B3C91 75%, #0B3C91 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0B3C91]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#082C6C]/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0B3C91]/5 to-[#03112F]/20" />
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles size={16} className="text-[#60A5FA]" />
              <span className="text-sm font-semibold text-[#60A5FA] tracking-wider">
                OUR SERVICES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              <span className="text-white">Digital Solutions</span>
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#93BBFC] to-[#2563EB] bg-clip-text text-transparent">
                For Your Growth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-blue-100/80 leading-relaxed max-w-lg"
            >
              Transform your business with cutting-edge technology solutions. We
              deliver innovation that drives results and accelerates your
              digital transformation journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-[#0B3C91] to-[#2563EB] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#0B3C91]/40 flex items-center gap-2 transition-all"
              >
                Explore Services
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Play size={20} />
                Get Quote
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="relative w-full h-[500px]"
              onMouseMove={handleMouseMove}
            >
              {/* Main blob */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/30 via-[#0B3C91]/40 to-[#061F4A]/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  x: useTransform(useMotionValue(mouseX * 20), (v) => v),
                  y: useTransform(useMotionValue(mouseY * 20), (v) => v),
                }}
              />

              {/* Center illustration */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0B3C91] to-[#061F4A] flex items-center justify-center shadow-2xl shadow-[#0B3C91]/50 border border-white/10">
                    <div className="w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Code2 size={80} className="text-white" />
                    </div>
                  </div>
                  {/* Orbiting rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#2563EB]/30"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: 300, height: 300, top: -75, left: -75 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#60A5FA]/20"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: 250, height: 250, top: -50, left: -50 }}
                  />
                </div>
              </motion.div>

              {/* Floating cards */}
              <FloatingCard x={-100} y={-50} delay={0.1}>
                <Zap size={20} />
              </FloatingCard>

              <FloatingCard x={150} y={-80} delay={0.3}>
                <Shield size={20} />
              </FloatingCard>

              <FloatingCard x={-80} y={150} delay={0.5}>
                <BarChart3 size={20} />
              </FloatingCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Services Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-32 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Sparkles size={16} className="text-[#60A5FA]" />
            <span className="text-sm font-semibold text-[#60A5FA] tracking-wider">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            We Provide Best Digital Services
          </h2>
          <p className="mt-4 text-blue-100/80 max-w-2xl mx-auto text-lg">
            Comprehensive digital solutions tailored to your business needs,
            delivered with excellence and innovation.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="relative group bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-[#0B3C91]/30 transition-all duration-500 border border-white/10 hover:border-white/20"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <motion.span
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-[#2563EB] to-[#60A5FA]"
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-[#2563EB] to-[#60A5FA]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  transition={{ duration: 0.3, delay: 0.9, ease: "easeOut" }}
                />
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2563EB]/0 to-[#0B3C91]/0 group-hover:from-[#2563EB]/10 group-hover:to-[#0B3C91]/20 transition-all duration-500 pointer-events-none" />

              {/* Icon */}
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B3C91]/30 to-[#061F4A]/30 text-[#60A5FA] group-hover:bg-gradient-to-br group-hover:from-[#0B3C91] group-hover:to-[#061F4A] group-hover:text-white transition-all duration-500 border border-white/10 group-hover:border-transparent"
                whileHover={{
                  rotate: 6,
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-[#60A5FA] transition-colors duration-300">
                {service.title}
              </h3>

              <p className="mt-3 text-blue-100/70 leading-relaxed group-hover:text-blue-100/90 transition-colors duration-300">
                {service.description}
              </p>

              {/* Learn More Button */}
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 mt-6 text-[#60A5FA] font-semibold group/link relative"
              >
                <span className="relative">
                  Learn More
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#60A5FA] group-hover/link:w-full transition-all duration-300" />
                </span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
