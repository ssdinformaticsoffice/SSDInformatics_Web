import {
  ArrowRight,
  PlayCircle,
} from "lucide-react";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function HomePage() {
  const rotation = useMotionValue(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const navigate = useNavigate();

  useAnimationFrame((_, delta) => {
    if (!isPaused) {
      rotation.set(rotation.get() + (delta / 22000) * 360);
    }
  });

  return (
    <section className="relative min-h-screen overflow-hidden">


      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      <div className="absolute -top-15 -left-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10">


        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">


          {/* LEFT */}
          <div className="text-center lg:text-left">


            <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 sm:text-base">
              🚀 Trusted Software Development Company
            </span>


            <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
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


              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/services/website-development")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-600 px-7 py-4 font-semibold text-white transition hover:border-blue-500"
              >
                <PlayCircle size={18} />
                Explore Services
              </button>
            </div>


          </div>


          {/* RIGHT */}
          <div className="flex justify-center -translate-y-9">


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
                style={{ rotate: rotation }}
                className="absolute inset-0"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >

                {/* DOTTED ORBIT */}
                <div className="absolute inset-[7%] rounded-full border-2 border-dashed border-white/20" />


                {/* Website Development - 12 o'clock */}
                <Link
                  to="/services/website-development"
                  className="absolute left-1/2 top-[7%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400 bg-slate-900 shadow-[0_0_20px_#2563eb] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/128/7991/7991055.png"
                      alt="Website Development"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #22d3ee)",
                      }}
                    />

                  </div>
                </Link>


                {/* Mobile App Development - 1:30 */}
                <Link
                  to="/services/mobile-app-development"
                  className="absolute left-[79.3%] top-[20.7%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400 bg-slate-900 shadow-[0_0_20px_rgba(250,204,21,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11796/11796007.png"
                      alt="Mobile App Development"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #fde047)",
                      }}
                    />

                  </div>
                </Link>


                {/* ERP Solutions - 3 o'clock */}
                <Link
                  to="/services/erp-solutions"
                  className="absolute left-[93%] top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400 bg-slate-900 shadow-[0_0_20px_rgba(74,222,128,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5332/5332224.png"
                      alt="ERP Solutions"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #4ade80)",
                      }}
                    />

                  </div>
                </Link>


                {/* UI / UX Design - 4:30 */}
                <Link
                  to="/services/ui-ux-design"
                  className="absolute left-[79.3%] top-[79.3%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lime-400 bg-slate-900 shadow-[0_0_20px_rgba(163,230,53,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/128/7858/7858975.png"
                      alt="UI UX Design"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #a3e635)",
                      }}
                    />

                  </div>
                </Link>


                {/* Digital Marketing - 6 o'clock */}
                <Link
                  to="/services/digital-marketing"
                  className="absolute left-1/2 top-[93%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400 bg-slate-900 shadow-[0_0_20px_rgba(74,222,128,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1968/1968750.png"
                      alt="Digital Marketing"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #4ade80)",
                      }}
                    />

                  </div>
                </Link>


                {/* E-Commerce Development - 7:30 */}
                <Link
                  to="/services/google-ads"
                  className="absolute left-[20.7%] top-[79.3%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500 bg-slate-900 shadow-[0_0_20px_rgba(249,115,22,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2773/2773257.png"
                      alt="Google Ads"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #f97316)",
                      }}
                    />

                  </div>
                </Link>


                {/* Cloud Solutions - 9 o'clock */}
                <Link
                  to="/services/cloud-solutions"
                  className="absolute left-[7%] top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500 bg-slate-900 shadow-[0_0_20px_rgba(34,197,94,0.35)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4760/4760009.png"
                      alt="Cloud Solutions"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(2) invert(1) drop-shadow(0 0 6px #22c55e)",
                      }}
                    />

                  </div>
                </Link>


                {/* Software Solutions - 10:30 */}
                <Link
                  to="/services/seo-optimization"
                  className="absolute left-[20.7%] top-[20.7%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.2)] sm:h-12 sm:w-12 md:h-16 md:w-16">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1688/1688425.png"
                      alt="SEO Optimization"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-10 md:w-10"
                      style={{
                        filter:
                          "brightness(1) invert(1) drop-shadow(0 0 6px #ffffff)",
                      }}
                    />

                  </div>
                </Link>


              </motion.div>
            </div>
          </div>


        </div>
      </div>


    </section>
  );
}


export default HomePage;