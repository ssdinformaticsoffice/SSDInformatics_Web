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
} from "lucide-react";
import axios from "axios";

/* ─────────────────────────────────────────────────────────────────────
   PAGE — Contact
   Matches reference image:
   • Hero: full-width dark tech bg image + left headline + right floating
           glassmorphism icon cards over laptop photo
   • Contact: glassmorphism card (form) | info 2×2 grid + embedded map
─────────────────────────────────────────────────────────────────────── */

const ContactPage = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors,       setErrors]       = useState({});
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
    if (!formData.name.trim())  e.name  = "Name is required";
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
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch { setSubmitStatus("error"); }
    finally  { setIsSubmitting(false); }
  };

  const inp = (field) =>
    `w-full bg-[#0a1628]/80 border ${errors[field] ? "border-red-500/60" : "border-[#1c3460]/80"} text-white placeholder-[#4a6080] text-sm rounded-lg pl-10 pr-4 py-[13px] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-200 backdrop-blur-sm`;

  /* floating card data — 4 icons matching reference */
  const floatCards = [
    { Icon: Code2,       label: "</>",       pos: "top-[8%]  right-[36%]", delay: 0,   dir: -1 },
    { Icon: CloudUpload, label: "Cloud",     pos: "top-[5%]  right-[6%]",  delay: 0.6, dir: 1  },
    { Icon: BarChart2,   label: "Chart",     pos: "top-[46%] right-[30%]", delay: 1.1, dir: 1  },
    { Icon: Globe,       label: "Globe",     pos: "top-[50%] right-[4%]",  delay: 1.6, dir: -1 },
  ];

  return (
    <div className="bg-[#020c1f] text-white font-sans min-h-screen overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          — Dark navy tech bg image, left text, right floating cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "58vh" }}>

        {/* ── Tech background image (laptop, glowing screens) ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* ── Dark overlay — left denser, right semi-transparent ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020c1f] via-[#020c1f]/88 to-[#020c1f]/50" />
        {/* Top & bottom darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020c1f]/60 via-transparent to-[#020c1f]/80" />

        {/* Cyan ambient glow left */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-700/12 rounded-full blur-[150px] pointer-events-none" />
        {/* Right glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Grid dot texture overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── Inner content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 h-full flex items-center py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">

            {/* LEFT — Badge + Headline + Button */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* "HIRE US NOW" pill badge */}
              <div
                className="mb-6 inline-flex items-center px-5 py-[7px] rounded-full backdrop-blur-md"
                style={{
                  border: "1px solid rgba(56,189,248,0.35)",
                  background: "rgba(10,22,52,0.55)",
                }}
              >
                <span className="text-[11px] font-semibold tracking-[0.25em] text-gray-200 uppercase">
                  Hire Us Now
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-extrabold text-white leading-[1.18] tracking-tight mb-7"
                style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
              >
                We Are Always Ready To
                <br />
                Power Your{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #38bdf8 0%, #22d3ee 50%, #67e8f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Digital Future
                </span>
              </h1>

              {/* Get Started button */}
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 font-bold text-white transition-all duration-300 group"
                style={{
                  padding: "13px 28px",
                  borderRadius: "999px",
                  background: "rgba(10,22,52,0.7)",
                  border: "1px solid rgba(30,58,110,1)",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,211,238,0.7)";
                  e.currentTarget.style.background = "rgba(12,28,60,0.85)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,58,110,1)";
                  e.currentTarget.style.background = "rgba(10,22,52,0.7)";
                }}
              >
                Get Started
                <ArrowRight className="w-[17px] h-[17px] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* RIGHT — 4 Floating glassmorphism icon cards over bg image */}
            <div className="relative h-[260px] md:h-[300px] lg:h-[340px]">
              {floatCards.map(({ Icon, label, pos, delay, dir }) => (
                <motion.div
                  key={label}
                  className={`absolute ${pos} z-20`}
                  style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "18px",
                    background: "rgba(8, 18, 42, 0.55)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  animate={{ y: [0, dir * 10, 0] }}
                  transition={{
                    duration: 3.5 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[18px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(34,211,238,0.04) 100%)",
                    }}
                  />
                  <Icon
                    className="relative z-10"
                    style={{ width: "34px", height: "34px", color: "#7dd3fc" }}
                    strokeWidth={1.4}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Bottom-center circular scroll arrow ── */}
        <button
          onClick={scrollToForm}
          aria-label="Scroll to contact"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 hover:scale-110"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "rgba(10,22,52,0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(30,58,110,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#4a6080",
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
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
                  { Icon: Phone,         title: "Phone Number",  line1: "+91 123 456 7890" },
                  { Icon: Mail,          title: "Email Address", line1: "info@ssdinformatics.com", small: true },
                  { Icon: MessageCircle, title: "Whatsapp",      line1: "+91 987 654 3210" },
                  {
                    Icon: MapPin, title: "Our Office",
                    line1: "SSD Informatics Private Limited",
                    multi: ["Sector 5, Gomtinagar,", "Khagarpur, Lucknow, Uttar Pradesh"],
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
