import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  Loader2,
  Rocket,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  coverLetter: "",
};

// =====================================================
// Job Icon
// =====================================================

const getJobIcon = (job) => {
  const title = job.title?.toLowerCase() || "";
  const department = job.department?.toLowerCase() || "";

  if (
    title.includes("frontend") ||
    title.includes("backend") ||
    title.includes("developer") ||
    department.includes("engineering")
  ) {
    return Code2;
  }

  if (
    title.includes("design") ||
    title.includes("ui") ||
    title.includes("ux")
  ) {
    return Sparkles;
  }

  return BriefcaseBusiness;
};

// =====================================================
// Career Component
// =====================================================

const Career = () => {
  // =====================================================
  // Jobs
  // =====================================================

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  // =====================================================
  // Application
  // =====================================================

  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL ;

  // =====================================================
  // Fetch Open Positions
  // =====================================================

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setJobsLoading(true);
        setJobsError("");

        const response = await axios.get(
          `${API_URL}/careers`
        );

        if (response.data.success) {
          setJobs(response.data.data || []);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Career Fetch Error:", error);

        setJobsError(
          "Unable to load open positions. Please try again later."
        );
      } finally {
        setJobsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // =====================================================
  // Open Application
  // =====================================================

  const openApplication = (job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);

    setForm(initialForm);
    setResume(null);
    setErrors({});
    setSubmitStatus(null);
  };

  // =====================================================
  // Close Application
  // =====================================================

  const closeApplication = () => {
    if (isSubmitting) return;

    setIsApplyOpen(false);

    setTimeout(() => {
      setSelectedJob(null);
      setForm(initialForm);
      setResume(null);
      setErrors({});
      setSubmitStatus(null);
    }, 250);
  };

  // =====================================================
  // Handle Input Change
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
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

  // =====================================================
  // Handle Resume
  // =====================================================

  const handleResume = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Only PDF, DOC or DOCX files are allowed.",
      }));

      setResume(null);
      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resume: "Resume size must be less than 5MB.",
      }));

      setResume(null);
      return;
    }

    setErrors((prev) => ({
      ...prev,
      resume: "",
    }));

    setResume(file);
  };

  // =====================================================
  // Validate Form
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.experience) {
      newErrors.experience = "Please select your experience.";
    }

    if (!resume) {
      newErrors.resume = "Please upload your resume.";
    }

    if (!form.coverLetter.trim()) {
      newErrors.coverLetter =
        "Please tell us a little about yourself.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // Submit Application
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (!selectedJob?._id) {
      setSubmitStatus({
        type: "error",
        message: "Job information is missing. Please try again.",
      });

      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();

      formData.append("jobId", selectedJob._id);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("experience", form.experience);
      formData.append("coverLetter", form.coverLetter);
      formData.append("resume", resume);

      const response = await axios.post(
  `${API_URL}/career-applications`,
  formData
);

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Application submission failed."
        );
      }

      setSubmitStatus({
        type: "success",
        message:
          response.data.message ||
          "Your application has been submitted successfully. Our team will review your application and get back to you soon.",
      });

      setForm(initialForm);
      setResume(null);
      setErrors({});
    } catch (error) {
      console.error("Application Submit Error:", error);

      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

          <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28">
            <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
              {/* Hero Content */}

              <motion.div
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  Careers at SSD Informatics
                </div>

                <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  Your next
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    big opportunity
                  </span>
                  <br />
                  starts here.
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                  Join SSD Informatics and work with a team that builds
                  digital experiences, solves real problems and believes
                  in continuous growth.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#open-positions"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-bold shadow-[0_15px_40px_rgba(6,182,212,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)]"
                  >
                    View Open Positions

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="#life-at-ssd"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-cyan-300"
                  >
                    Life at SSD
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap gap-8 border-t border-slate-800/70 pt-7">
                  <div>
                    <p className="text-2xl font-black">01</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Apply directly
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-black">100%</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Growth mindset
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-black">∞</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Room to grow
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hero Visual */}

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

                <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900/60 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[3px] text-slate-500">
                        We're looking for
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        People who build.
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <BriefcaseBusiness size={20} />
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {jobsLoading && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2
                          size={20}
                          className="animate-spin text-blue-400"
                        />
                      </div>
                    )}

                    {!jobsLoading &&
                      jobs.length > 0 &&
                      jobs.slice(0, 3).map((job, index) => {
                        const Icon = getJobIcon(job);

                        return (
                          <motion.div
                            key={job._id}
                            animate={{
                              y: [0, index === 1 ? -5 : 0, 0],
                            }}
                            transition={{
                              duration: 4 + index,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                              <Icon size={20} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold">
                                {job.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {job.department} · {job.type}
                              </p>
                            </div>

                            <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                          </motion.div>
                        );
                      })}

                    {!jobsLoading && jobs.length === 0 && (
                      <div className="py-8 text-center text-sm text-slate-600">
                        No open positions currently.
                      </div>
                    )}
                  </div>

                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles
                        size={20}
                        className="mt-0.5 shrink-0 text-cyan-300"
                      />

                      <div>
                        <p className="text-sm font-bold">
                          Don't just find a job.
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Find a place where your ideas can actually
                          make a difference.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LIFE AT SSD
        ====================================================== */}

        <section
          id="life-at-ssd"
          className="border-y border-slate-800/60 bg-slate-900/20 px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[3px] text-cyan-400">
                  Life at SSD
                </span>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Work where
                  <br />
                  <span className="text-slate-500">
                    ideas matter.
                  </span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-500">
                We want people to question, experiment, learn and take
                ownership. Your contribution shouldn't disappear into a
                process — it should be visible in what we build.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Rocket,
                  title: "Real Projects",
                  text: "Work on products and solutions that solve actual problems.",
                },
                {
                  icon: UserRound,
                  title: "Ownership",
                  text: "Take responsibility and have a real voice in the work.",
                },
                {
                  icon: Code2,
                  title: "Modern Stack",
                  text: "Learn and work with current technologies and tools.",
                },
                {
                  icon: Sparkles,
                  title: "Keep Learning",
                  text: "Grow through experimentation, collaboration and feedback.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 transition-all duration-300 hover:border-blue-500/20"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-5 font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            JOBS
        ====================================================== */}

        <section
          id="open-positions"
          className="relative px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute left-1/2 top-40 h-96 w-[600px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[3px] text-blue-400">
                  Join the team
                </span>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Open Positions
                </h2>

                <p className="mt-4 max-w-xl text-slate-500">
                  Choose a role, click apply and tell us what you can
                  bring to SSD Informatics.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Applications are open
              </div>
            </div>

            {/* Loading */}

            {jobsLoading && (
              <div className="mt-12 flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/50 py-16">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Loader2
                    size={18}
                    className="animate-spin text-blue-400"
                  />

                  Loading open positions...
                </div>
              </div>
            )}

            {/* Error */}

            {!jobsLoading && jobsError && (
              <div className="mt-12 rounded-3xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
                <p className="text-sm text-red-300">
                  {jobsError}
                </p>
              </div>
            )}

            {/* Empty */}

            {!jobsLoading &&
              !jobsError &&
              jobs.length === 0 && (
                <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
                  <BriefcaseBusiness
                    size={30}
                    className="mx-auto text-slate-600"
                  />

                  <h3 className="mt-4 text-lg font-bold text-slate-300">
                    No Open Positions
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    There are currently no open positions.
                  </p>
                </div>
              )}

            {/* Jobs */}

            {!jobsLoading &&
              !jobsError &&
              jobs.length > 0 && (
                <div className="mt-12 space-y-4">
                  {jobs.map((job, index) => {
                    const Icon = getJobIcon(job);

                    return (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.1,
                        }}
                        className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/25 hover:bg-slate-900/80 sm:p-7"
                      >
                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
                          {/* Icon */}

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/15 bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
                            <Icon size={24} />
                          </div>

                          {/* Job Info */}

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-xl font-bold sm:text-2xl">
                                {job.title}
                              </h3>

                              <span className="rounded-full border border-blue-500/15 bg-blue-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                {job.department}
                              </span>
                            </div>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                              {job.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {(job.skills || []).map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Job Details */}

                          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 pt-5 lg:w-[230px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <MapPin
                                size={14}
                                className="text-blue-400"
                              />

                              {job.location}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <BriefcaseBusiness
                                size={14}
                                className="text-cyan-400"
                              />

                              {job.type}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <UserRound
                                size={14}
                                className="text-blue-400"
                              />

                              {job.experience}
                            </div>
                          </div>

                          {/* Apply */}

                          <button
                            type="button"
                            onClick={() => openApplication(job)}
                            className="group/apply inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(6,182,212,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(6,182,212,0.22)]"
                          >
                            Apply Now

                            <ArrowUpRight
                              size={17}
                              className="transition-transform group-hover/apply:-translate-y-0.5 group-hover/apply:translate-x-0.5"
                            />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
          </div>
        </section>
      </main>

      {/* =====================================================
          APPLICATION MODAL
      ====================================================== */}

      <AnimatePresence>
        {isApplyOpen && selectedJob && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeApplication}
              className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 25,
              }}
              transition={{
                duration: 0.25,
              }}
              className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700/80 bg-[#07101f] shadow-[0_35px_100px_rgba(0,0,0,0.6)]"
              >
                {/* Modal Glow */}

                <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-2/3 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[70px]" />

                {/* Header */}

                <div className="relative flex items-start justify-between border-b border-slate-800 px-5 py-5 sm:px-7">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-cyan-400">
                      <BriefcaseBusiness size={14} />
                      Job Application
                    </div>

                    <h2 className="text-2xl font-black sm:text-3xl">
                      {selectedJob.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedJob.department} ·{" "}
                      {selectedJob.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeApplication}
                    disabled={isSubmitting}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={19} />
                  </button>
                </div>

                {/* Content */}

                <div className="relative max-h-[calc(100vh-150px)] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
                  {submitStatus?.type === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-[400px] flex-col items-center justify-center text-center"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 size={42} />
                      </div>

                      <h3 className="mt-7 text-2xl font-black">
                        Application Submitted
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                        {submitStatus.message}
                      </p>

                      <button
                        type="button"
                        onClick={closeApplication}
                        className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name + Email */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-slate-400">
                            Full Name
                          </label>

                          <div className="relative">
                            <UserRound
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                            />

                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 ${
                                errors.name
                                  ? "border-red-500/40"
                                  : "border-slate-800"
                              }`}
                            />
                          </div>

                          {errors.name && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold text-slate-400">
                            Email Address
                          </label>

                          <div className="relative">
                            <Mail
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                            />

                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 ${
                                errors.email
                                  ? "border-red-500/40"
                                  : "border-slate-800"
                              }`}
                            />
                          </div>

                          {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone + Experience */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-xs font-semibold text-slate-400">
                            Phone Number
                          </label>

                          <div className="relative">
                            <Phone
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                            />

                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className={`w-full rounded-xl border bg-slate-950/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 ${
                                errors.phone
                                  ? "border-red-500/40"
                                  : "border-slate-800"
                              }`}
                            />
                          </div>

                          {errors.phone && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold text-slate-400">
                            Experience
                          </label>

                          <div className="relative">
                            <select
                              name="experience"
                              value={form.experience}
                              onChange={handleChange}
                              className={`w-full appearance-none rounded-xl border bg-slate-950/70 px-4 py-3.5 pr-10 text-sm text-white outline-none transition-all focus:border-blue-500/50 ${
                                errors.experience
                                  ? "border-red-500/40"
                                  : "border-slate-800"
                              }`}
                            >
                              <option value="">
                                Select experience
                              </option>

                              <option value="Fresher">
                                Fresher
                              </option>

                              <option value="0-1 Years">
                                0–1 Years
                              </option>

                              <option value="1-2 Years">
                                1–2 Years
                              </option>

                              <option value="2-4 Years">
                                2–4 Years
                              </option>

                              <option value="4+ Years">
                                4+ Years
                              </option>
                            </select>

                            <ChevronDown
                              size={17}
                              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                            />
                          </div>

                          {errors.experience && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.experience}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Resume */}

                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-400">
                          Resume
                        </label>

                        <label
                          className={`group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed bg-slate-950/50 p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/[0.03] ${
                            errors.resume
                              ? "border-red-500/40"
                              : "border-slate-700"
                          }`}
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResume}
                            className="hidden"
                          />

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            {resume ? (
                              <FileText size={21} />
                            ) : (
                              <Upload size={21} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-300">
                              {resume
                                ? resume.name
                                : "Upload your resume"}
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                              PDF, DOC or DOCX · Maximum 5MB
                            </p>
                          </div>
                        </label>

                        {errors.resume && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.resume}
                          </p>
                        )}
                      </div>

                      {/* Cover Letter */}

                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-400">
                          Tell us about yourself
                        </label>

                        <textarea
                          name="coverLetter"
                          value={form.coverLetter}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Why are you interested in this role?"
                          className={`w-full resize-none rounded-xl border bg-slate-950/70 px-4 py-3.5 text-sm leading-6 text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 ${
                            errors.coverLetter
                              ? "border-red-500/40"
                              : "border-slate-800"
                          }`}
                        />

                        {errors.coverLetter && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.coverLetter}
                          </p>
                        )}
                      </div>

                      {/* Error */}

                      {submitStatus?.type === "error" && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                          {submitStatus.message}
                        </div>
                      )}

                      {/* Submit */}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-[0_15px_35px_rgba(6,182,212,0.12)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(6,182,212,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />

                            Submitting Application...
                          </>
                        ) : (
                          <>
                            Submit Application

                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] leading-5 text-slate-600">
                        By submitting this application, you confirm that
                        the information provided is accurate.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Career;