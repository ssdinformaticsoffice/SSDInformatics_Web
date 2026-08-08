import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900",
    title: "Corporate Website",
    tech: "React • Tailwind CSS • Node.js",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900",
    title: "E-Commerce Platform",
    tech: "MERN Stack",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    title: "ERP Management System",
    tech: "React • Express • MongoDB",
  },
];

const PortfolioPreview = () => {
  return (
    <section className="bg-slate-950 py-16 sm:py-10 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="text-center">

          <span className="text-blue-400 uppercase tracking-widest font-semibold">
            Portfolio
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Our Recent Projects
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Explore some of our successful projects delivered with modern
            technologies and creative solutions.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16">

          {projects.map((project, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition duration-300"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-52 sm:h-60 w-full object-cover"
              />

              <div className="p-5 sm:p-6">

                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {project.title}
                </h3>

                <p className="text-slate-400 mt-3">
                  {project.tech}
                </p>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-blue-400 mt-6 hover:text-blue-300"
                >
                  View Project
                  <ExternalLink size={18} />
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default PortfolioPreview;
