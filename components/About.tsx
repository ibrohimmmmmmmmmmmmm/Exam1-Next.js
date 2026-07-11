"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About({ aboutText, img2 }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-48 h-56 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 relative overflow-hidden"
      >
        <motion.div animate={{ rotate: [0, 2, -1, 0], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-2xl p-1">
          <Image src={img2} alt="About" width={192} height={224} className="rounded-2xl object-cover w-full h-full" />
        </motion.div>
      </motion.div>

      <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-slate-400 leading-relaxed">
        {aboutText}
      </motion.p>
    </div>
  );
}
