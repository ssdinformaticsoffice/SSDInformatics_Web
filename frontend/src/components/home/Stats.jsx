import { motion } from "framer-motion";
import { Users, Briefcase, Award, Clock } from "lucide-react";

const Stats = () => {

  const stats = [
    {
      icon: <Briefcase size={35}/>,
      number: "150+",
      title: "Projects Completed"
    },
    {
      icon: <Users size={35}/>,
      number: "100+",
      title: "Happy Clients"
    },
    {
      icon: <Award size={35}/>,
      number: "5+",
      title: "Years Experience"
    },
    {
      icon: <Clock size={35}/>,
      number: "24/7",
      title: "Support Available"
    }
  ];


  return (
    <section className="py-16 sm:py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {
            stats.map((item,index)=>(

              <motion.div

              key={index}

              initial={{
                opacity:0,
                y:40
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              transition={{
                duration:0.5,
                delay:index*0.1
              }}

              viewport={{
                once:true
              }}

              className="
              bg-white 
              rounded-2xl
              shadow-lg
              p-6 sm:p-8
              text-center
              hover:-translate-y-2
              transition
              border
              border-slate-200
              "

              >

                <div className="
                mx-auto
                mb-5
                w-16
                h-16
                flex
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-blue-600
                ">
                    {item.icon}
                </div>


                <h2 className="
                text-3xl sm:text-4xl
                font-bold
                text-blue-900
                ">
                    {item.number}
                </h2>


                <p className="
                mt-3
                text-gray-600
                ">
                    {item.title}
                </p>


              </motion.div>

            ))
          }


        </div>

      </div>

    </section>
  )
}

export default Stats;
