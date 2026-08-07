import { motion } from "framer-motion";

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
   <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">

  {/* Glow */}

  <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

  <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />

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

      <span className="text-blue-400 uppercase tracking-[6px] font-semibold">

        Why Choose Us

      </span>

      <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">

        Why Businesses Trust SSD Informatics

      </h2>

      <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-400">

        We combine creativity, technology and innovation to build
        reliable digital solutions that help businesses grow faster.

      </p>

    </motion.div>
    <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

{features.map((item,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:60}}

whileInView={{opacity:1,y:0}}

transition={{delay:index*.15}}

viewport={{once:true}}

whileHover={{

y:-12,

scale:1.02

}}

className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"

>

{/* Top Border */}

<div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

{/* Glow */}

<div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

{/* Floating Icon */}

<motion.div

whileHover={{

rotate:10,

scale:1.15

}}

className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 text-blue-400"

>

{item.icon}

</motion.div>

<h3 className="text-2xl font-semibold text-white">

{item.title}

</h3>

<p className="mt-5 leading-8 text-slate-400">

{item.description}

</p>

</motion.div>

))}

</div>
<motion.div

initial={{ opacity: 0 }}

whileInView={{ opacity: 1 }}

viewport={{ once: true }}

className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"

>

{[
["100+","Projects"],
["50+","Clients"],
["24/7","Support"],
["99%","Success"],
].map(([number,label])=>(

<div

key={label}

className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"

>

<h3 className="text-5xl font-bold text-blue-400">

{number}

</h3>

<p className="mt-4 text-slate-400">

{label}

</p>

</div>

))}

</motion.div>

</div>

</section>
  );
};

export default WhyChooseUs;
