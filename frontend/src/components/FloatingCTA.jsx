import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? Math.round((scrollTop / documentHeight) * 100)
          : 0;

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-5 z-[9998] flex flex-col items-center gap-3 sm:bottom-8 sm:right-7">
      
      {/* Scroll Progress */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`Scroll progress ${scrollProgress} percent. Click to go to top`}
        className="
          group
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-blue-400/30
          bg-slate-950/80
          shadow-[0_0_25px_rgba(59,130,246,0.25)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-cyan-400/60
          hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
        "
      >
        {/* Progress Ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(59,130,246,0.15)"
            strokeWidth="3"
          />

          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-cyan-400"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={
              2 * Math.PI * 20 -
              (scrollProgress / 100) * (2 * Math.PI * 20)
            }
          />
        </svg>

        <span className="relative text-[10px] font-bold text-white">
          {scrollProgress}%
        </span>

        {/* Arrow on hover */}
        <span
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            rounded-full
            bg-slate-950/90
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <ArrowUp size={18} className="text-cyan-300" />
        </span>
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/9235327547"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-green-400/30
          bg-green-500
          text-white
          shadow-[0_0_30px_rgba(34,197,94,0.35)]
          transition-all
          duration-300
          hover:scale-110
          hover:bg-green-400
          hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]
        "
      >
        <MessageCircle size={27} strokeWidth={2.2} />
      </a>
    </div>
  );
};

export default FloatingCTA;