import React from "react";

// `default.tsx` is not a special Next.js file, but per your request
// this provides a simple default page/component you can customize.
export default function DefaultPage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      {children ? children : (
        <main className="max-w-4xl mx-auto px-6 py-40 text-center">
          <h1 className="text-3xl font-extrabold mb-3">Welcome</h1>
          <p className="text-slate-400">This is the default page placeholder. Replace with your content.</p>
        </main>
      )}
    </div>
  );
}
