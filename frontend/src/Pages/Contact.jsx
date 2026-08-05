import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log("Submit Clicked");
    const validationErrors = validateForm();
      console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );

      if (res.data.success) {
        setSubmitStatus("success");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0A1628] to-[#020817]"></div>

      <div className="absolute top-[-30%] right-[-20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 58, 138, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 58, 138, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Side - Welcome Section */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">
                  Welcome to
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight break-words">
                Let's Build
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                  Something Together
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
                Get in touch with us for partnerships, support, or general
                inquiries.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group min-w-0">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors break-words">
                    hello@ssdinformatics.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group min-w-0">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors break-words">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group min-w-0">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors break-words">
                    123 Tech Park, Silicon Valley
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Availability */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-5 sm:gap-6 pt-4">
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <div className="flex w-full sm:w-auto flex-wrap items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-2xl sm:rounded-full">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                </div>
                <span className="text-green-400 text-sm font-medium">
                  Available
                </span>
                <span className="text-green-400/60 text-xs">
                  • Usually responds in 2 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-0 hover:opacity-20 blur-xl transition-opacity duration-500"></div>

              <div className="relative">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.name ? "border-red-500/50" : "border-white/10"
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-blue-400">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.email ? "border-red-500/50" : "border-white/10"
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-blue-400">*</span>
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.phone ? "border-red-500/50" : "border-white/10"
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reason for Reaching Out{" "}
                      <span className="text-blue-400">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.subject ? "border-red-500/50" : "border-white/10"
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none`}
                    >
                      <option value="" className="bg-[#0A1628]">
                        Select a reason
                      </option>
                      <option value="sales" className="bg-[#0A1628]">
                        Sales
                      </option>
                      <option value="support" className="bg-[#0A1628]">
                        Support
                      </option>
                      <option value="careers" className="bg-[#0A1628]">
                        Careers
                      </option>
                      <option value="partnership" className="bg-[#0A1628]">
                        Partnership
                      </option>
                      <option value="general" className="bg-[#0A1628]">
                        General Inquiry
                      </option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.message ? "border-red-500/50" : "border-white/10"
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                      placeholder="Tell us how we can help..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm backdrop-blur-sm flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Thank you! We'll get back to you within 24 hours.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm backdrop-blur-sm">
                      ✗ Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full min-h-12 flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <span className="relative flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-gray-500 text-xs">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

