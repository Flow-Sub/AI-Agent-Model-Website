"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import WobbleCard from "@/components/ui/wobble-card";

interface Stat {
  value: string;
  description: string;
  hint?: string;
}

const stats: Stat[] = [
  { value: "60%", description: "Reduction in administrative time", hint: "" },
  { value: "15%", description: "Increase in sales", hint: "" },
  { value: "20 h/m", description: "Saved for a retail business", hint: "" },
  { value: "40%", description: "Less hotel administration workload", hint: "" },
  { value: "25%", description: "Reduction in food waste", hint: "" },
  { value: "2x", description: "Conversions for event managers video brochures", hint: "" },
];

const ImpactSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { margin: "0px 0px -20% 0px", once: true });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const container: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReduced
        ? undefined
        : { staggerChildren: 0.08, delayChildren: 0.2, duration: 0.4, ease: "easeOut" },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* aurora / gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, oklch(0.22 0.07 230 / .6), transparent 60%), radial-gradient(900px 500px at 110% 10%, oklch(0.18 0.06 200 / .55), transparent 60%), radial-gradient(900px 500px at 50% 120%, oklch(0.22 0.08 260 / .45), transparent 60%)",
        }}
      />

      {/* graph paper + vignette */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/20 to-background/60"
      />

      {/* prominent math/graph background */}
      <GraphBackground className="absolute inset-0 z-[1] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm text-white/80 backdrop-blur">
          <span className="size-1.5 rounded-full bg-[oklch(0.55_0.15_220)] shadow-[0_0_12px_currentColor]" />
          Proof in numbers
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
          Our Impact
        </h2>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Measurable results that show how our solutions transform businesses every day.
        </p>
      </motion.div>

      {/* stat cards */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {stats.map((stat) => (
          <motion.article key={stat.description} variants={item} className="group">
            <div className="relative rounded-2xl p-[1px] bg-[radial-gradient(220px_180px_at_0%_0%,#fff,transparent)]/20">
              <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(380px_260px_at_0%_0%,oklch(0.20_0.05_220),oklch(0.08_0_0))] text-white overflow-hidden p-8">
                {/* light sweep */}
                <span className="pointer-events-none absolute -top-16 left-1/3 h-48 w-48 -rotate-12 rounded-full bg-white/15 blur-3xl" />
                <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(45deg,#fff,oklch(0.80_0.07_230),#fff)]">
                  {stat.value}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{stat.description}</p>
                {stat.hint && (
                  <p className="mt-1 text-xs text-white/50">{stat.hint}</p>
                )}

                {/* frame lines */}
                <span className="absolute inset-x-10 top-8 h-px bg-white/10" />
                <span className="absolute inset-x-10 bottom-8 h-px bg-white/5" />
                <span className="absolute inset-y-10 left-10 w-px bg-white/10" />
                <span className="absolute inset-y-10 right-10 w-px bg-white/5" />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* wobble cards row (now with imagery + stronger backgrounds) */}
      <div className="relative z-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          

         

         <div
  className="col-span-1 lg:col-span-3 min-h-[480px] lg:min-h-[440px] xl:min-h-[320px] relative bg-cover bg-center rounded-2xl overflow-hidden"
  style={{ backgroundImage: "url('/impact-bg.webp')" }}
>
  <div className="absolute inset-0 bg-black/60"></div> {/* dark overlay */}

  <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-white p-8">
    <h3 className="text-left text-3xl md:text-4xl font-bold">
      Client Stories
    </h3>
    <p className="italic text-left text-lg text-white/80">
      “These are real people whose businesses—and lives—have been changed by our solutions.”
    </p>

    {/* Grid cards */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all">
        <h4 className="font-bold text-xl mb-2">Samira’s Story</h4>
        <p className="mb-4">
          <span className="font-semibold">Therapy & educational support</span> for her son with Down syndrome.
        </p>
        <blockquote className="italic text-white/70 border-l-4 border-primary pl-4">
          “I felt like someone finally saw us.”
        </blockquote>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all">
        <h4 className="font-bold text-xl mb-2">Houssem’s Journey</h4>
        <p className="mb-4">
          <span className="font-semibold">Medical support</span> while battling cancer, keeping his family afloat.
        </p>
        <blockquote className="italic text-white/70 border-l-4 border-primary pl-4">
          “Your support helped my family stay strong during treatment.”
        </blockquote>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap gap-3 pt-6">
      <a
        href="#support"
        className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm hover:bg-white/15"
      >
        Support Our Mission
      </a>
      <a
        href="#contact"
        className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm hover:bg-white/15"
      >
        Contact Us
      </a>
      <a
        href="#trial"
        className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm hover:bg-white/15"
      >
        Start Free Trial
      </a>
    </div>
  </div>
</div>



        </div>
      </div>
    </section>
  );
};

const GraphBackground: React.FC<{ className?: string }> = ({ className }) => {
  const W = 1440;
  const H = 900;
  const MINOR = 12;  // small boxes
  const MAJOR = 60;  // thicker lines & runners

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Minor grid — SMALL boxes */}
        <pattern id="gridMinor" width={MINOR} height={MINOR} patternUnits="userSpaceOnUse">
          <path d={`M ${MINOR} 0 L 0 0 0 ${MINOR}`} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        </pattern>

        {/* Major grid */}
        <pattern id="gridMajor" width={MAJOR} height={MAJOR} patternUnits="userSpaceOnUse">
          <path d={`M ${MAJOR} 0 L 0 0 0 ${MAJOR}`} stroke="rgba(255,255,255,0.28)" strokeWidth="1.1" />
        </pattern>

        {/* Soft center glow */}
        <radialGradient id="centerGlow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
        </radialGradient>

        {/* Axes color (your primary) */}
        <linearGradient id="axis" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.55 0.15 220)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.55 0.15 220)" stopOpacity="0.6" />
        </linearGradient>

        {/* Strong glow for runners */}
        <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle illumination so boxes pop */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#centerGlow)" />

      {/* Small-box grid */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gridMinor)" />
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gridMajor)" />

      {/* Center axes (static) */}
      <g opacity="0.9" filter="url(#glowStrong)">
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="url(#axis)" strokeWidth="1.5" />
        <line x1={W / 2} y1="0" x2={W / 2} y2={H} stroke="url(#axis)" strokeWidth="1.5" />
      </g>

      {/* ===== RUNNING GLOWING LIGHTS ON THE GRID (reduced density) ===== */}
      {/* Only every 3rd MAJOR line gets a runner + longer segments */}
      <g opacity="0.6" filter="url(#glowStrong)">
        {/* Horizontal runners */}
        {Array.from({ length: Math.ceil(H / MAJOR) + 1 }).map((_, i) => {
          if (i % 3 !== 0) return null;               // << reduced count
          const y = i * MAJOR;
          const k = Math.floor(i / 3);
          const dash = "360 720";                     // << longer light segment + gap
          const duration = 12 + ((k % 3) * 2);        // 12s, 14s, 16s
          const delay = k * 0.6;                      // staggered starts
          return (
            <path
              key={`hr-${i}`}
              d={`M 0 ${y} L ${W} ${y}`}
              fill="none"
              stroke="oklch(0.75 0.16 220)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray={dash}
              pathLength={W}
              opacity="0.9"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to={-W}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* Vertical runners */}
        {Array.from({ length: Math.ceil(W / MAJOR) + 1 }).map((_, i) => {
          if (i % 3 !== 0) return null;               // << reduced count
          const x = i * MAJOR;
          const k = Math.floor(i / 3);
          const dash = "360 720";                     // match horizontal
          const duration = 14 + ((k % 3) * 2);        // 14s, 16s, 18s
          const delay = k * 0.55;
          return (
            <path
              key={`vr-${i}`}
              d={`M ${x} 0 L ${x} ${H}`}
              fill="none"
              stroke="oklch(0.78 0.14 230)"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeDasharray={dash}
              pathLength={H}
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to={-H}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}
      </g>

      {/* (Optional) VERY faint math curves for vibe only (no running lights here) */}
      <g opacity="0.18">
        <path
          d="M 0 450 C 180 350, 360 550, 540 450 S 900 350, 1080 450 S 1260 550, 1440 450"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        <path
          d="M 0 420 C 180 520, 360 460, 540 480 S 900 500, 1080 460 S 1260 430, 1440 440"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
};


export default ImpactSection;
