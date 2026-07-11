"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Code2 } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Certificates({ certificates }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert: any, i: number) => (
        <motion.div key={cert.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
          <TiltCard className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-emerald-400/30">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              {cert.icon === "book" && <BookOpen size={20} />}
              {cert.icon === "award" && <Award size={20} />}
              {cert.icon === "code" && <Code2 size={20} />}
            </div>
            <h3 className="font-semibold mb-3">{cert.category}</h3>
            <ul className="text-slate-400 text-sm space-y-1.5">
              {cert.items.map((item: string) => (
                <li key={item} className="flex gap-2"><span className="text-emerald-400">›</span> {item}</li>
              ))}
            </ul>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
