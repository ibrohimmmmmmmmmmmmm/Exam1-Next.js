"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Experience({ experience }: any) {
  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto">
      {experience.map((exp: any, i: number) => (
        <motion.div key={`${exp.role}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-emerald-400/30 transition-colors duration-300">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
            {exp.icon === "briefcase" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-2 justify-between">
              <h3 className="font-semibold">{exp.role}</h3>
              <span className="text-xs text-slate-500">{exp.period}</span>
            </div>
            <p className="text-emerald-400 text-sm mt-0.5">{exp.place}</p>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
