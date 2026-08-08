import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


const CTA = () => {


    return (

        <section className="
py-16 sm:py-20
bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">


            <div className="
max-w-5xl
mx-auto
px-4 sm:px-6
text-center
text-white
">


                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.6
                    }}

                >


                    <h2 className="
text-3xl sm:text-4xl
md:text-5xl
font-bold
">
                        Ready To Grow Your Business?
                    </h2>


                    <p className="
mt-5
text-blue-100
text-base sm:text-lg
">
                        Let's build powerful digital solutions together with SSD Informatics.
                    </p>



                    <button

                        className="
mt-8
bg-white
text-blue-700
px-7 sm:px-8
py-4
rounded-full
font-semibold
inline-flex
items-center
gap-3
mx-auto justify-center min-h-12
hover:bg-blue-50
transition
"

                    >

                        Get Started

                        <ArrowRight size={20} />

                    </button>


                </motion.div>


            </div>


        </section>

    )

}


export default CTA;


