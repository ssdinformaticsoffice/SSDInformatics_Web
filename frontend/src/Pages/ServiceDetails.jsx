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
import SEO from "../components/SEO";

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


// ── Dynamic Service Hero Visual ───────────────────────────────────────────────
// Every service gets its own visual language. The layout, center object,
// floating cards and decorative elements change according to the service title.
const getServiceVisualConfig = (title = "") => {
  const name = title.toLowerCase();

  // ── SPECIAL SERVICE VISUALS ───────────────────────────────────────────────
  // These four services have dedicated visuals. All other service visuals stay
  // exactly on the existing configuration below.
  if (name.includes("google") && name.includes("ads")) {
    return {
      type: "google-ads",
      label: "GOOGLE ADS",
      icon: Search,
      center: "Paid Search Growth",
      accent: "from-blue-400 to-cyan-400",
      glow: "bg-blue-500/20",
      cards: [
        { label: "Search Campaigns", icon: Search },
        { label: "High Intent", icon: TrendingUp },
        { label: "Conversions", icon: BarChart },
        { label: "Performance", icon: Zap },
      ],
    };
  }

  if (name.includes("meta") && name.includes("ads")) {
    return {
      type: "meta-ads",
      label: "META ADS",
      icon: Megaphone,
      center: "Social Media Growth",
      accent: "from-indigo-400 to-fuchsia-400",
      glow: "bg-indigo-500/20",
      cards: [
        { label: "Audience Targeting", icon: Users },
        { label: "Creative Ads", icon: Palette },
        { label: "Retargeting", icon: RefreshCw },
        { label: "Ad Analytics", icon: BarChart },
      ],
    };
  }

  if (name.includes("seo") || name.includes("search engine")) {
    return {
      type: "seo-special",
      label: "SEO OPTIMIZATION",
      icon: Search,
      center: "Organic Growth",
      accent: "from-emerald-300 to-cyan-400",
      glow: "bg-emerald-500/20",
      cards: [
        { label: "Keyword Ranking", icon: Search },
        { label: "Organic Traffic", icon: TrendingUp },
        { label: "Technical SEO", icon: Settings },
        { label: "Content Strategy", icon: PenTool },
      ],
    };
  }

  if (name.includes("video") && (name.includes("edit") || name.includes("production"))) {
    return {
      type: "video-editing",
      label: "VIDEO EDITING",
      icon: Video,
      center: "Creative Production",
      accent: "from-fuchsia-400 to-purple-500",
      glow: "bg-fuchsia-500/20",
      cards: [
        { label: "Motion & Effects", icon: Video },
        { label: "Color Grading", icon: Palette },
        { label: "Sound & Music", icon: Music },
        { label: "4K Production", icon: Film },
      ],
    };
  }

  if (name.includes("mobile") || name.includes("app")) {
    return {
      type: "mobile",
      label: "MOBILE APP DEVELOPMENT",
      icon: Smartphone,
      center: "App Experience",
      accent: "from-cyan-400 to-blue-500",
      glow: "bg-cyan-500/20",
      cards: [
        { label: "iOS & Android", icon: Apple },
        { label: "Smooth UX", icon: Smartphone },
        { label: "Push & API", icon: Zap },
        { label: "App Security", icon: Shield },
      ],
    };
  }

  if (name.includes("web") || name.includes("website") || name.includes("frontend")) {
    return {
      type: "web",
      label: "WEB DEVELOPMENT",
      icon: Laptop,
      center: "Digital Experience",
      accent: "from-blue-400 to-indigo-500",
      glow: "bg-blue-500/20",
      cards: [
        { label: "Modern UI", icon: MonitorSmartphone },
        { label: "React & Frontend", icon: Code2 },
        { label: "Responsive", icon: Globe },
        { label: "Scalable Backend", icon: Server },
      ],
    };
  }

  // ── GRAPHIC DESIGN ─────────────────────────────────────────────
  if (name.includes("graphic")) {
    return {
      type: "graphic-design",
      label: "GRAPHIC DESIGN",
      icon: PenTool,
      center: "Creative Branding",
      accent: "from-orange-400 to-pink-500",
      glow: "bg-orange-500/15",
      cards: [
        { label: "Brand Identity", icon: Palette },
        { label: "Logo Design", icon: PenTool },
        { label: "Social Graphics", icon: Camera },
        { label: "Print Design", icon: Layers },
      ],
    };
  }

  if (name.includes("design") || name.includes("ui") || name.includes("ux")) {
    return {
      type: "design",
      label: "UI / UX DESIGN",
      icon: Palette,
      center: "Creative Interface",
      accent: "from-fuchsia-400 to-blue-500",
      glow: "bg-fuchsia-500/15",
      cards: [
        { label: "Wireframes", icon: Layers },
        { label: "Visual System", icon: Palette },
        { label: "User Journey", icon: Users },
        { label: "Prototype", icon: PenTool },
      ],
    };
  }

  if (name.includes("cloud") || name.includes("devops") || name.includes("hosting")) {
    return {
      type: "cloud",
      label: "CLOUD SOLUTIONS",
      icon: Cloud,
      center: "Connected Infrastructure",
      accent: "from-sky-300 to-blue-600",
      glow: "bg-sky-500/20",
      cards: [
        { label: "Cloud Infrastructure", icon: Cloud },
        { label: "Secure Servers", icon: Server },
        { label: "Auto Scaling", icon: TrendingUp },
        { label: "24/7 Reliability", icon: Shield },
      ],
    };
  }

  if (name.includes("marketing") || name.includes("social media")) {
    return {
      type: "marketing",
      label: "DIGITAL MARKETING",
      icon: Megaphone,
      center: "Business Growth",
      accent: "from-blue-400 to-cyan-400",
      glow: "bg-cyan-500/20",
      cards: [
        { label: "Campaigns", icon: Megaphone },
        { label: "Analytics", icon: BarChart },
        { label: "Growth Strategy", icon: TrendingUp },
        { label: "Audience Reach", icon: Users },
      ],
    };
  }

  if (name.includes("seo") || name.includes("search engine")) {
    return {
      type: "seo",
      label: "SEO SERVICES",
      icon: Search,
      center: "Search Visibility",
      accent: "from-emerald-300 to-blue-500",
      glow: "bg-emerald-500/15",
      cards: [
        { label: "Keywords", icon: Search },
        { label: "Rank Growth", icon: TrendingUp },
        { label: "Technical SEO", icon: Settings },
        { label: "Performance", icon: BarChart },
      ],
    };
  }

  if (name.includes("security") || name.includes("cyber")) {
    return {
      type: "security",
      label: "CYBER SECURITY",
      icon: Shield,
      center: "Protected Systems",
      accent: "from-cyan-300 to-blue-600",
      glow: "bg-blue-500/20",
      cards: [
        { label: "Threat Protection", icon: Shield },
        { label: "Secure Access", icon: Lock },
        { label: "Data Security", icon: Database },
        { label: "Live Monitoring", icon: Search },
      ],
    };
  }

  if (name.includes("e-commerce") || name.includes("ecommerce") || name.includes("commerce")) {
    return {
      type: "commerce",
      label: "E-COMMERCE SOLUTIONS",
      icon: ShoppingBag,
      center: "Digital Storefront",
      accent: "from-blue-400 to-violet-500",
      glow: "bg-violet-500/15",
      cards: [
        { label: "Online Store", icon: ShoppingBag },
        { label: "Payments", icon: Zap },
        { label: "Products", icon: Layers },
        { label: "Customer Growth", icon: TrendingUp },
      ],
    };
  }

  if (name.includes("database") || name.includes("backend") || name.includes("api")) {
    return {
      type: "backend",
      label: "BACKEND & DATABASE",
      icon: Database,
      center: "Powerful Backend",
      accent: "from-blue-300 to-cyan-500",
      glow: "bg-cyan-500/15",
      cards: [
        { label: "REST APIs", icon: Code2 },
        { label: "Database", icon: Database },
        { label: "Server Logic", icon: Server },
        { label: "Data Security", icon: Lock },
      ],
    };
  }

  return {
    type: "default",
    label: title.toUpperCase() || "DIGITAL SOLUTIONS",
    icon: Code2,
    center: "Digital Solutions",
    accent: "from-blue-400 to-cyan-400",
    glow: "bg-blue-500/20",
    cards: [
      { label: "Smart Solutions", icon: Lightbulb },
      { label: "Modern Technology", icon: Cpu },
      { label: "Scalable Systems", icon: Layers },
      { label: "Business Growth", icon: TrendingUp },
    ],
  };
};

