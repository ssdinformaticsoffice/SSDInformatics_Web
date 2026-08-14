import React from "react";

const certificates = [
    {
        logo: "/images/Digital-India.png",
    },
    {
        logo: "/images/msme.png",
    },
    {
        logo: "/images/skill-india.png",
    },
     {
        logo: "/images/mca.png",
    },
     {
        logo: "/images/iso.png",
    },
];

function Cirtficates() {
    const infiniteCertificates = [...certificates, ...certificates];

    return (
        <section className="overflow-hidden bg-slate-950 py-10 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">

                {/* Heading */}
                <div className="text-center">
                    <span className="font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Achievements
                    </span>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Our Certificates
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Our certifications and achievements reflect our commitment to
                        quality, innovation, and professional excellence.
                    </p>
                </div>

                {/* Certificate Logo Slider */}
                <div className="relative mt-10 overflow-hidden sm:mt-14">

                    {/* Left Gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-slate-950 to-transparent sm:w-20" />

                    {/* Right Gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-slate-950 to-transparent sm:w-20" />

                    {/* Moving Track */}
                    <div className="certificate-slider-track flex w-max items-center">
                        {infiniteCertificates.map((certificate, index) => (
                            <div
                                key={`${certificate.name}-${index}`}
                                className=" mx-3 flex h-28 w-44 shrink-0 items-center justify-center sm:mx-5 sm:h-32 sm:w-52 lg:w-60 "
                            >
                                <img
                                    src={certificate.logo}
                                    alt={certificate.name}
                                    title={certificate.name}
                                    className=" max-h-24 max-w-full object-contain transition-transform duration-300 hover:sca"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                   .certificate-slider-track {
                     animation: certificateMarquee 25s linear infinite;
                   }

                   /* Hover par slider pause */
                   .certificate-slider-track:hover {
                     animation-play-state: paused;
                   }

                   /* Right to Left movement */
                   @keyframes certificateMarquee {
                     0% {           
                       transform: translateX(0%);
                     }

                     100% {
                       transform: translateX(-50%);
                     }
                   }

                   @media (max-width: 640px) {
                     .certificate-slider-track {
                       animation-duration: 18s;
                     }
                   }
              `}
            </style>

        </section>
    );
}

export default Cirtficates;