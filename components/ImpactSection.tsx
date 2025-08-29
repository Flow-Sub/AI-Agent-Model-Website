"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { Users, TrendingUp, Clock, Star, Bot, Zap, LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  title: string;
  description: string;
  value: number;
}

const stats: Stat[] = [
  { icon: Users, title: "500+ Clients", description: "Businesses transformed", value: 500 },
  { icon: TrendingUp, title: "300% ROI", description: "Average return on investment", value: 300 },
  { icon: Clock, title: "24/7 Support", description: "Round-the-clock assistance", value: 24 },
  { icon: Star, title: "4.9/5 Rating", description: "Client satisfaction score", value: 4.9 },
  { icon: Bot, title: "1000+ Agents", description: "AI agents deployed", value: 1000 },
  { icon: Zap, title: "99.9% Uptime", description: "Reliable performance", value: 99.9 },
];

const ImpactSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { margin: "0px 0px -20% 0px", once: true });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReduced
        ? undefined
        : { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background with grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Overlay gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"
      />

      <motion.div
        className="relative max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Our Impact</h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Discover the measurable results of our AI automation solutions, trusted by businesses worldwide.
        </p>
      </motion.div>

      <motion.div
        className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const divisor = stat.title.includes("Rating") ? 5 : stat.title.includes("Uptime") ? 100 : 1000;
          const pct = Math.min((stat.value / divisor) * 100, 100);
          const suffix = stat.title.includes("Rating") ? "/5" : stat.title.includes("Uptime") ? "%" : "+";

          return (
            <motion.article
              key={stat.title}
              variants={item as import("framer-motion").Variants}
              className="group relative rounded-2xl bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-[gradientMove_6s_linear_infinite] opacity-60" />
              <div className="relative p-6 rounded-2xl border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <motion.span
                    aria-label={stat.title}
                    className="text-3xl font-bold tracking-tight"
                    whileInView={prefersReduced ? undefined : { scale: [0.98, 1] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "tween", duration: 0.25 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-muted-foreground">{suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{stat.description}</p>

                <div className="h-2 w-full rounded-full bg-muted overflow-hidden" aria-hidden>
                  <motion.div
                    className="h-full w-0 rounded-full bg-primary/70"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease: "easeOut", delay: 0.05 * i }}
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-[gradientMove_6s_linear_infinite] {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;