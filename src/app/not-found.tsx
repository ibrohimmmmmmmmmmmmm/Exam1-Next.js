"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Sparkles, Compass, Moon } from "lucide-react";


const NAV_LINKS = ["Home", "About", "Service", "Portfolio", "Contact"];

// Deterministic-ish pseudo random so stars/fireflies don't reshuffle on every render
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function NotFound() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const stars = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      top: rand() * 62,
      left: rand() * 100,
      size: rand() * 1.6 + 0.6,
      delay: rand() * 5,
      duration: rand() * 3 + 2,
    }));
  }, []);

  const fireflies = useMemo(() => {
    const rand = seeded(7);
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: 45 + rand() * 40,
      left: rand() * 100,
      delay: rand() * 4,
      duration: rand() * 6 + 6,
      drift: (rand() - 0.5) * 60,
    }));
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#060a16] font-sans select-none">
      {/* ---------- SKY GRADIENT ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#1c2b52_0%,#0d1530_45%,#060a16_100%)]" />

      {/* ---------- STARS ---------- */}
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
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
            }}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* shooting star */}
        <motion.div
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-emerald-100 to-transparent"
          style={{ top: "12%", left: "-10%", rotate: 18 }}
          animate={{ left: ["-10%", "120%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeIn",
          }}
        />
      </div>

      {/* ---------- MOON ---------- */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "16%",
          left: "58%",
          width: 92,
          height: 92,
          background:
            "radial-gradient(circle at 38% 35%, #fffdf3 0%, #fdf6df 40%, #f3e8c4 75%, #e9dcae 100%)",
          boxShadow:
            "0 0 60px 18px rgba(253,246,223,0.35), 0 0 120px 40px rgba(253,246,223,0.15)",
          x: mouse.x * -8,
          y: mouse.y * -6,
        }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ---------- FAR MOUNTAINS (parallax) ---------- */}
      <motion.svg
        className="absolute bottom-[30%] left-0 w-full h-[26%] opacity-60"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ x: mouse.x * -6 }}
      >
        <path
          d="M0,160 L120,90 L260,150 L380,60 L520,130 L680,40 L820,120 L980,70 L1120,140 L1200,110 L1200,200 L0,200 Z"
          fill="#1b2747"
        />
      </motion.svg>

      {/* ---------- NEAR TREE LINE (parallax) ---------- */}
      <motion.svg
        className="absolute bottom-[29%] left-0 w-full h-[10%]"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ x: mouse.x * -14 }}
      >
        <path
          d="M0,60 L0,40 Q30,10 60,40 Q90,15 120,40 Q150,5 180,40 Q210,20 240,40 L240,60 Z"
          fill="#0b1226"
        />
        <path
          d="M900,60 L900,35 Q935,8 970,35 Q1005,12 1040,35 Q1075,15 1110,35 Q1145,5 1180,35 L1200,60 Z"
          fill="#0b1226"
        />
      </motion.svg>

      {/* ---------- WATER / LAKE ---------- */}
      <div className="absolute bottom-0 left-0 w-full h-[28%] bg-gradient-to-b from-[#0c1730] to-[#050813] overflow-hidden">
        {/* moon reflection */}
        <div
          className="absolute rounded-full blur-sm opacity-30"
          style={{
            top: "-6%",
            left: "56%",
            width: 92,
            height: 60,
            background:
              "radial-gradient(ellipse at center, #fdf6df 0%, transparent 70%)",
          }}
        />
        {/* subtle ripple lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute left-0 w-full h-px bg-white/5"
            style={{ top: `${18 + i * 16}%` }}
            animate={{ opacity: [0.05, 0.18, 0.05] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* ---------- FIREFLIES ---------- */}
      {fireflies.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full bg-emerald-200"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: 3,
            height: 3,
            boxShadow: "0 0 6px 2px rgba(110,231,201,0.7)",
          }}
          animate={{
            x: [0, f.drift, 0],
            y: [0, -18, 0, 12, 0],
            opacity: [0.2, 0.9, 0.3, 0.9, 0.2],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ---------- WINDMILL + REFLECTION ---------- */}
      <div
        className="absolute bottom-[26%] right-[10%] flex flex-col items-center"
        style={{ transform: `translate(${mouse.x * 6}px, ${mouse.y * 4}px)` }}
      >
        <Windmill />
        <div className="scale-y-[-1] opacity-25 blur-[1px] -mt-2">
          <Windmill reflection />
        </div>
      </div>

      {/* ---------- NAVBAR ---------- */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <ul className="flex items-center gap-8 rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md">
          {NAV_LINKS.map((link, i) => (
            <li key={link}>
              <Link
                href="/"
                className={`text-[13px] tracking-wide transition-colors ${
                  i === 0
                    ? "text-emerald-200"
                    : "text-slate-300/80 hover:text-emerald-200"
                }`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- HERO CONTENT ---------- */}
      <div className="relative z-10 h-full flex items-center px-10 md:px-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-3 text-emerald-300/70 text-xs tracking-[0.3em] uppercase"
          >
            <Moon size={14} strokeWidth={1.5} />
            <span>Lost between the stars</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[6.5rem] md:text-[8rem] leading-none font-semibold bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-400/60 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(110,231,201,0.25)]"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-2 text-lg md:text-xl font-medium tracking-[0.15em] text-slate-100/90"
          >
            PAGE NOT FOUND
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm"
          >
            The path you followed faded into the night. The windmill still
            turns, the lake still listens — but this page drifted somewhere
            else entirely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9"
          >
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(110,231,201,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-full"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-200/90 px-7 py-3 text-sm font-medium tracking-wide text-[#0a1a1a] transition-shadow"
              >
                <Home size={16} strokeWidth={2} />
                Return home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------- DECORATIVE CORNER SPARKLE ---------- */}
      <motion.div
        className="absolute bottom-8 right-10 text-emerald-200/70"
        animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={26} strokeWidth={1.4} />
      </motion.div>

      {/* ---------- BOTTOM LEFT DOT NAV (decorative) ---------- */}
      <div className="absolute bottom-8 left-10 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-200/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
      </div>

      {/* ---------- COMPASS WATERMARK ---------- */}
      <motion.div
        className="absolute top-10 right-10 text-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Compass size={40} strokeWidth={1} />
      </motion.div>
    </div>
  );
}

/**
 * The windmill: a tower with four rotating blades and a warm lantern glow.
 * Rendered twice — once normal, once flipped + faded for the water reflection.
 */
function Windmill({ reflection = false }) {
  return (
    <div className="relative w-[110px] h-[220px]">
      <svg
        viewBox="0 0 110 220"
        width="110"
        height="220"
        className="overflow-visible"
      >
        {/* tower */}
        <path
          d="M46 220 L50 70 Q55 60 60 70 L64 220 Z"
          fill="#0a1120"
          stroke="#161f36"
          strokeWidth="0.5"
        />
        {/* roof cap */}
        <path d="M47 70 Q55 52 63 70 Z" fill="#141c33" />

        {/* windows (lantern glow) */}
        {!reflection && (
          <>
            <motion.rect
              x="52"
              y="96"
              width="6"
              height="8"
              rx="1"
              fill="#ffcf85"
              animate={{ opacity: [0.5, 1, 0.6, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,190,110,0.85))" }}
            />
            <motion.rect
              x="51.5"
              y="150"
              width="7"
              height="9"
              rx="1"
              fill="#ffcf85"
              animate={{ opacity: [0.6, 1, 0.5, 1] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,190,110,0.85))" }}
            />
            <motion.rect
              x="49"
              y="190"
              width="12"
              height="14"
              rx="1"
              fill="#ffd79a"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 10px rgba(255,200,120,0.9))" }}
            />
          </>
        )}

        {/* blade hub */}
        <circle cx="55" cy="66" r="3" fill="#0a1120" />

        {/* rotating blades group */}
        <motion.g
          style={{ originX: "55px", originY: "66px" }}
          animate={{ rotate: reflection ? -360 : 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 55 66)`}>
              <path
                d="M55 66 L52 20 Q55 12 58 20 L55 66 Z"
                fill="#0d1526"
                stroke="#1b2745"
                strokeWidth="0.5"
              />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

/**
 * PAGES ROUTER NOTE:
 * If you're on the Pages Router instead of App Router, save this file as
 * pages/404.jsx and Next.js will use it automatically the same way —
 * no code changes needed, the default export is already what Next.js expects.
 */
