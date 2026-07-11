"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";

/**
 * Loading.tsx — a fantastical, lightweight loading screen for Next.js
 * Stack: Next.js (App Router) + Tailwind CSS + Framer Motion + lucide-react
 *
 * WHERE TO PUT THIS FILE:
 *   app/loading.tsx   (Next.js shows this automatically during route
 *                      transitions / suspense boundaries — zero wiring needed)
 *
 * INSTALL:
 *   npm i framer-motion lucide-react
 *
 * Kept intentionally light (few DOM nodes, short animations) since this
 * screen should feel instant, not like a second page.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function Loading() {
  const stars = useMemo(() => {
    const rand = seeded(11);
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 1.4 + 0.6,
      delay: rand() * 4,
      duration: rand() * 2.5 + 2,
    }));
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[480px] overflow-hidden bg-[#060a16] flex items-center justify-center">
      {/* ---------- SKY GRADIENT ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#1c2b52_0%,#0d1530_45%,#060a16_100%)]" />

      {/* ---------- AMBIENT STARS ---------- */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 4px rgba(255,255,255,0.7)",
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ---------- CENTER LOADER ---------- */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* outer glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(110,231,201,0.25) 0%, transparent 70%)",
            }}
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* orbit ring, dashed, slowly rotating */}
          <motion.svg
            className="absolute inset-0"
            viewBox="0 0 112 112"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="56"
              cy="56"
              r="50"
              fill="none"
              stroke="rgba(110,231,201,0.35)"
              strokeWidth="1"
              strokeDasharray="4 7"
            />
          </motion.svg>

          {/* orbiting firefly / star */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute rounded-full bg-emerald-200"
              style={{
                top: "2px",
                left: "50%",
                width: 6,
                height: 6,
                marginLeft: -3,
                boxShadow: "0 0 8px 3px rgba(110,231,201,0.8)",
              }}
            />
          </motion.div>

          {/* inner solid ring */}
          <div className="absolute inset-[14px] rounded-full border border-white/10" />

          {/* moon core, gently breathing */}
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              background:
                "radial-gradient(circle at 38% 35%, #fffdf3 0%, #fdf6df 45%, #f3e8c4 75%, #e9dcae 100%)",
              boxShadow:
                "0 0 30px 6px rgba(253,246,223,0.35), 0 0 60px 18px rgba(253,246,223,0.15)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon
              size={22}
              strokeWidth={1.5}
              className="text-[#3d3419]/70"
            />
          </motion.div>
        </div>

        {/* ---------- LABEL ---------- */}
        <motion.p
          className="mt-7 text-[13px] tracking-[0.35em] uppercase bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-400/60 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading
        </motion.p>

        {/* ---------- DOT TRAIL ---------- */}
        <div className="mt-3 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-emerald-200/80"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
