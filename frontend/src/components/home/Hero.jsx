import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side */}
          <div>

            {/* Badge */}
            <span className="inline-flex max-w-full items-center px-4 py-2 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500 text-xs sm:text-sm font-medium">
              🚀 Trusted IT Solutions Company
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white break-words">
              Transform Your Business With
              <span className="text-blue-400"> Smart Digital Solutions</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-7 sm:leading-8">
              SSD Informatics helps businesses grow through Website
              Development, Mobile Applications, ERP Software,
              UI/UX Design and Digital Marketing Services.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">

              <button className="flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl transition">
                Get Started
                <ArrowRight size={18} />
              </button>

              <button className="flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 border border-slate-500 text-white hover:border-blue-500 px-7 py-3 rounded-xl transition">
                <PlayCircle size={18} />
                Our Services
              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-14">

              <div>
                <h2 className="text-3xl font-bold text-blue-400">100+</h2>
                <p className="text-slate-400 mt-2">Projects</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-400">50+</h2>
                <p className="text-slate-400 mt-2">Happy Clients</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-400">24/7</h2>
                <p className="text-slate-400 mt-2">Support</p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative mt-4 lg:mt-0">

            <div className="absolute -top-10 -left-10 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-400/20 rounded-full blur-3xl"></div>

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000"
              alt="SSD Informatics"
              className="relative w-full h-auto max-h-[420px] rounded-3xl shadow-2xl border border-slate-700 object-cover"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
