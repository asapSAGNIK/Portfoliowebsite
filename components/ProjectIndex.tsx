"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectItem } from "@/lib/portfolio-data";

export default function ProjectIndex() {
  const [hovered, setHovered] = useState<ProjectItem | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const featured = PROJECTS.filter((p) => p.featuredOnHome);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => setHovered(null)}>
      <ul className="m-0 flex list-none flex-col divide-y p-0" style={{ borderColor: "var(--rule-hair)" }}>
        {featured.map((project) => {
          const primaryHref = project.liveUrl || project.githubUrl || "/projects";
          return (
            <li
              key={project.id}
              onMouseEnter={() => setHovered(project)}
              className="group py-5 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--rule-hair)" }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[17px] font-semibold tracking-[-0.01em] no-underline transition-colors duration-150"
                    style={{ color: "var(--ink-primary)" }}
                  >
                    <span className="group-hover:underline underline-offset-4 decoration-[var(--accent)]">
                      {project.title}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--ink-muted)" }}
                      aria-hidden="true"
                    />
                  </a>
                </div>

                <span
                  className="shrink-0 text-[12px] tabular-nums"
                  style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {project.stack.slice(0, 3).join(", ")}
                </span>
              </div>

              <p
                className="mt-1.5 max-w-[62ch] text-[15px] leading-relaxed"
                style={{ color: "var(--ink-secondary)" }}
              >
                {project.tagline}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[13px]">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link text-[13px]"
                  >
                    Live site
                  </a>
                ) : null}
                {project.githubUrl && project.githubUrl !== project.liveUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link text-[13px]"
                  >
                    Source code
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--rule-hair)" }}>
        <Link
          href="/projects"
          className="editorial-link text-[14px] font-medium"
        >
          All {PROJECTS.length} projects
        </Link>
      </div>

      {/* Desktop floating Hover Preview card (inspired by 21st.dev Hover Preview) */}
      {hovered ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[224px] overflow-hidden rounded-lg border lg:block"
          style={{
            borderColor: "var(--rule-strong)",
            backgroundColor: "var(--surface-raised)",
            boxShadow: "var(--shadow-float)",
            transform: `translate3d(${Math.min(
              cursor.x + 22,
              typeof window !== "undefined" ? window.innerWidth - 248 : cursor.x + 22
            )}px, ${Math.max(16, cursor.y - 90)}px, 0)`,
            transition: "transform 110ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {hovered.image ? (
            <div
              className="relative h-[120px] w-full overflow-hidden border-b"
              style={{
                borderColor: "var(--rule-hair)",
                backgroundColor: "var(--surface-vinyl)",
              }}
            >
              <Image
                src={hovered.image}
                alt=""
                fill
                sizes="224px"
                className={
                  hovered.id === "smart-playlist"
                    ? "object-contain p-3"
                    : "object-cover dark:brightness-[0.9] dark:contrast-[0.96]"
                }
              />
            </div>
          ) : (
            <div
              className="flex h-[96px] w-full flex-col justify-between border-b p-3"
              style={{
                borderColor: "var(--rule-hair)",
                backgroundColor: "var(--surface-subtle)",
              }}
            >
              <span
                className="text-[11px]"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
              >
                {hovered.categoryLabel}
              </span>
              <span
                className="text-[12px] leading-snug"
                style={{ color: "var(--ink-secondary)" }}
              >
                {hovered.stack.join(", ")}
              </span>
            </div>
          )}
          <div className="px-3 py-2">
            <div className="text-[12px] font-semibold" style={{ color: "var(--ink-primary)" }}>
              {hovered.title}
            </div>
            <div
              className="mt-0.5 text-[11px]"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
            >
              {hovered.categoryLabel} / {hovered.year}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
