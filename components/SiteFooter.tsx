"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { PERSON } from "@/lib/portfolio-data";

export default function SiteFooter() {
  const [istTime, setIstTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const format = () => {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: PERSON.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setIstTime(`${formatter.format(new Date())} IST`);
    };
    format();
    const timer = window.setInterval(format, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSON.email}`;
    }
  };

  return (
    <footer
      className="no-print relative z-10 mt-16 border-t"
      style={{ borderColor: "var(--rule-hair)" }}
    >
      <div className="mx-auto flex max-w-[1000px] flex-col gap-5 px-5 pt-8 pb-24 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:py-8">
        <div className="flex flex-col gap-1">
          <p className="text-[14px]" style={{ color: "var(--ink-secondary)" }}>
            Open to founding and product engineering roles.
          </p>
          <p
            className="text-[12px] tabular-nums"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
          >
            {PERSON.location} {istTime ? `/ ${istTime}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[13px]">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] transition-colors duration-150"
            style={{
              borderColor: copied ? "var(--accent)" : "var(--rule-hair)",
              backgroundColor: "var(--surface-raised)",
              color: copied ? "var(--accent)" : "var(--ink-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied email" : PERSON.email}</span>
          </button>

          <a
            href={PERSON.github}
            target="_blank"
            rel="noreferrer"
            className="editorial-link text-[13px]"
          >
            GitHub
          </a>
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noreferrer"
            className="editorial-link text-[13px]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
