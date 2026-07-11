"use client";
import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

export default function Skills({ skills }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Object.entries(skills).map(([category, items], i) => (
        <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
          <TiltCard className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-emerald-400/30">
            <h3 className="text-emerald-400 font-semibold mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill: any, si: number) => (
                <motion.span key={skill} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: si * 0.04 }} className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 inline-block">
                  {skill}
                </motion.span>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
