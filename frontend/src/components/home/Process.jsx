import {
  ClipboardList,
  Lightbulb,
  PenTool,
  Code2,
  Bug,
  Rocket,
} from "lucide-react";

const process = [
  {
    icon: <ClipboardList size={30} />,
    title: "Requirement",
    description: "We understand your business goals and project requirements.",
  },
  {
    icon: <Lightbulb size={30} />,
    title: "Planning",
    description: "Our team creates a clear roadmap for development.",
  },
  {
    icon: <PenTool size={30} />,
    title: "UI / UX Design",
    description: "Creative and user-friendly designs are prepared.",
  },
  {
    icon: <Code2 size={30} />,
    title: "Development",
    description: "Our developers build secure and scalable solutions.",
  },
  {
    icon: <Bug size={30} />,
    title: "Testing",
    description: "Every feature is tested for quality and performance.",
  },
  {
    icon: <Rocket size={30} />,
    title: "Deployment",
    description: "Project goes live with complete support and monitoring.",
  },
];

const Process = () => {
  return (
    <section className="py-16 sm:py-10 lg:py-15 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="text-center">

          <span className="text-blue-400 uppercase font-semibold tracking-widest">
            Development Process
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            How We Work
          </h2>

          <p className="text-slate-400 mt-5 max-w-3xl mx-auto">
            We follow a structured development process to deliver
            high-quality digital solutions on time.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16">

          {process.map((step, index) => (

            <div
              key={index}
              className="relative bg-slate-800 rounded-2xl border border-slate-700 p-6 sm:p-8 hover:border-blue-500 transition duration-300"
            >

              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <div className="text-blue-400 mt-6 mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Process;
