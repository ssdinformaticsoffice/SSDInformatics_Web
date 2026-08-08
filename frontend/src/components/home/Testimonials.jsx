import { motion } from "framer-motion";
import { Quote } from "lucide-react";


const Testimonials = () => {


    const reviews = [

        {
            name: "Rahul Sharma",
            role: "Business Owner",
            text: "SSD Informatics helped us build a professional website with amazing support."
        },

        {
            name: "Priya Singh",
            role: "Startup Founder",
            text: "Their development team delivered our project on time with great quality."
        },

        {
            name: "Amit Verma",
            role: "Company Manager",
            text: "Excellent service and creative solutions. Highly recommended."
        }

    ]


    return (

        <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-850 via-slate-900 to-blue-750">


            <div className="max-w-7xl mx-auto px-4 sm:px-6">


                <div className="text-center mb-12">

                    <h2 className="
text-3xl sm:text-4xl 
font-bold
text-blue-900
">
                        What Our Clients Say
                    </h2>


                    <p className="
text-gray-600
mt-3
">
                        Trusted by businesses worldwide
                    </p>

                </div>



                <div className="
                      grid
                      sm:grid-cols-2 lg:grid-cols-3
                      gap-6 sm:p-8
                      ">


                    {
                        reviews.map((review, index) => (


                            <motion.div

                                key={index}

                                initial={{
                                    opacity: 0,
                                    scale: 0.9
                                }}

                                whileInView={{
                                    opacity: 1,
                                    scale: 1
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2
                                }}

                                viewport={{
                                    once: true
                                }}
                                className="relative group bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-blue-500/10 hover:border-blue-400/30"
                            >


                                <Quote
                                    className="text-blue-600 mb-5"
                                />


                                <p className="
                                         text-white
                                         leading-relaxed
                                         ">
                                    "{review.text}"
                                </p>


                                <h3 className="
                                          mt-6
                                          font-bold
                                          text-blue-900
                                          ">
                                    {review.name}
                                </h3>


                                <span className="
                                             text-sm
                                             text-white/70
                                             ">
                                    {review.role}
                                </span>


                            </motion.div>


                        ))
                    }



                </div>


            </div>


        </section>


    )

}


export default Testimonials;
