import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Palette,
  MonitorSmartphone,
  Search,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Globe size={32} />,
    title: "Website Development",
    description: "Modern, responsive and SEO-friendly websites.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile App Development",
    description: "Android & iOS applications with modern UI.",
  },
  {
    icon: <Palette size={32} />,
    title: "UI / UX Design",
    description: "Creative and user-friendly interface designs.",
  },
  {
    icon: <MonitorSmartphone size={32} />,
    title: "ERP Software",
    description: "Custom ERP solutions for businesses.",
  },
  {
    icon: <Search size={32} />,
    title: "SEO Optimization",
    description: "Increase your website ranking on Google.",
  },
  {
    icon: <Megaphone size={32} />,
    title: "Digital Marketing",
    description: "Meta Ads, Google Ads and complete marketing.",
  },
];

const ServicesPreview = () => {
  return (
   <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">

  {/* Background Glow */}

  <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

  <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[160px]" />

  {/* Grid */}

  <div className="absolute inset-0 opacity-10">

    <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

  </div>

  <div className="relative max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8 }}
      className="text-center"
    >

      <span className="text-blue-400 font-semibold uppercase tracking-[6px]">
        Our Services
      </span>

      <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
        What We Offer
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-400">
        We provide complete IT solutions to help businesses grow with
        modern technology and digital innovation.
      </p>

    </motion.div>

    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

  {services.map((service, index) => (

    <motion.div

      key={index}

      initial={{ opacity: 0, y: 60 }}

      whileInView={{ opacity: 1, y: 0 }}

      transition={{ delay: index * .15 }}

      viewport={{ once: true }}

      whileHover={{
        y: -12,
      }}

      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"

    >

      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Icon */}

      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 text-blue-400 transition group-hover:scale-110 group-hover:rotate-6">

        {service.icon}

      </div>

      <h3 className="text-2xl font-semibold text-white">

        {service.title}

      </h3>

      <p className="mt-5 leading-8 text-slate-400">

        {service.description}

      </p>

      <Link

        to="/services"

        className="mt-8 inline-flex items-center gap-3 font-medium text-blue-400"

      >

        Learn More

        <ArrowRight
          size={18}
          className="transition group-hover:translate-x-2"
        />

      </Link>

    </motion.div>

  ))}

</div>
<motion.div

initial={{ opacity: 0 }}

whileInView={{ opacity: 1 }}

viewport={{ once: true }}

className="mt-20 flex justify-center"

>

<Link

to="/services"

className="group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,.3)] transition hover:scale-105"

>

Explore All Services

<ArrowRight

size={18}

className="ml-3 inline transition group-hover:translate-x-2"

/>

</Link>

</motion.div>

</div>

</section>
  );
};

export default ServicesPreview;
