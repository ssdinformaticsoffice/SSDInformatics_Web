import {
  ShieldCheck,
  Clock3,
  Users,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={35} />,
    title: "Quality Assurance",
    description:
      "We deliver secure, scalable and high-quality software solutions.",
  },
  {
    icon: <Clock3 size={35} />,
    title: "On-Time Delivery",
    description:
      "Projects are completed within the committed timeline.",
  },
  {
    icon: <Users size={35} />,
    title: "Expert Team",
    description:
      "Experienced developers, designers and digital marketing experts.",
  },
  {
    icon: <BadgeCheck size={35} />,
    title: "Customer Satisfaction",
    description:
      "We focus on long-term relationships and client success.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Heading */}

        <div className="text-center">

          <span className="text-blue-400 uppercase font-semibold tracking-widest">
            Why Choose Us
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 leading-tight">
            Why Businesses Trust SSD Informatics
          </h2>

          <p className="text-slate-400 mt-5 max-w-3xl mx-auto">
            We combine creativity, technology and innovation to build
            reliable digital solutions that help businesses grow faster.
          </p>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 sm:mt-16">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-blue-400 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
