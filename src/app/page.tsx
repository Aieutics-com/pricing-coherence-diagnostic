"use client";

import Image from "next/image";
import { useState } from "react";
import HeroVideo from "@/components/HeroVideo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
  const [showGate, setShowGate] = useState(false);
  return (
    <main className="min-h-screen flex flex-col bg-[var(--color-foreground)]">
      {/* Header */}
      <header className="px-6 py-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Image
            src={`${basePath}/aieutics_transparentbg_logo.png`}
            alt="Aieutics"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
          <span className="font-[family-name:var(--font-body)] text-sm text-white/70 italic hidden sm:inline">
            See further. Think deeper. Break through.
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-16 md:py-24 relative overflow-hidden">
        {/* Video background */}
        <HeroVideo />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white animate-text-focus-in">
            Is Your Pricing Grounded
            <br />
            in <span className="text-[var(--color-orange)]">Buyer Reality?</span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-white/80 leading-relaxed mb-4">
            18 binary questions. 5 dimensions. No middle ground.
          </p>
          <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Most founders set a price and move on. This diagnostic tests
            whether your pricing is validated by real buyers, structured for
            how they budget, and coherent with your ICP and value proposition.
            Because a price that can&apos;t navigate procurement is not a
            price — it&apos;s a wish.
          </p>

          <button
            onClick={() => setShowGate(true)}
            className="inline-block bg-white/15 text-white/40 font-[family-name:var(--font-heading)] font-bold text-lg px-12 py-4 rounded-xl border border-white/10 cursor-not-allowed transition-all duration-300"
          >
            Start the Diagnostic
          </button>
          <p className="font-[family-name:var(--font-body)] text-sm text-white/40 mt-4">
            Available to Aieutics clients
          </p>

          {/* What This Tool Tests — 5 dimension cards */}
          <div className="mt-16">
            <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest text-[var(--color-orange)] mb-6">
              What This Tool Tests
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-left">
              {[
                {
                  label: "WTP Evidence",
                  desc: "Has anyone actually committed to paying?",
                },
                {
                  label: "Pricing Model Fit",
                  desc: "Does your structure match how your buyer budgets?",
                },
                {
                  label: "Budget Alignment",
                  desc: "Do you know where the money comes from inside the buyer's organisation?",
                },
                {
                  label: "Unit Economics",
                  desc: "Does your price capture enough value to build a business?",
                },
                {
                  label: "Triangle Coherence",
                  desc: "Does your pricing reinforce your ICP and value proposition?",
                },
              ].map((dim, i) => (
                <div
                  key={i}
                  className="border border-white/20 rounded-xl p-3 hover:border-[var(--color-orange)] hover:shadow-[0_0_20px_rgba(255,95,31,0.1)] transition-all duration-300 bg-black/30 backdrop-blur-sm"
                >
                  <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-[var(--color-orange)] mb-1">
                    {dim.label}
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-xs text-white/60">
                    {dim.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          <Image
            src={`${basePath}/aieutics_transparentbg_logo.png`}
            alt="Aieutics"
            width={24}
            height={24}
            className="h-6 w-auto opacity-40"
          />
          <p className="font-[family-name:var(--font-body)] text-xs text-white/50">
            Built by{" "}
            <a href="https://www.aieutics.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Aieutics</a>{" "}
            from two decades of practice across strategy consulting, executive coaching, and digital transformation.
            These diagnostics are starting points. If your results raise questions,{" "}
            <a href="https://www.aieutics.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">let&apos;s talk</a>.
          </p>
        </div>
      </footer>

      {/* Client-only gate modal */}
      {showGate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowGate(false)}
        >
          <div
            className="relative max-w-md mx-4 bg-[#141414] border border-white/10 rounded-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGate(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors text-lg"
              aria-label="Close"
            >
              &#x2715;
            </button>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
              This tool is available to Aieutics clients
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm text-white/60 leading-relaxed mb-6">
              The Pricing Coherence Diagnostic is part of Aieutics consulting and coaching engagements. If you would like to learn more or request access, get in touch.
            </p>
            <a
              href="mailto:alexandra@aieutics.com?subject=Request%20info%3A%20Pricing%20Coherence%20Diagnostic"
              className="inline-block bg-[var(--color-orange)] text-white font-[family-name:var(--font-heading)] font-bold text-sm px-8 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-[1.02] transition-all duration-300"
            >
              Request Information
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
