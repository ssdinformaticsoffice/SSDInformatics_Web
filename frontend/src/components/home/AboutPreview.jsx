import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Website Development",
  "Mobile Apps",
  "ERP Solutions",
  "Digital Marketing",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const AboutPreview = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 lg:py-28">
      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none"
        >
          {/* Floating Circle */}

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute -top-4 right-4 h-10 w-10 rounded-full border border-blue-400 bg-blue-500/30 backdrop-blur-xl sm:-top-6 sm:right-6 sm:h-14 sm:w-14"
          ></motion.div>

          {/* Floating Square */}

          <motion.div
            animate={{
              rotate: [0, 180, 360],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
            }}
            className="absolute -left-3 bottom-5 h-12 w-12 rounded-xl border border-cyan-400 bg-cyan-500/20 sm:-left-10 sm:bottom-8 sm:h-16 sm:w-16 sm:rounded-2xl"
          ></motion.div>

          {/* Experience Card */}

          <div className="absolute left-3 top-5 z-20 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl sm:left-6 sm:top-8 sm:px-6 sm:py-5">
            <h3 className="text-xl font-bold text-white sm:text-3xl">
              5+
            </h3>

            <p className="text-xs text-slate-300 sm:text-sm">
              Years Experience
            </p>
          </div>

          {/* Projects Card */}

          <div className="absolute bottom-5 right-3 z-20 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl sm:right-6 sm:bottom-8 sm:px-6 sm:py-5">
            <h3 className="text-xl font-bold text-white sm:text-3xl">
              100+
            </h3>

            <p className="text-xs text-slate-300 sm:text-sm">
              Projects
            </p>
          </div>
                    <motion.div
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              duration: 0.4,
            }}
            className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-[0_0_60px_rgba(59,130,246,.25)]"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
              alt="About"
              className="h-[360px] w-full object-cover transition duration-700 hover:scale-110 sm:h-[450px] lg:h-[600px]"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="text-sm sm:text-base font-semibold uppercase tracking-[4px] sm:tracking-[6px] text-blue-400"
          >
            About Us
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            We Build Digital Products That Help Businesses Grow
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-8 text-slate-300"
          >
            SSD Informatics is a technology company providing Website
            Development, Mobile Applications, ERP Software, UI/UX Design,
            SEO and Digital Marketing services for startups and businesses.
          </motion.p>

          <div className="mt-8 space-y-4 sm:space-y-5">
            {features.map((feature) => (
              <motion.div
                key={feature}
                variants={item}
                whileHover={{
                  x: 8,
                }}
                className="group flex items-center justify-center gap-3 lg:justify-start"
              >
                <CheckCircle className="text-blue-400 transition group-hover:text-cyan-400" />

                <span className="text-base sm:text-lg text-white">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
                    <motion.div variants={item}>
            <Link
              to="/about"
              className="group mt-10 sm:mt-12 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,.35)] transition hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
            >
              Read More

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;