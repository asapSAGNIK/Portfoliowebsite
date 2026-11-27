import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE, OG_IMAGE, PERSON, SITE_URL } from "@/lib/portfolio-data";
import SoundDeck from "@/components/SoundDeck";
import ProjectIndex from "@/components/ProjectIndex";
import SkillsSection from "@/components/SkillsSection";
import OffTheClockPads from "@/components/OffTheClockPads";

export const metadata: Metadata = {
  title: "Sagnik Chowdhury — Full-Stack & AI Engineer",
  description:
    "Full-stack and AI engineer in Kolkata building n8n recruiting pipelines at Uphook.ai (100+ companies, 10,000+ users), AI tools, and web and mobile apps.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "Sagnik Chowdhury — Full-Stack & AI Engineer",
    description:
      "Full-stack and AI engineer in Kolkata building recruiting pipelines at Uphook.ai, AI tools, and web and mobile products.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sagnik Chowdhury portfolio" }],
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
      {/* ===== HERO SECTION — SPLIT PORTRAIT + POSITIONING ===== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="grid grid-cols-1 items-start gap-6 pt-8 pb-8 md:grid-cols-[296px_minmax(0,1fr)] md:gap-12 md:pt-14 md:pb-12"
      >
        {/* Desktop tall portrait (md+) */}
        <div className="hidden md:block">
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border"
            style={{
              borderColor: "var(--rule-hair)",
              backgroundColor: "var(--surface-raised)",
            }}
          >
            <Image
              src={PERSON.portrait}
              alt="Sagnik Chowdhury wearing over-ear headphones in afternoon sunlight"
              fill
              priority
              sizes="296px"
              className="object-cover"
            />
          </div>
          <div
            className="mt-2.5 flex items-center justify-between text-[12px] tabular-nums"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
          >
            <span>{PERSON.location}</span>
            <span>B.Tech, SRM ’25</span>
          </div>
        </div>

        <div className="min-w-0 md:pt-1">
          {/* Mobile compact lockup with right clearance for the hanging pull cord */}
          <div className="flex items-center gap-4 pr-12 md:block md:pr-0">
            <div
              className="relative h-[96px] w-[76px] shrink-0 overflow-hidden rounded-md border md:hidden"
              style={{
                borderColor: "var(--rule-hair)",
                backgroundColor: "var(--surface-raised)",
              }}
            >
              <Image
                src={PERSON.portrait}
                alt="Sagnik Chowdhury wearing over-ear headphones in afternoon sunlight"
                fill
                priority
                sizes="76px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <h1
                className="text-[28px] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[40px] md:text-[48px]"
                style={{ color: "var(--ink-primary)" }}
              >
                Sagnik Chowdhury.
              </h1>
              <p
                className="mt-1.5 text-[12px] tabular-nums md:hidden"
                style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
              >
                {PERSON.location} / SRM ’25
              </p>
            </div>
          </div>

          <div
            className="mt-5 max-w-[54ch] space-y-3.5 text-[15px] leading-[1.62] sm:text-[16px] sm:leading-[1.65]"
            style={{ color: "var(--ink-secondary)" }}
          >
            <p>
              Night owl, house music on loop, building software that fixes things that annoy me.
              Right now I work with the founder at{" "}
              <a
                href="https://uphook.ai/"
                target="_blank"
                rel="noreferrer"
                className="editorial-link font-medium"
              >
                Uphook.ai
              </a>{" "}
              on recruiting pipelines across 100+ companies (10,000+ users).
            </p>
            <p>
              Outside work, I build AI tools, full-stack storefronts, and small utilities like{" "}
              <a
                href="https://github.com/asapSAGNIK/Sleepify.git"
                target="_blank"
                rel="noreferrer"
                className="editorial-link font-medium"
              >
                Sleepify
              </a>{" "}
              because shutting my laptop kept killing the music.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={`mailto:${PERSON.email}`} className="btn-primary">
              Get in touch
            </a>
            <Link href="/resume" className="btn-secondary">
              Read resume
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            <a
              href={PERSON.github}
              target="_blank"
              rel="noreferrer"
              className="editorial-link"
            >
              GitHub {PERSON.githubHandle}
            </a>
            <a
              href={PERSON.linkedin}
              target="_blank"
              rel="noreferrer"
              className="editorial-link"
            >
              LinkedIn
            </a>
            <a href={`mailto:${PERSON.email}`} className="editorial-link">
              {PERSON.email}
            </a>
          </div>
        </div>
      </section>

      {/* ===== DESK SOUND DECK (OPT-IN MINI VINYL + TONEARM) ===== */}
      <div className="pb-12">
        <SoundDeck />
      </div>

      {/* ===== EXPERIENCE ===== */}
      <section
        id="work"
        aria-labelledby="heading-experience"
        className="grid grid-cols-1 gap-6 border-t py-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
        style={{ borderColor: "var(--rule-hair)" }}
      >
        <div>
          <h2
            id="heading-experience"
            className="text-[20px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Experience
          </h2>
        </div>

        <ol
          className="m-0 flex list-none flex-col divide-y p-0"
          style={{ borderColor: "var(--rule-hair)" }}
        >
          {EXPERIENCE.map((item) => (
            <li
              key={item.id}
              className="group py-5 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--rule-hair)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[16px] font-semibold tracking-[-0.01em] no-underline"
                      style={{ color: "var(--ink-primary)" }}
                    >
                      <span className="group-hover:underline underline-offset-4 decoration-[var(--accent)]">
                        {item.company}
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--ink-muted)" }}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <h3
                      className="text-[16px] font-semibold tracking-[-0.01em]"
                      style={{ color: "var(--ink-primary)" }}
                    >
                      {item.company}
                    </h3>
                  )}
                  <span className="text-[14px]" style={{ color: "var(--ink-muted)" }}>
                    {item.role}
                  </span>
                </div>

                <span
                  className="shrink-0 text-[12px] tabular-nums"
                  style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {item.shortPeriod}
                </span>
              </div>

              <p
                className="mt-1.5 max-w-[60ch] text-[15px] leading-[1.6]"
                style={{ color: "var(--ink-secondary)" }}
              >
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== SELECTED PROJECTS (WITH HOVER PREVIEW) ===== */}
      <section
        id="projects"
        aria-labelledby="heading-projects"
        className="grid grid-cols-1 gap-6 border-t py-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
        style={{ borderColor: "var(--rule-hair)" }}
      >
        <div>
          <h2
            id="heading-projects"
            className="text-[20px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Selected Projects
          </h2>
          <p className="mt-1.5 hidden text-[13px] lg:block" style={{ color: "var(--ink-muted)" }}>
            Hover a row to preview
          </p>
        </div>

        <ProjectIndex />
      </section>

      {/* ===== STACK & SKILLS (+ OPT-IN PHYSICS JAR) ===== */}
      <section
        id="stack"
        aria-labelledby="heading-stack"
        className="grid grid-cols-1 gap-6 border-t py-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
        style={{ borderColor: "var(--rule-hair)" }}
      >
        <div>
          <h2
            id="heading-stack"
            className="text-[20px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Stack
          </h2>
        </div>

        <SkillsSection />
      </section>

      {/* ===== OFF THE CLOCK (5-PAD STUDIO SAMPLER) ===== */}
      <section
        id="off-the-clock"
        aria-labelledby="heading-off-clock"
        className="grid grid-cols-1 gap-6 border-t py-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
        style={{ borderColor: "var(--rule-hair)" }}
      >
        <div>
          <h2
            id="heading-off-clock"
            className="text-[20px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Off the Clock
          </h2>
        </div>

        <OffTheClockPads />
      </section>
    </div>
  );
}
