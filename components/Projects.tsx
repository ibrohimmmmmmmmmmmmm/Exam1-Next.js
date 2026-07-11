"use client";
import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { ExternalLink, Trash2 } from "lucide-react";

export default function Projects({ projects, onDelete, openModal }: any) {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <button type="button" onClick={() => openModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors duration-300 text-sm font-medium">
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any, i: number) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <TiltCard className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-400/30">
              {project.isCustom && (
                <button type="button" onClick={() => onDelete(project.id)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                  <Trash2 size={14} />
                </button>
              )}

              <a href={project.link} target="_blank" rel="noreferrer" className="block h-44 w-full overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </a>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    {project.title.split("").map((ch: string, ci: number) => (
                      <motion.span key={ci} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.02 }} className="inline-block">
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))}
                  </h3>
                  {project.isCustom && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">NEW</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-3">{project.description}</p>
                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">{project.stack.map((tech: string) => (
                    <span key={tech} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">{tech}</span>
                  ))}</div>
                )}
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-emerald-400 text-sm hover:gap-2 transition-all duration-300">View Project <ExternalLink size={14} /></a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
