import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  FaReact,
  FaGithub,
  FaHtml5,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

import { TbTerminal2 } from "react-icons/tb";

function HomePage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">

        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div className="text-center lg:text-left">

            <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 sm:text-base">
              🚀 Trusted Software Development Company
            </span>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Transform Your
              <span className="block text-blue-400">
                Business
              </span>
              With Smart Digital Solutions
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              SSD Informatics helps businesses grow through Website
              Development, Mobile Applications, ERP Software,
              UI/UX Design and Digital Marketing Services.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

              <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700">
                Get Started
                <ArrowRight size={18} />
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-7 py-4 font-semibold text-white transition hover:border-blue-500">
                <PlayCircle size={18} />
                Explore Services
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <div
              className="
                relative
                flex
                aspect-square
                w-[280px]
                items-center
                justify-center

                sm:w-[360px]
                md:w-[460px]
                lg:w-[520px]
                xl:w-[600px]
              "
            >

  {/* CENTER IMAGE */}
   <div
  className="
    absolute z-20
    w-[180px] h-[180px]
    sm:w-[220px] sm:h-[220px]
    md:w-[280px] md:h-[280px]
    lg:w-[320px] lg:h-[320px]
    xl:w-[360px] xl:h-[360px]
    rounded-full overflow-hidden
    border-[4px] sm:border-[5px] lg:border-[6px]
    border-cyan-400
    shadow-[0_0_40px_rgba(59,130,246,0.8)]
    lg:shadow-[0_0_60px_rgba(59,130,246,0.8)]
  "
>
  <img
    src="/images/services/hero_website_development.png"
    alt="Hero"
    className="w-full h-full object-cover"
  />
</div>
                              {/* ROTATING ORBIT */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                {/* Ring */}
                <div className="absolute inset-4 sm:inset-5 md:inset-6 rounded-full border-2 border-dashed border-cyan-300/60" />

                {/* React */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400 bg-slate-900 shadow-[0_0_20px_#2563eb] sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <FaReact className="text-2xl text-cyan-400 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* JavaScript */}
                <div className="absolute right-3 top-[16%] sm:right-5 md:right-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <SiJavascript className="text-2xl text-yellow-300 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* Express */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <SiExpress className="text-2xl text-green-400 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* Node */}
                <div className="absolute bottom-[16%] right-4 sm:right-8 md:right-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lime-400 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <FaNodeJs className="text-2xl text-lime-400 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* Terminal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <TbTerminal2 className="text-2xl text-green-400 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* HTML */}
                <div className="absolute bottom-[16%] left-4 sm:left-8 md:left-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <FaHtml5 className="text-2xl text-orange-500 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* MongoDB */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <SiMongodb className="text-2xl text-green-500 sm:text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* GitHub */}
                <div className="absolute left-4 top-[16%] sm:left-8 md:left-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <FaGithub className="text-2xl text-white sm:text-3xl md:text-4xl" />
                  </div>
                </div>
              </motion.div>
            </div>
                        </div>
          

        </div>
      </div>
    </section>
  );

}

export default HomePage;