"use client";
import React from "react";

export default function Contact({ contactLinks }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {contactLinks.map((c: any) => (
        <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 hover:border-emerald-400/40 hover:-translate-y-0.5 transition-all duration-300 text-slate-300 sine-float">
          <span className="text-emerald-400">{c.icon}</span>
          <span className="text-sm truncate">{c.label}</span>
        </a>
      ))}
    </div>
  );
}
