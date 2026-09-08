import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  User,
  FileText,
  Edit3,
  Code2,
  CloudUpload,
  BarChart2,
  Globe,
  Users, Rocket
} from "lucide-react";
import axios from "axios";
import contactImage from "/images/contact-image.jpg";


const ContactPage = () => {
  const formRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000/api";

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true); setSubmitStatus(null);
    try {
      const res = await axios.post(`${API_URL}/contact`, formData);
      if (res.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch { setSubmitStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const inp = (field) =>
    `w-full bg-[#0a1628]/80 border ${errors[field] ? "border-red-500/60" : "border-[#1c3460]/80"} text-white placeholder-[#4a6080] text-sm rounded-lg pl-10 pr-4 py-[13px] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-200 backdrop-blur-sm`;

  /* floating card data — 4 icons matching reference */
  const floatCards = [
    { Icon: Code2, label: "</>", pos: "top-[8%]  right-[36%]", delay: 0, dir: -1 },
    { Icon: CloudUpload, label: "Cloud", pos: "top-[5%]  right-[6%]", delay: 0.6, dir: 1 },
    { Icon: BarChart2, label: "Chart", pos: "top-[46%] right-[30%]", delay: 1.1, dir: 1 },
    { Icon: Globe, label: "Globe", pos: "top-[50%] right-[4%]", delay: 1.6, dir: -1 },
  ];

  return (
    <div className="bg-[#020c1f] text-white font-sans min-h-screen overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          — Dark navy tech bg image, left text, right floating cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[760px] sm:min-h-[780px] lg:min-h-[680px] overflow-hidden bg-[#020c1f]">

        {/* =========================================================
      BACKGROUND IMAGE
  ========================================================== */}
        <div
          className="
      absolute inset-0
      bg-cover
      bg-no-repeat
      bg-[center_35%]
      sm:bg-[center_35%]
      lg:bg-center
    "
          style={{
            backgroundImage: `url('${contactImage}')`,
          }}
        />

        {/* =========================================================
      DARK OVERLAY
  ========================================================== */}

        {/* Desktop */}
        <div
          className="
      absolute inset-0
      hidden lg:block
      bg-gradient-to-r
      from-[#020c1f]
      via-[#020c1f]/75
      to-[#020c1f]/45
    "
        />

        {/* Mobile / Tablet */}
        <div
          className="
      absolute inset-0
      lg:hidden
      bg-gradient-to-b
      from-[#020c1f]/80
      via-[#020c1f]/75
      to-[#020c1f]/95
    "
        />

        {/* Top / Bottom darkening */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-b
      from-[#020c1f]/55
      via-transparent
      to-[#020c1f]/90
    "
        />

        {/* =========================================================
      AMBIENT GLOWS
  ========================================================== */}

        {/* Left glow */}
        <div
          className="
      absolute
      -left-40
      top-10
      w-[450px]
      h-[450px]
      lg:w-[600px]
      lg:h-[600px]
      rounded-full
      bg-cyan-600/10
      blur-[130px]
      lg:blur-[170px]
      pointer-events-none
    "
        />

        {/* Right glow */}
        <div
          className="
      absolute
      right-[-150px]
      top-10
      w-[450px]
      h-[450px]
      lg:w-[650px]
      lg:h-[650px]
      rounded-full
      bg-blue-600/10
      blur-[120px]
      lg:blur-[160px]
      pointer-events-none
    "
        />

        {/* Center glow */}
        <div
          className="
      absolute
      right-[15%]
      top-[30%]
      w-[220px]
      h-[220px]
      rounded-full
      bg-cyan-400/10
      blur-[100px]
      pointer-events-none
    "
        />

        {/* =========================================================
      DOT GRID
  ========================================================== */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* =========================================================
      MAIN CONTENT
  ========================================================== */}
        <div
          className="
      relative
      z-10
      max-w-7xl
      mx-auto
      min-h-[760px]
      sm:min-h-[780px]
      lg:min-h-[680px]
      px-5
      sm:px-7
      lg:px-14
      flex
      items-center
      py-16
      lg:py-12
    "
        >

          <div
            className="
        w-full
        grid
        grid-cols-1
        lg:grid-cols-[0.95fr_1.05fr]
        gap-12
        lg:gap-6
        items-center
      "
          >

            {/* =====================================================
          LEFT CONTENT
      ====================================================== */}
            <div
              className="
          relative
          z-20
          flex
          flex-col
          items-center
          lg:items-start
          text-center
          lg:text-left
        "
            >

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="
            mb-6
            inline-flex
            items-center
            rounded-full
            px-5
            py-2
          "
                style={{
                  background: "rgba(4,18,42,0.65)",
                  border: "1px solid rgba(34,211,238,0.55)",
                  boxShadow: "0 0 25px rgba(34,211,238,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="
              text-[10px]
              sm:text-[11px]
              font-semibold
              tracking-[0.25em]
              text-white
              uppercase
            "
                >
                  Let's Connect with Us
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="
            max-w-[650px]
            font-extrabold
            text-white
            tracking-tight
            leading-[1.12]
            mb-6
          "
                style={{
                  fontSize: "clamp(32px, 4.4vw, 58px)",
                }}
              >
                We Build Digital
                <br />

                Solutions That{" "}

                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #38bdf8 0%, #22d3ee 50%, #67e8f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Grow
                </span>

                <br />

                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #38bdf8 0%, #22d3ee 50%, #67e8f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Businesses
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="
            max-w-[610px]
            text-[14px]
            sm:text-[15px]
            lg:text-[16px]
            leading-7
            text-slate-300
            mb-7
          "
              >
                At{" "}
                <span className="font-semibold text-cyan-300">
                  SSD Informatics
                </span>
                , we build modern web solutions and digital experiences
                that help businesses establish a strong online presence,
                improve their operations, and grow in the digital world.
              </motion.p>

              {/* Service Pills */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="
            flex
            flex-wrap
            justify-center
            lg:justify-start
            gap-2.5
            mb-8
          "
              >

                {/* Web Development */}
                <div
                  className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-[11px]
              sm:text-xs
              font-medium
              text-sky-100
            "
                  style={{
                    background: "rgba(5,24,52,0.7)",
                    border: "1px solid rgba(56,189,248,0.35)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Web Development
                </div>

                {/* Custom Solutions */}
                <div
                  className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-[11px]
              sm:text-xs
              font-medium
              text-sky-100
            "
                  style={{
                    background: "rgba(5,24,52,0.7)",
                    border: "1px solid rgba(56,189,248,0.35)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Custom Solutions
                </div>

                {/* Digital Growth */}
                <div
                  className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-[11px]
              sm:text-xs
              font-medium
              text-sky-100
            "
                  style={{
                    background: "rgba(5,24,52,0.7)",
                    border: "1px solid rgba(56,189,248,0.35)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  Digital Growth
                </div>

              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                onClick={scrollToForm}
                className="
            group
            inline-flex
            items-center
            gap-4
            rounded-full
            px-7
            py-3.5
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
          "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(14,165,233,0.95), rgba(37,99,235,0.95))",
                  border: "1px solid rgba(103,232,249,0.55)",
                  boxShadow:
                    "0 10px 35px rgba(14,165,233,0.20)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";

                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(14,165,233,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";

                  e.currentTarget.style.boxShadow =
                    "0 10px 35px rgba(14,165,233,0.20)";
                }}
              >
                Get Started

                <ArrowRight
                  className="
              w-5
              h-5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
                />
              </motion.button>

            </div>
            {/* =====================================================
    RIGHT — RESPONSIVE CONTACT ORBIT DESIGN
===================================================== */}

            <div className="relative w-full">
              <div
                className="
      relative
      hidden
      sm:flex
      items-center
      justify-center
      h-[450px]
      lg:h-[530px]
      w-full
    "
              >

                {/* ================= OUTER ORBIT ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[380px]
        h-[380px]
        lg:w-[500px]
        lg:h-[500px]
        rounded-full
        border
        border-dashed
        border-cyan-400/20
      "
                />

                {/* ================= MIDDLE ORBIT ================= */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[320px]
        h-[320px]
        lg:w-[410px]
        lg:h-[410px]
        rounded-full
        border
        border-cyan-400/25
      "
                />

                {/* ================= INNER ORBIT ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[245px]
        h-[245px]
        lg:w-[315px]
        lg:h-[315px]
        rounded-full
        border
        border-blue-400/30
      "
                />

                {/* ================= CENTER GLOW ================= */}
                <div
                  className="
        absolute
        w-[280px]
        h-[280px]
        lg:w-[350px]
        lg:h-[350px]
        rounded-full
        bg-cyan-400/5
        blur-3xl
      "
                />

                {/* ================= ORBIT DOT 1 ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[245px]
        h-[245px]
        lg:w-[315px]
        lg:h-[315px]
        rounded-full
      "
                >
                  <div
                    className="
          absolute
          -top-1
          left-1/2
          -translate-x-1/2
          w-2
          h-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_15px_#22d3ee]
        "
                  />
                </motion.div>

                {/* ================= ORBIT DOT 2 ================= */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[320px]
        h-[320px]
        lg:w-[410px]
        lg:h-[410px]
        rounded-full
      "
                >
                  <div
                    className="
          absolute
          right-[7%]
          top-[18%]
          w-2
          h-2
          rounded-full
          bg-sky-400
          shadow-[0_0_15px_#38bdf8]
        "
                  />
                </motion.div>

                {/* ================= CENTER MAIL ================= */}
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        relative
        z-20
        flex
        items-center
        justify-center
        w-[145px]
        h-[145px]
        lg:w-[175px]
        lg:h-[175px]
        rounded-full
      "
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(56,189,248,0.25), rgba(3,18,42,0.95) 65%)",
                    border: "1px solid rgba(34,211,238,0.75)",
                    boxShadow:
                      "0 0 45px rgba(34,211,238,0.18), inset 0 0 30px rgba(14,165,233,0.08)",
                  }}
                >
                  <div
                    className="
          absolute
          inset-[15px]
          rounded-full
          border
          border-cyan-400/20
        "
                  />

                  <Mail
                    className="
          relative
          z-10
          w-16
          h-16
          lg:w-[76px]
          lg:h-[76px]
          text-cyan-300
        "
                    strokeWidth={1.2}
                  />
                </motion.div>

                {/* =================================================
        TOP — LET'S TALK
    ================================================= */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        top-[2%]
        right-[5%]
        lg:right-[2%]
        w-[210px]
        lg:w-[235px]
        rounded-[22px]
        p-5
      "
                  style={{
                    background: "rgba(4,19,45,0.82)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-start gap-3">

                    <div
                      className="
            shrink-0
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Users className="w-6 h-6 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold text-white">
                        Let's Talk
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        We're here to listen and understand your goals.
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* =================================================
        LEFT — SMART SOLUTIONS
    ================================================= */}
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        left-0
        lg:left-[-5%]
        top-[39%]
        w-[215px]
        lg:w-[245px]
        rounded-[22px]
        p-5
      "
                  style={{
                    background: "rgba(4,19,45,0.84)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-start gap-3">

                    <div
                      className="
            shrink-0
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Code2 className="w-6 h-6 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold text-white">
                        Smart Solutions
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        We create tailored solutions for your business needs.
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* =================================================
        RIGHT — CONNECT
    ================================================= */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                  }}
                  className="
        absolute
        z-30
        right-0
        lg:right-[-2%]
        top-[45%]
        w-[205px]
        lg:w-[225px]
      "
                >
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Let's{" "}
                    <span className="text-cyan-400">
                      Connect
                    </span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Have a project in mind? Let's discuss how we can
                    help you build and grow digitally.
                  </p>
                </motion.div>

                {/* =================================================
        BOTTOM — GROW TOGETHER
    ================================================= */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        bottom-[1%]
        right-[6%]
        lg:right-[5%]
        w-[210px]
        lg:w-[235px]
        rounded-[22px]
        p-5
      "
                  style={{
                    background: "rgba(4,19,45,0.82)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-start gap-3">

                    <div
                      className="
            shrink-0
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Rocket className="w-6 h-6 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold text-white">
                        Grow Together
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        We help you scale, innovate and achieve long-term success.
                      </p>
                    </div>

                  </div>
                </motion.div>

              </div>


              {/* ===================================================
      MOBILE DESIGN
      Completely separate layout
  ==================================================== */}
              <div
                className="
      relative
      flex
      sm:hidden
      items-center
      justify-center
      h-[430px]
      w-full
      overflow-hidden
    "
              >

                {/* ================= MOBILE OUTER ORBIT ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[285px]
        h-[285px]
        rounded-full
        border
        border-dashed
        border-cyan-400/20
      "
                />

                {/* ================= MOBILE MIDDLE ORBIT ================= */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[225px]
        h-[225px]
        rounded-full
        border
        border-cyan-400/25
      "
                />

                {/* ================= MOBILE INNER ORBIT ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[165px]
        h-[165px]
        rounded-full
        border
        border-blue-400/25
      "
                />

                {/* ================= MOBILE GLOW ================= */}
                <div
                  className="
        absolute
        w-[230px]
        h-[230px]
        rounded-full
        bg-cyan-400/10
        blur-3xl
      "
                />

                {/* ================= MOBILE ORBIT DOT ================= */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
        absolute
        w-[225px]
        h-[225px]
        rounded-full
      "
                >
                  <span
                    className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-2
          h-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_15px_#22d3ee]
        "
                  />
                </motion.div>

                {/* ================= MOBILE CENTER ================= */}
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        relative
        z-20
        flex
        items-center
        justify-center
        w-[105px]
        h-[105px]
        rounded-full
      "
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(56,189,248,0.28), rgba(3,18,42,0.96) 65%)",
                    border: "1px solid rgba(34,211,238,0.75)",
                    boxShadow:
                      "0 0 40px rgba(34,211,238,0.22), inset 0 0 25px rgba(14,165,233,0.08)",
                  }}
                >

                  <div
                    className="
          absolute
          inset-[11px]
          rounded-full
          border
          border-cyan-400/20
        "
                  />

                  <Mail
                    className="
          relative
          z-10
          w-12
          h-12
          text-cyan-300
        "
                    strokeWidth={1.2}
                  />

                </motion.div>


                {/* =================================================
        MOBILE — LET'S TALK
        Centered top
    ================================================= */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        top-[5px]
        left-1/2
        -translate-x-1/2
        w-[155px]
        rounded-2xl
        p-3
      "
                  style={{
                    background: "rgba(4,19,45,0.88)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
                  }}
                >

                  <div className="flex items-center gap-2.5">

                    <div
                      className="
            shrink-0
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Users className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-white">
                        Let's Talk
                      </h3>

                      <p className="mt-0.5 text-[9px] leading-4 text-slate-300">
                        We're here to listen.
                      </p>
                    </div>

                  </div>

                </motion.div>


                {/* =================================================
        MOBILE — SMART SOLUTIONS
        Left bottom
    ================================================= */}
                <motion.div
                  animate={{ x: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        left-1
        bottom-[18px]
        w-[150px]
        rounded-2xl
        p-3
      "
                  style={{
                    background: "rgba(4,19,45,0.88)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
                  }}
                >

                  <div className="flex items-center gap-2.5">

                    <div
                      className="
            shrink-0
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Code2 className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-white">
                        Smart Solutions
                      </h3>

                      <p className="mt-0.5 text-[9px] leading-4 text-slate-300">
                        Tailored for your business.
                      </p>
                    </div>

                  </div>

                </motion.div>


                {/* =================================================
        MOBILE — GROW TOGETHER
        Right bottom
    ================================================= */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
        absolute
        z-30
        right-1
        bottom-[18px]
        w-[150px]
        rounded-2xl
        p-3
      "
                  style={{
                    background: "rgba(4,19,45,0.88)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
                  }}
                >

                  <div className="flex items-center gap-2.5">

                    <div
                      className="
            shrink-0
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
          "
                      style={{
                        background: "rgba(14,165,233,0.10)",
                        border: "1px solid rgba(56,189,248,0.25)",
                      }}
                    >
                      <Rocket className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-white">
                        Grow Together
                      </h3>

                      <p className="mt-0.5 text-[9px] leading-4 text-slate-300">
                        Grow with confidence.
                      </p>
                    </div>

                  </div>

                </motion.div>


                {/* =================================================
        MOBILE — CONNECT TEXT
    ================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                  }}
                  className="
        absolute
        z-30
        top-[112px]
        left-1/2
        -translate-x-1/2
        text-center
        w-[180px]
      "
                >

                  <h2 className="text-xl font-bold text-white">
                    Let's{" "}
                    <span className="text-cyan-400">
                      Connect
                    </span>
                  </h2>

                  <p className="mt-1 text-[10px] leading-4 text-slate-300">
                    Have a project in mind?
                  </p>

                </motion.div>

              </div>

            </div>
          </div>

        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════
          CONTACT SECTION
          — Left: glassmorphism form card
          — Right: info 2×2 cards + embedded Google Map
      ══════════════════════════════════════════════════════════════ */}
      <section ref={formRef} id="contact-form" className="relative py-16 lg:py-20">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* ──────────────────────────────────────────
                LEFT — Glassmorphism Contact Form Card
            ────────────────────────────────────────── */}
            <div
              className="rounded-2xl p-7 sm:p-9 shadow-2xl"
              style={{
                background: "rgba(6,16,32,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(21,42,80,0.9)",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <h2 className="text-2xl sm:text-[28px] font-extrabold text-white mb-1 tracking-tight">
                Get In Touch
              </h2>
              {/* Cyan underline accent */}
              <div
                className="mb-7 rounded-full"
                style={{
                  width: "44px",
                  height: "3px",
                  background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
                }}
              />

              <form onSubmit={handleSubmit} className="space-y-[14px]">

                {/* Row 1 — Name | Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d6080]" style={{ width: "15px", height: "15px" }} />
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleChange} placeholder="Your Name"
                        className={inp("name")}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d6080]" style={{ width: "15px", height: "15px" }} />
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="Email"
                        className={inp("email")}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d6080]" style={{ width: "15px", height: "15px" }} />
                    <input
                      type="text" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="Phone Number"
                      className={inp("phone")}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>

                {/* Subject */}
                <div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3d6080]" style={{ width: "15px", height: "15px" }} />
                    <input
                      type="text" name="subject" value={formData.subject}
                      onChange={handleChange} placeholder="Subject"
                      className={inp("subject")}
                    />
                  </div>
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <div className="relative">
                    <Edit3 className="absolute left-3 top-[15px] text-[#3d6080]" style={{ width: "15px", height: "15px" }} />
                    <textarea
                      name="message" rows={5} value={formData.message}
                      onChange={handleChange} placeholder="Message"
                      className={`${inp("message")} resize-none pt-[13px]`}
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Banners */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg text-emerald-400 text-xs"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Message sent! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-3 rounded-lg text-red-400 text-xs"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    ✗ Something went wrong. Please try again.
                  </div>
                )}

                {/* Send Message button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-between text-white font-bold text-sm transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "12px",
                    background: "rgba(7,20,40,0.9)",
                    border: "1px solid rgba(28,52,96,0.9)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
                    e.currentTarget.style.background = "rgba(10,30,64,0.95)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(28,52,96,0.9)";
                    e.currentTarget.style.background = "rgba(7,20,40,0.9)";
                  }}
                >
                  <span>{isSubmitting ? "Sending…" : "Send Message"}</span>
                  <Send className="text-cyan-400 group-hover:translate-x-1 transition-transform" style={{ width: "17px", height: "17px" }} />
                </button>

              </form>
            </div>

            {/* ──────────────────────────────────────────
                RIGHT — Info Cards + Google Map
            ────────────────────────────────────────── */}
            <div className="space-y-5">

              {/* Intro text */}
              <p className="text-gray-400 leading-relaxed" style={{ fontSize: "15px" }}>
                Have a project in mind or need expert IT solutions? We're here to help
                you achieve your goals. Get in touch with us today!
              </p>

              {/* 2 × 2 Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Phone, title: "Phone Number", line1: "+91 9235327547" },
                  { Icon: Mail, title: "Email Address", line1: "info@ssdinformatics.com", small: true },
                  { Icon: MessageCircle, title: "Whatsapp", line1: "+91 9235327547" },
                  {
                    Icon: MapPin, title: "Our Office",
                    line1: "SSD Informatics Pvt. Ltd.",
                    multi: ["Sector 5, Gomtinagar,", "Khargapur, Lucknow, UP"],
                  },
                ].map(({ Icon, title, line1, small, multi }) => (
                  <div
                    key={title}
                    className={`flex ${multi ? "items-start" : "items-center"} gap-4 transition-all duration-300 group cursor-default`}
                    style={{
                      padding: "18px 20px",
                      borderRadius: "14px",
                      background: "rgba(6,16,32,0.85)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(21,42,80,0.9)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(21,42,80,0.9)";
                    }}
                  >
                    {/* Icon badge */}
                    <div
                      className="shrink-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.2)",
                      }}
                    >
                      <Icon style={{ width: "20px", height: "20px", color: "#22d3ee" }} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 mt-[1px]">
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "3px" }}>
                        {title}
                      </p>
                      <p style={{ fontSize: small ? "12px" : "13px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.45, wordBreak: small ? "break-all" : "normal" }}>
                        {line1}
                        {multi && multi.map((m, i) => <><br key={i} />{m}</>)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div
                className="overflow-hidden"
                style={{
                  height: "290px",
                  borderRadius: "14px",
                  border: "1px solid rgba(21,42,80,0.9)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                <iframe
                  title="SSD Informatics Private Limited — Gomti Nagar, Lucknow"
                  src="https://maps.google.com/maps?q=Sector+5+Gomti+Nagar+Lucknow+Uttar+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
