import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Image */}
          <div className="relative max-w-2xl mx-auto lg:max-w-none">

            <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>

            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
              alt="About SSD Informatics"
              className="relative w-full h-auto rounded-3xl shadow-2xl"
            />

          </div>

          {/* Right Content */}
          <div>

            <span className="text-blue-400 font-semibold uppercase tracking-widest">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
              We Build Digital Products That Help Businesses Grow
            </h2>

            <p className="text-slate-300 mt-6 leading-7 sm:leading-8 text-base sm:text-lg">
              SSD Informatics is a technology company providing Website
              Development, Mobile Applications, ERP Software, UI/UX Design,
              SEO and Digital Marketing services for startups and businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              <div className="flex items-start gap-3 text-white">
                <CheckCircle className="text-blue-400" size={20} />
                Website Development
              </div>

              <div className="flex items-start gap-3 text-white">
                <CheckCircle className="text-blue-400" size={20} />
                Mobile Apps
              </div>

              <div className="flex items-start gap-3 text-white">
                <CheckCircle className="text-blue-400" size={20} />
                ERP Solutions
              </div>

              <div className="flex items-start gap-3 text-white">
                <CheckCircle className="text-blue-400" size={20} />
                Digital Marketing
              </div>

            </div>

            <Link
              to="/about"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 mt-10 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
            >
              Read More
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutPreview;

