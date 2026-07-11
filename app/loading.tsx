"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <div className="text-slate-300">Loading…</div>
      </div>
    </div>
  );
}
