"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  const headerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };
  const headerChar: Variants = {
    hidden: { opacity: 0, y: 10, rotateX: -6 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring" as const, stiffness: 220, damping: 20 } },
  };

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        variants={headerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl font-extrabold text-center mb-12 leading-tight"
      >
        {title.split("").map((ch, i) => (
          <motion.span key={i} variants={headerChar} style={{ display: "inline-block" }} className={i % 2 === 0 ? "gradient-glow" : ""}>
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.h2>

      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {children}
      </motion.div>
    </section>
  );
}
