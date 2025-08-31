"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type WobbleCardProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Optional hero/background image for visual punch */
  bgImageSrc?: string;
  /** Optional subtle pattern overlay (set true for extra texture) */
  withNoise?: boolean;
  /** Accent hue (oklch string or hex) for border/shine */
  accent?: string;
  /** Intensify lighting on hover */
  highContrast?: boolean;
};

export const WobbleCard: React.FC<WobbleCardProps> = ({
  children,
  className,
  containerClassName,
  bgImageSrc,
  withNoise = true,
  highContrast = true,
  accent = "oklch(0.55 0.15 220)", // your --primary
}) => {
  const ref = useRef<HTMLElement | null>(null);

  const [hover, setHover] = useState(false);
  const mx = useMotionValue<number>(0);
  const my = useMotionValue<number>(0);

  const x = useSpring(mx, { stiffness: 150, damping: 12, mass: 0.4 });
  const y = useSpring(my, { stiffness: 150, damping: 12, mass: 0.4 });

  const rX = useTransform(y, [-40, 40], [8, -8]); // tilt
  const rY = useTransform(x, [-40, 40], [-8, 8]);

  const translate = useTransform(
   [x, y],
   (vals: number[]) => `translate3d(${vals[0] * 0.25}px, ${vals[1] * 0.25}px, 0)`
 );

  const spotlight = useMemo(
    () =>
      `radial-gradient(180px 180px at var(--px) var(--py), ${accent} / ${
        hover ? (highContrast ? 0.28 : 0.16) : 0.0
      }, transparent 70%)`,
    [accent, hover, highContrast]
  );

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    el.style.setProperty("--px", `${px}px`);
    el.style.setProperty("--py", `${py}px`);
    mx.set(px - rect.width / 2);
    my.set(py - rect.height / 2);
  };

  return (
    <motion.section
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative w-full rounded-2xl will-change-transform",
        "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
        "transition-[box-shadow,outline] duration-200",
        hover && "shadow-[0_30px_80px_rgba(0,0,0,0.55)]",
        containerClassName
      )}
    >
      {/* gradient border with glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl",
          "bg-[conic-gradient(from_180deg_at_50%_50%,transparent,transparent,transparent,oklch(0.55_0.15_220)/40,transparent)]",
          "opacity-60"
        )}
        aria-hidden
      />

      {/* backdrop / color grading */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border",
          "border-white/10 bg-[radial-gradient(140%_100%_at_20%_0%,oklch(0.10_0.02_220)_0%,oklch(0.07_0_0)_30%,oklch(0.05_0_0)_100%)]"
        )}
        style={{
          boxShadow:
            "0 24px 108px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset",
        }}
      >
        {/* background image layer */}
        {bgImageSrc && (
          <motion.img
            src={bgImageSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-[0.24] mix-blend-screen"
            style={{ transform: translate }}
          />
        )}

        {/* spotlight that follows cursor */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: spotlight,
            transition: "opacity 200ms ease",
            opacity: hover ? 1 : 0,
            mixBlendMode: "screen",
          }}
        />

        {/* glossy diagonal shine */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1"
          style={{
            background:
              "linear-gradient(60deg, transparent 45%, rgba(255,255,255,0.12) 50%, transparent 55%)",
            translateY: hover ? "-2px" : "0px",
          }}
        />

        {/* subtle grid for “tech” feel */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(100% 100% at 10% 0%, #000 50%, transparent 100%)",
          }}
        />

        {/* noise / grain */}
        {withNoise && <Noise />}

        {/* content */}
        <motion.div
          style={{ transform: translate }}
          className={cn(
            "relative z-10 p-8 sm:p-10",
            "backdrop-blur-[1px]",
            className
          )}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Noise = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
    style={{
      backgroundImage: "url(/noise.webp)",
      backgroundSize: "240px",
      maskImage: "radial-gradient(120% 120% at 0% 0%, #000 60%, transparent)",
    }}
  />
);

export default WobbleCard;
