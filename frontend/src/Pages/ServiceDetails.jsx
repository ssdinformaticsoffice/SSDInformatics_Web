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
import { useState } from "react";
import { useParams } from "react-router-dom";
import { servicesData } from "../data/serviceData";

const ServiceDetails = () => {
  const { slug } = useParams();
  const service = servicesData[slug];
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0F1E] text-white text-3xl">
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
    <main className="bg-[#0A0F1E] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1A3A] via-[#0F274E] to-[#1A3D7A] py-28 lg:py-36">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1A3D7A]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-[#2B6FE8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-blue-200 text-sm font-medium tracking-wide">
                  {service.companyName || "SSD Informatics"}
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                {service.title}
              </h1>
              <p className="mt-6 text-blue-200 leading-relaxed text-lg max-w-lg">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2B6FE8] to-[#4A86F7] text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  {service.heroButtons?.primary || "Get Free Quote"}
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-white/20 backdrop-blur-sm bg-white/5 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                 {service.heroButtons?.secondary || "Contact Us"} 
                </motion.button>
              </div>
              <div className="flex items-center gap-8 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0A0F1E] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-blue-300">
                    {service.trustedText || "Trusted by 200+ businesses"}
                  </p>

                  <div className="flex text-yellow-400 text-sm">
                    {service.rating || "★★★★★"}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1E]/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2B6FE8] to-[#4A86F7] flex items-center justify-center">
                    <Play size={20} className="fill-white text-white ml-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Watch Demo</p>
                    <p className="text-blue-300 text-xs">
                      See how we build apps
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E] to-[#0A0F1E]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {service.overview.title}
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-blue-200/80 leading-relaxed text-lg">
              {service.overview.description}
            </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <p className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-blue-300/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 bg-[#0F1A2E]">
        <div className="max-w-7xl mx-auto px-6">
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
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-xl font-semibold mt-6 text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-blue-200/70 leading-relaxed">
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E] to-[#0A0F1E]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
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

            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
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
      <section className="py-24 bg-[#0F1A2E] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
             {service.processTitle || "From Idea to App Store"} 
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent hidden lg:block"></div>
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
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        {item.step}
                      </span>
                      <h3 className="text-2xl font-bold mt-3 text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-blue-200/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-1/2 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-400">
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E] to-[#0A0F1E]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform duration-300`}
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
      <section className="py-24 bg-[#0F1A2E]">
        <div className="max-w-7xl mx-auto px-6">
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

            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                  className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/5 hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-xl font-semibold mt-6 text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-blue-200/70 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E] to-[#0A0F1E]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
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
      <section className="py-24 bg-[#0F1A2E]">
        <div className="max-w-4xl mx-auto px-6">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all duration-300 overflow-hidden"
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
                      <p className="text-blue-200/70 leading-relaxed">
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E] to-[#0A0F1E]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
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
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto`}
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A3A] via-[#0F274E] to-[#1A3D7A]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-blue-200 text-sm font-medium tracking-wide mb-6">
              {service.cta.badge || "Let's Build Your App"}
            </span>

            <h2 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              {service.cta.title}
            </h2>

            <p className="mt-6 text-blue-200 max-w-2xl mx-auto text-lg leading-relaxed">
              {service.cta.description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-xl bg-gradient-to-r from-[#2B6FE8] to-[#4A86F7] text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3"
              >
                {service.cta.primaryBtn}
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-xl border border-white/20 backdrop-blur-sm bg-white/5 text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
              >
                <Phone size={18} />
                {service.cta.secondaryBtn}
              </motion.button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-200/70">
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
