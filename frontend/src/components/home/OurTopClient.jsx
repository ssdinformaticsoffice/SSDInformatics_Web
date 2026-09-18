import React from "react";

const clients = [
    {
        name: "Social Asana",
        logo: "/images/social asana1.png",
        category: "Digital Marketing & Creative Solutions",
        path: "https://socialasana.com/",
    },
    {
        name: "Son Agni",
        logo: "/images/Agni Logo.png",
        category: "Security Guards",
        path: "https://sonagni.com/", // apna actual link lagana
    },
    {
        name: "Navgatee Automobiles",
        logo: "/images/navgatee.png",
        category: "Automobile Industry",
        path: "https://navgatee.com/", // apna actual link lagana
    },
];

function OurTopClient() {
    const infiniteClients = [...clients, ...clients];

    return (
        <section className="overflow-hidden bg-slate-950 py-10 sm:py-12 lg:py-15">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">

                {/* Heading */}
                <div className="text-center">
                    <span className="font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Our Clients
                    </span>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Our Top Clients
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        We are proud to work with amazing businesses and organizations,
                        helping them build strong digital experiences and achieve their goals.
                    </p>
                </div>

                {/* Logo Slider */}
                <div className="relative mt-12 overflow-hidden sm:mt-16">

                    {/* Left Gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-24" />

                    {/* Right Gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-24" />

                    {/* Moving Track */}
                    <div className="client-slider-track flex w-max items-center">
                        {infiniteClients.map((client, index) => (
                            <div
                                key={`${client.name}-${index}`}
                                className=" mx-2 flex h-20 w-40 shrink-0 items-center justify-center sm:mx-4 sm:h-32 sm:w-52 lg:w-60 bg-white object-c                "
                            >
                                <a
                                    href={client.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center"
                                >
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        title={client.category}
                                        className="
                      max-h-24
                      max-w-full
                      object-contain
                      transition-transform
                      duration-300
                      hover:scale-105
                    "
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .client-slider-track {
          animation: clientMarquee 25s linear infinite;
        }

        .client-slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes clientMarquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .client-slider-track {
            animation-duration: 18s;
          }
        }
      `}</style>
        </section>
    );
}

export default OurTopClient;