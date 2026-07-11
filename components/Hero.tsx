"use client";
import React from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "./Icons";

export default function Hero({ personalInfo, imageMyself }: any) {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -160]);
  const bubbleY = useTransform(scrollY, [0, 700], [0, 24]);

  const nameContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };
  const charVariant: Variants = {
    hidden: { opacity: 0, y: 10, rotateX: -8 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring" as const, stiffness: 240, damping: 20 } },
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?w=1600&q=80&auto=format&fit=crop')`, y: bgY as any }} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="max-w-4xl mx-auto px-6 py-40 relative text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative w-40 h-40 mx-auto mb-6" style={{ y: bubbleY as any }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 blur-md opacity-30 animate-pulse-slow" />
          <div className="relative w-full h-full rounded-full bg-white/5 border-2 border-emerald-400/25 overflow-hidden">
            <Image src={imageMyself} alt="Profile" width={160} height={160} className="rounded-full object-cover" />
          </div>
        </motion.div>

        <motion.h1 variants={nameContainer} initial="hidden" animate="visible" className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
          {personalInfo.fullName.split("").map((ch: string, i: number) => (
            <motion.span key={i} variants={charVariant} className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-3 text-emerald-300 font-semibold text-xl">
          {personalInfo.role}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="mt-4 text-slate-200 max-w-2xl mx-auto leading-relaxed">
          {personalInfo.tagline}
        </motion.p>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-200">
          <span className="flex items-center gap-2 opacity-90">{/* MapPin is in parent; keep simple text here */}
            {personalInfo.city}, {personalInfo.country}
          </span>
          <span className="opacity-80">•</span>
          <span className="opacity-90">Age {personalInfo.age}</span>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 flex justify-center gap-4">
          <a href="#contact" className="px-6 py-3 rounded-xl bg-emerald-500 text-[#0b1120] font-semibold hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">Get in Touch</a>
          <a href="#projects" className="px-6 py-3 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors duration-300">View Projects</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }} className="mt-8 flex justify-center gap-6 text-slate-200">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-transform"> <GithubIcon /> </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-transform"> <LinkedinIcon /> </a>
          <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-transform"> <InstagramIcon /> </a>
          <a href={personalInfo.telegram} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-transform"> <TelegramIcon /> </a>
        </motion.div>
      </div>

      <div className="absolute -bottom-8 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-8 block">
          <path d="M0,32 C360,96 1080,-32 1440,32 L1440,80 L0,80 Z" fill="#071026" />
        </svg>
      </div>
    </section>
  );
}
