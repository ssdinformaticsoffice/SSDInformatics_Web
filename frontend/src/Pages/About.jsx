import React from "react";
import { motion } from "framer-motion";
import { 
  Target, Eye, Sparkles, Cpu, Globe, Zap, 
  ArrowRight, ArrowDown, 
  Users, Clock, Award, Star, Shield, CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const whyChooseUs = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Skilled professionals with years of experience in technology, design, and digital strategy.",
      gradient: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-400/20",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      delay: 0.1
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Timely delivery of all projects without compromising on quality or performance.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-400/20",
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      delay: 0.2
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous testing and quality checks to ensure top-notch performance and reliability.",
      gradient: "from-blue-500/20 to-purple-500/10",
      border: "border-blue-400/20",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Client Satisfaction",
      description: "Building lasting relationships through trust, transparency, and exceptional service.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-400/20",
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/3 blur-[200px]" />
        
        <motion.div
          className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-[100px]"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px]"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ================= ABOUT US ================= */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                About SSD Informatics
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Building Technology.
                <span className="block text-blue-400 mt-1 sm:mt-2">
                  Growing Businesses.
                </span>
              </h1>

              <div className="mt-5 sm:mt-8 space-y-3 sm:space-y-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  <strong className="text-white">SSD Informatics Pvt. Ltd.</strong>{" "}
                  is a technology and digital solutions company specializing in{" "}
                  <strong className="text-blue-300">Software Development, Web Development, and Social Media Management</strong>.
                  We help businesses build a strong digital presence through innovative technology, creative design, and effective digital strategies.
                </p>

                <p>
                  From developing customized software and modern websites to managing social media platforms and strengthening brand visibility,
                  we provide <strong className="text-blue-300">end-to-end digital solutions</strong> designed around our clients' unique business needs.
                </p>

                <p>
                  Our goal is to combine <strong className="text-blue-300">technology, creativity, and strategy</strong> to help businesses
                  improve their operations, connect with their audience, and grow in the digital world.
                </p>

                <p className="text-blue-200/80 font-medium text-sm sm:text-base">
                  "At SSD Informatics, we believe that every business deserves technology that is smart, scalable, reliable, and result-oriented."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[80px] scale-150" />
                
                <div className="relative aspect-square w-full bg-gradient-to-br from-blue-950/40 to-slate-900/60 rounded-2xl sm:rounded-3xl border border-blue-500/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-cyan-500/5 to-transparent" />
                  
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-14 sm:h-20 rounded-full border border-blue-400/20" />
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-20 sm:h-32 rounded-full border border-cyan-400/20" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-1/3 right-4 sm:right-6 md:right-8 w-10 sm:w-16 h-10 sm:h-16 rounded-full border border-blue-500/10" />
                    <div className="absolute bottom-1/3 left-4 sm:left-6 md:left-8 w-14 sm:w-24 h-14 sm:h-24 rounded-full border border-cyan-500/10" />
                  </motion.div>

                  <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
                          <Cpu size={32} className="text-blue-400 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex gap-2 sm:gap-3 md:gap-4">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Globe size={16} className="text-cyan-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Zap size={16} className="text-blue-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Sparkles size={16} className="text-cyan-400 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </motion.div>
                    </div>

                    <motion.p
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-blue-300 text-[10px] sm:text-xs md:text-sm font-medium tracking-wider mt-0.5 sm:mt-1"
                    >
                      SSD INFORMATICS
                    </motion.p>
                  </div>

                  <motion.div
                    className="absolute top-1/4 left-1/4 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blue-400/40"
                    animate={{ y: [0, -20, 0], x: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-1/3 right-1/4 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-400/30"
                    animate={{ y: [0, 20, 0], x: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>

                <div className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-blue-500/15 bg-slate-900/40 backdrop-blur-xl p-5 sm:p-6 md:p-8 hover:border-blue-500/30 transition-colors duration-300">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target size={20} className="sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Our Mission</h2>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Our mission is to empower businesses with{" "}
                    <strong className="text-blue-300">innovative technology and effective digital solutions</strong>{" "}
                    that simplify operations, strengthen online presence, and accelerate growth.
                  </p>
                  <p>
                    We are committed to delivering high-quality{" "}
                    <strong className="text-blue-300">software, websites, and social media solutions</strong>{" "}
                    that combine performance, creativity, security, and usability while building long-term relationships with our clients through trust and excellence.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full rounded-2xl border border-blue-500/15 bg-slate-900/40 backdrop-blur-xl p-5 sm:p-6 md:p-8 hover:border-blue-500/30 transition-colors duration-300">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye size={20} className="sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Our Vision</h2>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Our vision is to become a{" "}
                    <strong className="text-blue-300">trusted technology and digital growth partner</strong>{" "}
                    for businesses by delivering innovative solutions that create measurable impact.
                  </p>
                  <p>
                    We aim to build a future where businesses of every size can leverage{" "}
                    <strong className="text-blue-300">technology, web platforms, and digital media</strong>{" "}
                    to reach their full potential and compete confidently in an evolving digital landscape.
                  </p>
                  <p className="text-blue-200/80 font-medium">
                    "Transforming ideas into technology, technology into opportunities, and opportunities into growth."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US - IMPROVED WITH CONTENT ================= */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-cyan-500/5 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/5 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Content Area - New Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase mb-3 sm:mb-4">
              <Sparkles size={12} className="sm:w-4 sm:h-4" />
              Why Choose Us
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Why Businesses Choose{" "}
              <span className="text-blue-400">SSD Informatics</span>
            </h2>
            
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            
            <p className="mt-4 sm:mt-6 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              At SSD Informatics, we combine technology, creativity, and strategy to deliver smart, scalable, reliable, and result-oriented digital solutions designed around our clients' unique business needs.
            </p>
          </motion.div>

          {/* Cards Grid - Desktop: 4 Column */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-5">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative h-full p-5 rounded-2xl border ${item.border} bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 text-center group-hover:translate-y-[-6px] transition-transform`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} border ${item.border} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full group-hover:w-2/3 transition-all duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cards Grid - Tablet: 2 Column */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 sm:gap-5">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative p-4 rounded-xl border ${item.border} bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group-hover:translate-y-[-4px] transition-transform`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} border ${item.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cards Grid - Mobile: 1 Column */}
          <div className="md:hidden space-y-3">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative p-3.5 rounded-xl border ${item.border} bg-slate-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 flex items-center gap-3`}>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} border ${item.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative bottom glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-8" />
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative py-10 sm:py-14 md:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Our <span className="text-blue-400">Process</span>
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Cpu, title: "Technology", desc: "Innovative tech solutions with cutting-edge tools", color: "blue" },
              { icon: Sparkles, title: "Creativity", desc: "Creative design thinking that brings ideas to life", color: "cyan" },
              { icon: Globe, title: "Strategy", desc: "Data-driven strategies for sustainable growth", color: "blue" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-blue-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center p-5 sm:p-6 rounded-xl border border-blue-500/15 bg-slate-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={24} className={`text-${item.color}-400`} />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-blue-400/30">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-blue-500/20 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-3 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  Let's Build Something <span className="text-blue-400">Together</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                  Ready to take your digital presence to the next level? Let's connect and create something amazing.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                      Let's Talk →
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse delay-75" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="relative py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light tracking-wide">
            <strong className="text-blue-300 font-bold">Building Technology. Growing Businesses.</strong>
          </p>
          <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase mt-1.5">
            SSD Informatics Pvt. Ltd.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;