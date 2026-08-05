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
    <section className="bg-slate-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="text-center">

          <span className="text-blue-400 font-semibold uppercase tracking-widest">
            Our Services
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            What We Offer
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            We provide complete IT solutions to help businesses grow with
            modern technology and digital innovation.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-14">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition duration-300 group"
            >
              <div className="text-blue-400 mb-6 group-hover:scale-110 transition">
                {service.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {service.description}
              </p>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
