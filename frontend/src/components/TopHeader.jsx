import React from "react";
import { Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="w-full bg-[#020a1b] border-b border-cyan-400/10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            flex min-h-[62px]
            items-center justify-between
            gap-4 py-3
          "
        >
          {/* ================= LEFT ================= */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">

            {/* Phone */}
            <a
              href="tel:+919235357547"
              className="
                group flex shrink-0 items-center gap-2.5
                text-[13px] sm:text-[14px]
                font-medium text-slate-300
                transition-all duration-300
                hover:text-white
              "
            >
              <span
                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full
                  border border-cyan-400/30
                  bg-cyan-400/10
                  text-[#20d4ff]
                  transition-all duration-300
                  group-hover:border-cyan-400/60
                  group-hover:bg-cyan-400/15
                  group-hover:shadow-[0_0_16px_rgba(32,212,255,0.22)]
                "
              >
                <Phone size={16} strokeWidth={2.2} />
              </span>

              <span className="whitespace-nowrap md:inline hidden">
                +91 9235327547
              </span>
            </a>

            {/* Divider */}
            <span
              className="
                hidden sm:block
                h-6 w-px
                bg-cyan-400/15
              "
            />

            {/* Email */}
            <a
              href="mailto:ssdinformatics.office@gmail.com"
              className="
                group flex min-w-0 items-center gap-2.5
                text-[13px] sm:text-[14px]
                font-medium text-slate-300
                transition-all duration-300
                hover:text-white
              "
            >
              <span
                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full
                  border border-cyan-400/30
                  bg-cyan-400/10
                  text-[#20d4ff]
                  transition-all duration-300
                  group-hover:border-cyan-400/60
                  group-hover:bg-cyan-400/15
                  group-hover:shadow-[0_0_16px_rgba(32,212,255,0.22)]
                "
              >
                <Mail size={16} strokeWidth={2.2} />
              </span>

              <span
                className="
                  block
                  max-w-[145px]
                  truncate
                  sm:max-w-none
                  md:inline hidden
                "
              >
                ssdinformatics.office@gmail.com
              </span>
            </a>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex shrink-0 items-center gap-2.5">

            {/* Follow Us */}
            <span
              className="
                mr-1 hidden
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-slate-400
                md:block
              "
            >
              Follow Us
            </span>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/5
                text-cyan-300
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-cyan-400/60
                hover:bg-cyan-400/15
                hover:text-[#20d4ff]
                hover:shadow-[0_0_18px_rgba(32,212,255,0.22)]
              "
            >
              <FaFacebookF size={15} />
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/5
                text-cyan-300
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-cyan-400/60
                hover:bg-cyan-400/15
                hover:text-[#20d4ff]
                hover:shadow-[0_0_18px_rgba(32,212,255,0.22)]
              "
            >
              <FaInstagram size={16} />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/5
                text-cyan-300
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-cyan-400/60
                hover:bg-cyan-400/15
                hover:text-[#20d4ff]
                hover:shadow-[0_0_18px_rgba(32,212,255,0.22)]
              "
            >
              <FaLinkedinIn size={15} />
            </a>

            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/5
                text-cyan-300
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-cyan-400/60
                hover:bg-cyan-400/15
                hover:text-[#20d4ff]
                hover:shadow-[0_0_18px_rgba(32,212,255,0.22)]
              "
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
