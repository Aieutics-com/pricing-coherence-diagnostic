"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import type { DimensionResult } from "@/lib/diagnostic-data";
import type { Answers } from "@/lib/scoring";
import { encodeAnswers } from "@/lib/share";
import {
  getTotalScore,
  getTotalMax,
  getMatchingPatterns,
} from "@/lib/scoring";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  results: DimensionResult[];
  answers: Answers;
}

const statusLabels = { green: "Strong", amber: "Partial", red: "At Risk" } as const;

export default function ShareModal({
  open,
  onClose,
  results,
  answers,
}: ShareModalProps) {
  const [name, setName] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus first field on open
  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/diagnostic-demo?r=${encodeAnswers(answers)}`
    : "";

  const handleEmail = useCallback(() => {
    const totalScore = getTotalScore(results);
    const totalMax = getTotalMax(results);
    const patterns = getMatchingPatterns(results);
    const firstName = name.trim().split(/\s+/)[0] || "there";

    const dimensionLines = results
      .map(
        (r) =>
          `${r.dimension.name}: ${r.score}/${r.maxScore} (${statusLabels[r.status]})`
      )
      .join("\n");

    const patternLines =
      patterns.length > 0
        ? `\nProfile Pattern:\n${patterns.map((p) => `${p.label} — ${p.description}`).join("\n")}\n`
        : "";

    const body = `Hello ${firstName},

Here are your Pricing Coherence Diagnostic results.

Score: ${totalScore}/${totalMax}

${dimensionLines}
${patternLines}
View full results: ${shareUrl}

---
Aieutics — See further. Think deeper. Break through.
https://aieutics.com`;

    const subject = "Pricing Coherence Diagnostic — Your Results";
    const mailto = `mailto:?bcc=hello@aieutics.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    track("email_shared");
    window.open(mailto, "_self");
  }, [name, results, shareUrl]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    track("link_copied");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, [shareUrl]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-6
        transition-all duration-250 ease-out
        ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
      style={{
        background: "rgba(26, 26, 26, 0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`
          bg-[var(--color-white)] rounded-2xl w-full max-w-md
          shadow-[0_25px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]
          transition-transform duration-300
          ${open ? "scale-100 translate-y-0" : "scale-[0.97] translate-y-3"}
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="p-8">
          <h3
            id="share-modal-title"
            className="font-[family-name:var(--font-heading)] text-xl font-bold mb-1"
          >
            Share Your Results
          </h3>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-grey)] mb-7">
            Send your pricing coherence profile by email or copy the link
          </p>

          <div className="mb-5">
            <label className="block font-[family-name:var(--font-heading)] text-[0.8rem] font-bold mb-1.5">
              Your name
            </label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jean Dupont"
              className="w-full px-4 py-3 text-[0.9rem] font-[family-name:var(--font-body)] border border-[var(--color-grey-light)] rounded-xl bg-[var(--color-white)] text-[var(--color-foreground)] outline-none transition-all duration-200 placeholder:text-[var(--color-grey-lighter)] focus:border-[var(--color-orange)] focus:shadow-[0_0_0_3px_rgba(255,95,31,0.12)]"
            />
          </div>

          <button
            onClick={handleEmail}
            className="w-full py-3.5 font-[family-name:var(--font-heading)] text-[0.9rem] font-bold text-white bg-[var(--color-orange)] border-none rounded-xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-[1.01] mb-3"
          >
            Send via Email
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3.5 font-[family-name:var(--font-heading)] text-[0.9rem] font-bold text-[var(--color-foreground)] bg-transparent border border-[var(--color-grey-light)] rounded-xl cursor-pointer transition-all duration-200 hover:border-[var(--color-foreground)] mb-3"
          >
            {linkCopied ? "Link copied!" : "Copy link"}
          </button>

          <button
            onClick={onClose}
            className="block w-full text-center mt-2 font-[family-name:var(--font-heading)] text-[0.8rem] font-bold text-[var(--color-grey)] bg-transparent border-none cursor-pointer hover:text-[var(--color-foreground)] transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
