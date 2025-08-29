"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { WobbleCard } from "@/components/ui/wobble-card";

interface Stat {
  value: string;
  description: string;
}

const stats: Stat[] = [
  { value: "500+", description: "Businesses transformed" },
  { value: "24/7", description: "Always-on AI support" },
  { value: "4.9/5", description: "Client satisfaction score" },
  { value: "1000+", description: "AI agents deployed worldwide" },
  { value: "99.9%", description: "Enterprise-grade reliability" },
  { value: "∞", description: "Scalable automations" },
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReduced ? undefined : { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* graph-paper background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      {/* overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-background/60"
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Our Impact</h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Discover the measurable results of our AI automation solutions, trusted by businesses worldwide.
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
            <div className="relative rounded-2xl p-[1px] bg-[radial-gradient(circle_230px_at_0%_0%,#ffffff,#0c0d0d)] shadow-sm">
              <span className="absolute right-[10%] top-[10%] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_10px_#fff] z-20 animate-[moveDot_6s_linear_infinite]" />

              <div className="relative rounded-[16px] border border-[#202222] bg-[radial-gradient(circle_280px_at_0%_0%,#444444,#0c0d0d)] flex flex-col items-center justify-center text-white overflow-hidden p-8">
                {/* ray */}
                <span className="pointer-events-none absolute left-0 top-0 h-[45px] w-[220px] -rotate-[40deg] rounded-full bg-[#c7c7c7] opacity-40 blur-[10px] shadow-[0_0_50px_#fff]" />

                {/* number */}
                <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(45deg,#000_4%,#fff,#000)]">
                  {stat.value}
                </div>

                {/* description */}
                <p className="mt-3 text-sm text-muted-foreground text-center">{stat.description}</p>

                {/* lines */}
                <span className="absolute left-[10%] right-[10%] top-[10%] h-px bg-[linear-gradient(90deg,#888_30%,#1d1f1f_70%)]" />
                <span className="absolute left-[10%] right-[10%] bottom-[10%] h-px bg-[#2c2c2c]" />
                <span className="absolute top-[10%] bottom-[10%] left-[10%] w-px bg-[linear-gradient(180deg,#747474_30%,#222424_70%)]" />
                <span className="absolute top-[10%] bottom-[10%] right-[10%] w-px bg-[#2c2c2c]" />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* wobble cards row */}
      <div className="relative z-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[500px] lg:min-h-[300px]"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold text-white">
                Build AI Agents for Your Business
              </h2>
              <p className="mt-4 text-left text-base text-neutral-200">
                Automate repetitive tasks, scale operations, and deliver better customer experiences with custom AI agents.
              </p>
            </div>
            <img
              src="/ai-agents.webp"
              width={500}
              height={500}
              alt="AI Agents Illustration"
              className="absolute -right-4 lg:-right-[40%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-secondary">
            <h2 className="max-w-80 text-left text-base md:text-xl lg:text-3xl font-semibold text-white">
              24/7 Intelligent Support
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base text-neutral-200">
              Our AI chatbots handle queries any time of day, ensuring your customers always get fast, reliable responses.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold text-white">
                Scalable Automation for Enterprises
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base text-neutral-200">
                From startups to global corporations, our automation frameworks grow with your business—unlocking efficiency at scale.
              </p>
            </div>
            <img
              src="/automation.webp"
              width={500}
              height={500}
              alt="Automation illustration"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveDot {
          0%, 100% { top: 10%; right: 10%; }
          25% { top: 10%; right: calc(100% - 35px); }
          50% { top: calc(100% - 30px); right: calc(100% - 35px); }
          75% { top: calc(100% - 30px); right: 10%; }
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;