const ServiceHeroVisual = ({ title }) => {
  const config = getServiceVisualConfig(title);
  const CenterIcon = config.icon;

  const cardPositions = [
    "left-0 top-[6%]",
    "right-0 top-[12%]",
    "left-0 bottom-[10%]",
    "right-0 bottom-[5%]",
  ];

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[680px] overflow-visible sm:h-[500px] lg:h-[540px]">
      {/* 
        Keep the original 680px visual canvas on larger screens, but scale the
        complete visual down on small screens so fixed-size dashboard cards,
        orbit elements, and supporting cards never get cut off horizontally.
      */}
      <div className="absolute left-1/2 top-0 h-[540px] w-[680px] -translate-x-1/2 origin-top scale-[0.48] sm:scale-[0.72] lg:scale-100">
        <div className={`pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full ${config.glow} blur-[110px]`} />

      {/* GOOGLE ADS: paid search campaign dashboard */}
      {config.type === "google-ads" && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[285px] w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-blue-400/25 bg-[#071432]/95 p-5 shadow-[0_25px_80px_rgba(37,99,235,.28)] sm:h-[330px] sm:w-[500px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-300">Google Ads</p>
              <p className="mt-1 text-lg font-bold text-white">Search Campaign</p>
            </div>
            <div className="rounded-xl border border-blue-400/20 bg-blue-400/10 p-3 text-blue-300">
              <Search size={22} />
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-blue-400/15 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] text-emerald-300">
              <span className="rounded bg-emerald-400/10 px-1.5 py-0.5">Sponsored</span>
              <span className="text-slate-500">google.com</span>
            </div>
            <div className="h-2.5 w-3/4 rounded bg-white/25" />
            <div className="mt-2 h-2 w-11/12 rounded bg-white/10" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-blue-400/10 bg-blue-400/5 p-3">
              <p className="text-[10px] text-slate-400">CTR</p>
              <p className="mt-1 text-lg font-bold text-blue-300">8.42%</p>
            </div>
            <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-3">
              <p className="text-[10px] text-slate-400">Leads</p>
              <p className="mt-1 text-lg font-bold text-cyan-300">+64%</p>
            </div>
            <div className="rounded-xl border border-indigo-400/10 bg-indigo-400/5 p-3">
              <p className="text-[10px] text-slate-400">Status</p>
              <p className="mt-1 text-sm font-bold text-emerald-300">LIVE</p>
            </div>
          </div>
          <div className="mt-4 flex h-10 items-end gap-1.5">
            {[35, 48, 42, 64, 58, 78, 70, 92].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600/60 to-cyan-300/80"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* META ADS: social campaign creative + audience insights */}
      {config.type === "meta-ads" && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[285px] w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-indigo-400/25 bg-[#0b1028]/95 p-5 shadow-[0_25px_80px_rgba(99,102,241,.28)] sm:h-[330px] sm:w-[500px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-indigo-300">Meta Ads</p>
              <p className="mt-1 text-lg font-bold text-white">Social Campaign</p>
            </div>
            <div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-3 text-fuchsia-300">
              <Megaphone size={22} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[1.15fr_.85fr] gap-3">
            <div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/10 to-transparent p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-300/70 to-fuchsia-400/70" />
                <div className="h-2 w-20 rounded bg-white/20" />
              </div>
              <div className="h-20 rounded-xl bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/20" />
              <div className="mt-3 h-2 w-4/5 rounded bg-white/20" />
              <div className="mt-2 h-2 w-3/5 rounded bg-white/10" />
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-indigo-400/10 bg-indigo-400/5 p-3">
                <p className="text-[10px] text-slate-400">Reach</p>
                <p className="mt-1 text-xl font-bold text-indigo-300">+78%</p>
              </div>
              <div className="rounded-xl border border-fuchsia-400/10 bg-fuchsia-400/5 p-3">
                <p className="text-[10px] text-slate-400">Engagement</p>
                <p className="mt-1 text-xl font-bold text-fuchsia-300">+52%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-xs text-slate-300">Audience • Retargeting • Creative</span>
            <span className="text-xs font-bold text-emerald-300">ACTIVE</span>
          </div>
        </motion.div>
      )}

      {/* SEO OPTIMIZATION: organic ranking + traffic growth */}
      {config.type === "seo-special" && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[300px] w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-emerald-400/25 bg-[#071a19]/95 p-5 shadow-[0_25px_80px_rgba(16,185,129,.24)] sm:h-[340px] sm:w-[510px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-300">SEO Optimization</p>
              <p className="mt-1 text-lg font-bold text-white">Organic Growth</p>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[.9fr_1.1fr] gap-4">
            <div className="space-y-2">
              {[
                ["01", "SEO Services"],
                ["03", "Web Design"],
                ["07", "Digital Agency"],
                ["12", "Tech Solutions"],
              ].map(([rank, keyword]) => (
                <div key={keyword} className="flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-3 py-2">
                  <span className="text-xs text-slate-300">{keyword}</span>
                  <span className="text-xs font-bold text-emerald-300">#{rank}</span>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Organic Traffic</span>
                <span className="text-xs font-bold text-emerald-300">+64%</span>
              </div>
              <svg viewBox="0 0 220 110" className="mt-3 h-[110px] w-full">
                <defs>
                  <linearGradient id="seoSpecialFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0)" />
                  </linearGradient>
                </defs>
                <path d="M5 92 C35 88 38 72 66 76 C91 80 93 52 120 58 C145 63 151 35 174 40 C193 44 200 22 215 12 L215 105 L5 105 Z" fill="url(#seoSpecialFill)" />
                <path d="M5 92 C35 88 38 72 66 76 C91 80 93 52 120 58 C145 63 151 35 174 40 C193 44 200 22 215 12" fill="none" stroke="rgb(110 231 183)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-center text-[10px] uppercase tracking-[.18em] text-slate-500">
            Technical SEO • Keywords • Content • Links
          </div>
        </motion.div>
      )}

      {/* VIDEO EDITING: creative studio + editing timeline */}
      {config.type === "video-editing" && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[300px] w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-[#120b24]/95 p-5 shadow-[0_25px_80px_rgba(217,70,239,.25)] sm:h-[345px] sm:w-[510px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-fuchsia-300">Video Editing</p>
              <p className="mt-1 text-lg font-bold text-white">Creative Studio</p>
            </div>
            <div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-3 text-fuchsia-300">
              <Video size={22} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[1.2fr_.8fr] gap-3">
            <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-blue-500/10 p-3">
              <div className="relative h-28 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-blue-500/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(217,70,239,.35),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(59,130,246,.3),transparent_42%)]" />
                <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm">
                  <Play size={18} fill="currentColor" />
                </div>
              </div>
              <div className="mt-3 flex gap-1.5">
                {[30, 18, 24, 14, 28, 20].map((w, i) => (
                  <div key={i} style={{ width: `${w}%` }} className="h-2 rounded-full bg-fuchsia-400/40" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-purple-400/10 bg-purple-400/5 p-3">
                <p className="text-[10px] text-slate-400">Timeline</p>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-500" />
                </div>
              </div>
              <div className="rounded-xl border border-blue-400/10 bg-blue-400/5 p-3">
                <p className="text-[10px] text-slate-400">Output</p>
                <p className="mt-1 text-lg font-bold text-blue-300">4K Ready</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-5 text-[10px] uppercase tracking-[.16em] text-slate-400">
            <span>Motion</span><span>Color</span><span>Sound</span>
          </div>
        </motion.div>
      )}

      {/* WEB: browser window + code panel */}
      {config.type === "web" && (
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[230px] w-[330px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-blue-400/30 bg-[#071432] shadow-[0_25px_80px_rgba(37,99,235,0.3)] sm:h-[290px] sm:w-[430px]"
        >
          <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 h-5 flex-1 rounded-md bg-blue-400/10" />
          </div>
          <div className="grid h-full grid-cols-[70px_1fr]">
            <div className="space-y-3 border-r border-white/10 p-3">
              {[1, 2, 3, 4].map((x) => <div key={x} className="h-2 rounded bg-blue-400/20" />)}
            </div>
            <div className="p-5">
              <div className="mb-4 h-7 w-2/3 rounded bg-gradient-to-r from-blue-400/50 to-cyan-400/20" />
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((x) => <div key={x} className="h-16 rounded-xl border border-blue-400/15 bg-blue-400/5" />)}
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2 w-full rounded bg-slate-600/50" />
                <div className="h-2 w-4/5 rounded bg-slate-600/40" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* MOBILE: phone + app cards */}
      {config.type === "mobile" && (
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[320px] w-[175px] -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] border-[5px] border-slate-700 bg-[#020617] p-2 shadow-[0_25px_80px_rgba(34,211,238,0.3)] sm:h-[380px] sm:w-[205px]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.7rem] bg-gradient-to-b from-blue-950 to-[#06152d] p-4">
            <div className="mx-auto mb-7 h-1.5 w-16 rounded-full bg-white/20" />
            <div className="mb-6 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-600/20" />
            <div className="space-y-3">
              <div className="h-4 w-2/3 rounded bg-white/70" />
              <div className="h-2 w-full rounded bg-white/15" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
              {[1, 2, 3].map((x) => <div key={x} className="flex gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-3"><span className="h-7 w-7 rounded-lg bg-cyan-400/20" /><span className="flex-1 h-2 self-center rounded bg-white/15" /></div>)}
            </div>
          </div>
        </motion.div>
      )}

      {/* GRAPHIC DESIGN: creative branding workspace */}
      {config.type === "graphic-design" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 z-20 h-[290px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-orange-400/25 bg-[#160d20]/95 p-5 shadow-[0_25px_80px_rgba(249,115,22,0.2)] sm:h-[340px] sm:w-[500px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-orange-300">
                Graphic Design
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                Creative Workspace
              </p>
            </div>
            <div className="rounded-xl border border-orange-400/20 bg-orange-400/10 p-3 text-orange-300">
              <PenTool size={22} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[.75fr_1.25fr] gap-4">
            <div className="space-y-2">
              {[
                ["01", "Brand"],
                ["02", "Logo"],
                ["03", "Social"],
                ["04", "Print"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-orange-400/10 bg-orange-400/5 px-3 py-2"
                >
                  <span className="text-[10px] font-bold text-orange-300">
                    {num}
                  </span>
                  <span className="text-xs text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-orange-400/15 bg-gradient-to-br from-orange-400/15 via-pink-500/10 to-purple-500/10 p-4">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-400/20 blur-2xl" />
              <div className="relative flex h-full min-h-[145px] items-center justify-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-400/20 to-pink-500/10 shadow-[0_0_45px_rgba(249,115,22,0.2)]">
                  <PenTool size={52} strokeWidth={1.2} className="text-orange-300" />
                  <div className="absolute -right-4 -top-4 h-9 w-9 rounded-lg border border-pink-400/30 bg-pink-400/10" />
                  <div className="absolute -bottom-4 -left-4 h-7 w-7 rounded-md border border-orange-400/30 bg-orange-400/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-5 text-[10px] uppercase tracking-[.16em] text-slate-400">
            <span>Branding</span>
            <span>Visuals</span>
            <span>Creativity</span>
          </div>
        </motion.div>
      )}

      {/* DESIGN: creative canvas */}
      {config.type === "design" && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute left-1/2 top-1/2 z-20 h-[270px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-fuchsia-400/25 bg-[#0b1028]/95 p-4 shadow-[0_25px_80px_rgba(217,70,239,0.2)] sm:h-[320px] sm:w-[480px]">
          <div className="flex gap-2 border-b border-white/10 pb-3"><div className="h-6 w-6 rounded bg-fuchsia-400/20" /><div className="h-2 w-24 self-center rounded bg-white/20" /></div>
          <div className="grid h-[calc(100%-45px)] grid-cols-[55px_1fr_75px] gap-3 pt-4">
            <div className="space-y-3">{[1, 2, 3, 4, 5].map(x => <div key={x} className="h-7 rounded-lg bg-fuchsia-400/10" />)}</div>
            <div className="relative overflow-hidden rounded-xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-400/10 via-blue-500/10 to-transparent"><div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-fuchsia-300/30 bg-fuchsia-400/10 shadow-[0_0_40px_rgba(217,70,239,0.2)]" /></div>
            <div className="space-y-3">{[1, 2, 3].map(x => <div key={x} className="h-10 rounded-lg bg-white/5" />)}</div>
          </div>
        </motion.div>
      )}

      {/* CLOUD: connected infrastructure */}
      {config.type === "cloud" && (
        <div className="absolute inset-0">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -translate-y-1/2 text-sky-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.55)]"><Cloud size={130} strokeWidth={1.1} /></motion.div>
          {["left-[18%] top-[25%]", "right-[17%] top-[25%]", "left-[20%] bottom-[22%]", "right-[18%] bottom-[20%]"].map((pos, i) => <motion.div key={pos} animate={{ y: [0, i % 2 ? -8 : 8, 0] }} transition={{ duration: 3 + i * .4, repeat: Infinity }} className={`absolute ${pos} z-20 flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.12)] sm:h-24 sm:w-24`}><Server size={30} /></motion.div>)}
          <div className="absolute left-1/2 top-[40%] h-[250px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-400/15" />
        </div>
      )}

      {/* MARKETING: growth dashboard */}
      {config.type === "marketing" && (
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="absolute left-1/2 top-1/2 z-20 h-[285px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-cyan-400/20 bg-[#071432]/95 p-6 shadow-[0_25px_80px_rgba(6,182,212,.2)] sm:h-[330px] sm:w-[500px]">
          <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[.2em] text-cyan-300">Campaign Performance</p><p className="mt-2 text-2xl font-bold text-white">+84.6%</p></div><div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><TrendingUp size={24} /></div></div>
          <div className="mt-8 flex h-36 items-end gap-3">{[35, 52, 45, 70, 61, 82, 96, 88, 100].map((h, i) => <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * .07, duration: .5 }} className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600/50 to-cyan-300/80" />)}</div>
          <div className="mt-5 flex justify-between text-[10px] text-slate-500"><span>Reach</span><span>Engagement</span><span>Conversions</span></div>
        </motion.div>
      )}

      {/* SEO: search + ranking rings */}
      {config.type === "seo" && (
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-1/2 top-1/2 z-20 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/5 shadow-[0_0_70px_rgba(52,211,153,.18)] sm:h-60 sm:w-60"><Search size={85} strokeWidth={1} className="text-emerald-300" /></motion.div>
          {["01", "03", "07", "12"].map((n, i) => <motion.div key={n} animate={{ y: [0, i % 2 ? 8 : -8, 0] }} transition={{ duration: 3 + i * .4, repeat: Infinity }} className={`absolute z-30 ${["left-[5%] top-[20%]", "right-[4%] top-[24%]", "left-[5%] bottom-[18%]", "right-[5%] bottom-[16%]"][i]} rounded-xl border border-emerald-400/20 bg-[#071a19]/90 px-4 py-3`}><span className="text-xl font-black text-emerald-300">#{n}</span><span className="ml-2 text-xs text-slate-300">ranking</span></motion.div>)}
        </div>
      )}

      {/* SECURITY: shield command center */}
      {config.type === "security" && (
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-1/2 top-1/2 z-20 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[35%] border border-cyan-300/25 bg-blue-500/10 text-cyan-300 shadow-[0_0_80px_rgba(34,211,238,.2)] sm:h-64 sm:w-64"><Shield size={110} strokeWidth={1} /></motion.div>
          <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
          {[Lock, Database, Search, Server].map((Icon, i) => <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 18 + i * 3, repeat: Infinity, ease: "linear" }} className={`absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2`} style={{ transformOrigin: "center" }}><div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-xl border border-cyan-400/20 bg-[#071432] p-3 text-cyan-300"><Icon size={20} /></div></motion.div>)}
        </div>
      )}

      {/* E-COMMERCE: storefront + product tiles */}
      {config.type === "commerce" && (
        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="absolute left-1/2 top-1/2 z-20 h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-violet-400/20 bg-[#0a1028] p-5 shadow-[0_25px_80px_rgba(139,92,246,.22)] sm:h-[330px] sm:w-[500px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="font-bold text-white">Your Store</span><ShoppingBag className="text-violet-300" size={22} /></div>
          <div className="mt-5 grid grid-cols-3 gap-3">{[1, 2, 3].map(x => <div key={x} className="rounded-2xl border border-violet-400/10 bg-violet-400/5 p-3"><div className="h-20 rounded-xl bg-gradient-to-br from-violet-400/20 to-blue-400/10" /><div className="mt-3 h-2 w-3/4 rounded bg-white/20" /><div className="mt-2 h-2 w-1/2 rounded bg-white/10" /></div>)}</div>
          <div className="mt-5 flex justify-between rounded-xl bg-violet-400/10 p-3"><span className="text-xs text-slate-300">Conversion rate</span><span className="font-bold text-violet-300">8.42%</span></div>
        </motion.div>
      )}

      {/* BACKEND: server stack + API flow */}
      {config.type === "backend" && (
        <div className="absolute inset-0">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-1/2 z-20 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-3 rounded-3xl border border-cyan-400/20 bg-[#071432] p-7 shadow-[0_0_70px_rgba(34,211,238,.18)] sm:h-56 sm:w-56"><div className="flex items-center gap-3"><Server className="text-cyan-300" /><div className="h-2 flex-1 rounded bg-cyan-300/30" /></div><div className="flex items-center gap-3"><Database className="text-blue-300" /><div className="h-2 flex-1 rounded bg-blue-300/30" /></div><div className="flex items-center gap-3"><Code2 className="text-indigo-300" /><div className="h-2 flex-1 rounded bg-indigo-300/30" /></div></motion.div>
          {[["left-[5%] top-[23%]", "GET /api"], ["right-[4%] top-[28%]", "POST /data"], ["left-[7%] bottom-[20%]", "DB QUERY"], ["right-[5%] bottom-[17%]", "AUTH"]].map(([pos, label], i) => <motion.div key={label} animate={{ x: [0, i % 2 ? 8 : -8, 0] }} transition={{ duration: 3 + i * .3, repeat: Infinity }} className={`absolute ${pos} rounded-xl border border-blue-400/20 bg-[#071432]/90 px-4 py-3 text-xs font-bold text-blue-300 shadow-[0_10px_30px_rgba(37,99,235,.15)]`}>{label}</motion.div>)}
        </div>
      )}

      {/* DEFAULT: modular digital core */}
      {config.type === "default" && (
        <motion.div animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-1/2 top-1/2 z-20 flex h-56 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-blue-400/20 bg-[#071432]/90 shadow-[0_25px_80px_rgba(37,99,235,.25)] sm:h-64 sm:w-80"><CenterIcon size={90} strokeWidth={1} className="text-blue-300" /></motion.div>
      )}

      {/* Decorative orbit for every service */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10 sm:h-[390px] sm:w-[390px]"><span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.9)]" /></motion.div>

      {/* Service-specific supporting cards */}
      {config.cards.map((card, index) => {
        const CardIcon = card.icon;
        return (
          <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .25 + index * .12 }} whileHover={{ y: -6, scale: 1.04 }} className={`absolute ${cardPositions[index]} z-30 w-[150px] sm:w-[185px]`}>
            <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-[#071432]/90 p-3 shadow-[0_15px_40px_rgba(2,6,23,.55)] backdrop-blur-xl sm:p-4">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300 sm:h-11 sm:w-11"><CardIcon size={19} /></div>
                <span className="text-xs font-semibold leading-tight text-white sm:text-sm">{card.label}</span>
              </div>
            </div>
          </motion.div>
        );
      })}

        </div>
    </div>
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
    <>
      <SEO
        title={`${service.title} Services | SSD Informatics`}
        description={
          service.description ||
          `Professional ${service.title} services from SSD Informatics.`
        }
        canonical={`https://www.ssdinformatics.com/services/${slug}`}
      />

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
          lg:pt-10
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
                    type="button"
                    onClick={() => {
                      window.location.href = "/services";
                    }}
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
                    type="button"
                    onClick={() => {
                      window.location.href = "/contact";
                    }}
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
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex w-full items-center justify-center lg:justify-end"
              >
                <ServiceHeroVisual title={service.title} />
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
  lg:grid-cols-5
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
    </>
  );
};

export default ServiceDetails;