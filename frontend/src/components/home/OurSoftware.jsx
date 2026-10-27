import React from "react";
import { ArrowUpRight, Clock3, QrCode, UtensilsCrossed } from "lucide-react";

const products = [
  {
    name: "JifyMenu",
    category: "Digital Menu & Ordering",
    description: "A QR-powered menu and ordering experience for modern restaurants.",
    logo: "/images/jifymenu-logo.png",
    logoAlt: "JifyMenu logo",
    href: "https://www.jifymenu.com/",
    action: "Visit Website",
    kind: "jifymenu",
  },
  {
    name: "SSDTKD",
    category: "Product Preview",
    description: "A new SSD Informatics product is in the works. More details coming soon.",
    logo: "/images/ssdtkd-logo.jpeg",
    logoAlt: "SSDTKD logo",
    kind: "ssdtkd",
  },
];

function JifyMenuPreview() {
  return (
    <div aria-hidden="true" className="relative flex h-48 items-center justify-center">
      <div className="absolute inset-2 rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="absolute right-0 top-5 h-24 w-24 rounded-full border border-cyan-300/15" />
      <div className="relative w-[108px] rotate-[4deg] rounded-[24px] border-[3px] border-slate-500/70 bg-slate-950 p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
        <div className="overflow-hidden rounded-[18px] bg-[#101d32] p-2.5">
          <div className="flex items-center gap-1.5">
            <img src="/images/jifymenu-logo.png" alt="" className="h-4 w-4 rounded-full object-contain" />
            <span className="text-[8px] font-bold text-white">JifyMenu</span>
          </div>
          <div className="mt-2.5 flex h-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-orange-500 to-rose-600 text-2xl shadow-inner">
            🍔
          </div>
          <p className="mt-2 text-[7px] font-semibold text-white">Popular today</p>
          <div className="mt-1 rounded-md border border-white/5 bg-white/[0.04] px-1.5 py-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[6px] text-slate-200">Classic Burger</span>
              <span className="text-[6px] text-cyan-300">₹</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-blue-400/30" />
          </div>
          <div className="mt-1.5 flex justify-center gap-1">
            <span className="h-1 w-5 rounded-full bg-cyan-400/80" />
            <span className="h-1 w-3 rounded-full bg-white/15" />
            <span className="h-1 w-3 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 left-0 inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/15 bg-slate-950/90 px-2.5 py-2 text-[10px] font-semibold text-cyan-100 shadow-lg">
        <QrCode size={14} className="text-cyan-300" />
        Scan to order
      </div>
    </div>
  );
}

function SsdtkdPreview({ logo }) {
  return (
    <div aria-hidden="true" className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-red-400/10 bg-gradient-to-br from-[#111b31] via-[#10172b] to-[#080d19]">
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[14px] border-red-500/10" />
      <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full border border-red-400/15" />
      <div className="absolute right-[-30%] top-1/2 h-[2px] w-[150%] rotate-[-32deg] bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
      <div className="absolute left-[-25%] top-[58%] h-[1px] w-[140%] rotate-[-32deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative w-[128px] overflow-hidden rounded-2xl border border-white/10 bg-black p-2 shadow-[0_18px_40px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.04]">
        <img src={logo} alt="" className="aspect-square w-full object-contain" />
      </div>
      <span className="absolute bottom-3 right-3 rounded-full border border-red-300/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-red-200/90">
        SSDTKD
      </span>
    </div>
  );
}

function ProductCard({ product, index }) {
  const isJifyMenu = product.kind === "jifymenu";

  return (
    <article className={`group relative isolate flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 sm:p-6 ${isJifyMenu ? "border-cyan-400/20 from-[#0b1a31] via-[#0a2140] to-[#061329] hover:border-cyan-300/40 hover:shadow-[0_22px_60px_rgba(6,182,212,0.14)]" : "border-red-400/15 from-[#10192b] via-[#0b1a32] to-[#061329] hover:border-red-300/30 hover:shadow-[0_22px_60px_rgba(239,68,68,0.1)]"}`}>
      <div className={`pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full blur-3xl transition duration-500 ${isJifyMenu ? "bg-cyan-400/10 group-hover:bg-cyan-400/15" : "bg-red-500/10 group-hover:bg-red-500/15"}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex items-center justify-between">
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isJifyMenu ? "text-cyan-300/80" : "text-red-200/80"}`}>
          {isJifyMenu ? "Featured Product" : "Coming Soon"}
        </p>
        <span className="font-mono text-xs text-white/25">0{index + 1}</span>
      </div>

      <div className="relative z-10 mt-3 grid flex-1 grid-cols-[minmax(0,1fr)_112px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_145px] sm:gap-4">
        <div className="min-w-0 py-1">
          <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 shadow-lg ${isJifyMenu ? "h-14 w-14 p-0 sm:h-16 sm:w-16" : "h-14 w-14 p-1 sm:h-16 sm:w-16"}`}>
            <img
              src={product.logo}
              alt={product.logoAlt}
              className={`h-full w-full object-contain ${isJifyMenu ? "scale-[1.4]" : ""}`}
            />
          </div>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">{product.name}</h3>
          <p className={`mt-0.5 text-xs font-semibold sm:text-sm ${isJifyMenu ? "text-cyan-100/80" : "text-red-100/75"}`}>
            {product.category}
          </p>
          <p className="mt-3 max-w-[28rem] text-xs leading-5 text-slate-300/80 sm:text-sm sm:leading-6">
            {product.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {isJifyMenu ? (
              <>
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-1 text-[10px] font-medium text-cyan-100/80">
                  <QrCode size={12} /> QR Menu
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-slate-200/80">
                  <UtensilsCrossed size={12} /> Online Ordering
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-300/15 bg-red-300/[0.06] px-2 py-1 text-[10px] font-medium text-red-100/80">
                <Clock3 size={12} /> Demo Preview
              </span>
            )}
          </div>

          <div className="mt-4">
            {product.href ? (
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:text-sm"
              >
                {product.action}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ) : (
              <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300/70 sm:text-sm">
                More details soon
              </span>
            )}
          </div>
        </div>

        {isJifyMenu ? <JifyMenuPreview /> : <SsdtkdPreview logo={product.logo} />}
      </div>
    </article>
  );
}

function OurSoftware() {
  return (
    <section aria-labelledby="our-software-heading" className="relative overflow-hidden bg-slate-950 py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
            Products We’ve Built
          </span>
          <h2 id="our-software-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">Software</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore digital products created by SSD Informatics.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurSoftware;
