"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Boxes, X } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/portfolio-data";

const GravityGallery = dynamic(() => import("@/components/GravityGallery"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center text-[12px]"
      style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
    >
      Loading physics jar…
    </div>
  ),
});

export default function SkillsSection() {
  const [jarOpen, setJarOpen] = useState(false);

  return (
    <div className="space-y-5">
      <dl className="m-0 space-y-3.5">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-1 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
          >
            <dt
              className="text-[13px] font-medium"
              style={{ color: "var(--ink-muted)" }}
            >
              {group.label}
            </dt>
            <dd
              className="m-0 text-[15px] leading-relaxed"
              style={{ color: "var(--ink-secondary)" }}
            >
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>

      {/* Opt-in playful Matter.js physics jar easter egg */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setJarOpen((v) => !v)}
          aria-expanded={jarOpen}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150"
          style={{
            borderColor: jarOpen ? "var(--accent)" : "var(--rule-hair)",
            backgroundColor: jarOpen ? "var(--accent-soft)" : "var(--surface-raised)",
            color: jarOpen ? "var(--accent)" : "var(--ink-secondary)",
          }}
        >
          {jarOpen ? <X className="h-3.5 w-3.5" /> : <Boxes className="h-3.5 w-3.5" />}
          <span>{jarOpen ? "Close physics jar" : "Drop stack into physics jar"}</span>
        </button>

        {jarOpen ? (
          <div
            className="mt-4 overflow-hidden rounded-lg border"
            style={{
              borderColor: "var(--rule-strong)",
              backgroundColor: "var(--surface-vinyl)",
            }}
          >
            <div
              className="flex items-center justify-between border-b px-3.5 py-2 text-[12px]"
              style={{
                borderColor: "var(--rule-hair)",
                color: "var(--ink-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>Drag and toss icons inside the jar</span>
              <span>Matter.js</span>
            </div>
            <div className="h-[220px] w-full">
              <GravityGallery />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
