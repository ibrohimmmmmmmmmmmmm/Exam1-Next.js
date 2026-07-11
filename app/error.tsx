"use client";
import React, { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error for debugging
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-4">
      <div className="max-w-lg w-full text-center bg-[#071026] border border-white/5 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-slate-400 mb-4">{error?.message || "An unexpected error occurred."}</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="px-4 py-2 rounded-xl bg-emerald-500 text-[#071026] font-semibold">Try again</button>
        </div>
      </div>
    </div>
  );
}
