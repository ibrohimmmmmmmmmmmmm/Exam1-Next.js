"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TiltCard from "./TiltCard";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

export default function Projects({ projects, onDelete, openModal, onEdit }: any) {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          onClick={() => openModal()}
          className="group flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.75 text-sm font-semibold text-emerald-300 shadow-[0_12px_40px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500/20"
        >
          <span className="rounded-full bg-emerald-500/15 p-1.5 transition group-hover:scale-110">
            <Pencil size={14} />
          </span>
          {t("projects.add")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any, i: number) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <TiltCard className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:border-emerald-400/30">
              <div className="absolute right-3 top-3 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-emerald-300 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-emerald-500/20"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-red-400 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-red-500/20"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <a href={project.link} target="_blank" rel="noreferrer" className="block h-44 w-full overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </a>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">
                    {project.title.split("").map((ch: string, ci: number) => (
                      <motion.span key={ci} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.02 }} className="inline-block">
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))}
                  </h3>
                  {project.isCustom && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{t("projects.new")}</span>
                  )}
                </div>
                <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
                {project.stack.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">{project.stack.map((tech: string) => (
                    <span key={tech} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">{tech}</span>
                  ))}</div>
                )}
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-emerald-400 transition-all duration-300 hover:gap-2">{t("projects.view")} <ExternalLink size={14} /></a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
