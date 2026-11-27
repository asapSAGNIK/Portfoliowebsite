"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio-data";

type FilterKey = "all" | "ai" | "web" | "games";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All builds" },
  { id: "ai", label: "AI & Automation" },
  { id: "web", label: "Full-Stack Web" },
  { id: "games", label: "Games & Utilities" },
];

export default function ProjectsArchive() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* Discipline Filter Bar */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-6 mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={active}
              className="rounded-md border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                borderColor: active ? "var(--accent)" : "var(--rule-hair)",
                backgroundColor: active ? "var(--accent)" : "var(--surface-raised)",
                color: active ? "var(--accent-ink)" : "var(--ink-secondary)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Engineering Archive List */}
      <div className="divide-y border-t" style={{ borderColor: "var(--rule-hair)" }}>
        {visible.map((project) => (
          <article
            key={project.id}
            className="grid grid-cols-1 gap-6 py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
            style={{ borderColor: "var(--rule-hair)" }}
          >
            <div className="space-y-3">
              <div
                className="text-[12px] tabular-nums"
                style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
              >
                {project.year} / {project.categoryLabel}
              </div>

              {project.image ? (
                <div
                  className="relative h-[112px] w-[184px] overflow-hidden rounded-md border"
                  style={{
                    borderColor: "var(--rule-strong)",
                    backgroundColor: "var(--surface-vinyl)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot preview`}
                    fill
                    sizes="184px"
                    className={
                      project.id === "smart-playlist"
                        ? "object-contain p-3"
                        : "object-cover dark:brightness-[0.86] dark:contrast-[0.95]"
                    }
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-[112px] w-[184px] flex-col justify-between rounded-md border p-3.5"
                  style={{
                    borderColor: "var(--rule-hair)",
                    backgroundColor: "var(--surface-raised)",
                  }}
                >
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {project.categoryLabel}
                  </span>
                  <span
                    className="text-[13px] font-semibold leading-snug"
                    style={{ color: "var(--ink-primary)" }}
                  >
                    {project.title}
                  </span>
                  <span
                    className="truncate text-[11px]"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {project.stack.slice(0, 2).join(" / ")}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  className="text-[20px] font-semibold tracking-[-0.02em]"
                  style={{ color: "var(--ink-primary)" }}
                >
                  {project.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-[13px]">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 editorial-link font-medium"
                    >
                      <span>Live demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.githubUrl && project.githubUrl !== project.liveUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 editorial-link"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p
                className="mt-2.5 max-w-[64ch] text-[15px] leading-[1.65]"
                style={{ color: "var(--ink-secondary)" }}
              >
                {project.description}
              </p>

              <p
                className="mt-3 max-w-[64ch] text-[14px] leading-[1.6]"
                style={{ color: "var(--ink-muted)" }}
              >
                <span className="font-medium" style={{ color: "var(--ink-secondary)" }}>
                  Architecture:{" "}
                </span>
                {project.architecture}
              </p>

              <p
                className="mt-4 text-[12px]"
                style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
              >
                {project.stack.join(", ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
