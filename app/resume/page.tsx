import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { EXPERIENCE, OG_IMAGE, PERSON, PROJECTS, SITE_URL, SKILL_GROUPS } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Printable resume and PDF download for Sagnik Chowdhury — Full-Stack & AI Engineer (Uphook.ai, Daga Groups, Sunder Garments, SRM University B.Tech ’25).",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    url: `${SITE_URL}/resume`,
    title: "Resume | Sagnik Chowdhury",
    description:
      "Work experience, projects, technical skills, and education for Sagnik Chowdhury, Full-Stack & AI Product Engineer.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sagnik Chowdhury resume" }],
  },
};

export default function ResumePage() {
  const resumeProjects = PROJECTS.filter((p) =>
    ["plate", "the-teatime", "smart-playlist", "sleepify", "rocket-adventures"].includes(p.id)
  );

  return (
    <div className="mx-auto max-w-[820px] px-5 pt-10 pb-10 sm:px-8 md:pt-14">
      {/* Top action bar (hidden when printing) */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] no-underline"
          style={{ color: "var(--ink-muted)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <a
          href={PERSON.resumePdf}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>Download PDF</span>
        </a>
      </div>

      {/* Resume Sheet */}
      <article
        className="rounded-lg border p-6 sm:p-10 print:border-0 print:p-0"
        style={{
          borderColor: "var(--rule-hair)",
          backgroundColor: "var(--surface-raised)",
        }}
      >
        {/* Header */}
        <header
          className="border-b pb-6"
          style={{ borderColor: "var(--rule-hair)" }}
        >
          <h1
            className="text-[30px] font-semibold tracking-[-0.03em] sm:text-[36px]"
            style={{ color: "var(--ink-primary)" }}
          >
            {PERSON.name}
          </h1>
          <p className="mt-1 text-[15px]" style={{ color: "var(--ink-secondary)" }}>
            {PERSON.role}, {PERSON.location}
          </p>

          <div
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
          >
            <a href={`mailto:${PERSON.email}`} className="editorial-link">
              {PERSON.email}
            </a>
            <span>{PERSON.phone}</span>
            <a href={PERSON.github} target="_blank" rel="noreferrer" className="editorial-link">
              github.com/asapSAGNIK
            </a>
            <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="editorial-link">
              LinkedIn
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="border-b py-6" style={{ borderColor: "var(--rule-hair)" }}>
          <h2
            className="text-[18px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Summary
          </h2>
          <p
            className="mt-2.5 text-[15px] leading-[1.65]"
            style={{ color: "var(--ink-secondary)" }}
          >
            {PERSON.resumeSummary}
          </p>
        </section>

        {/* Work Experience */}
        <section className="border-b py-6" style={{ borderColor: "var(--rule-hair)" }}>
          <h2
            className="text-[18px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Work Experience
          </h2>

          <div className="mt-4 space-y-6">
            {EXPERIENCE.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3
                    className="text-[16px] font-semibold"
                    style={{ color: "var(--ink-primary)" }}
                  >
                    {job.company}{" "}
                    <span className="font-normal" style={{ color: "var(--ink-muted)" }}>
                      / {job.role}
                    </span>
                  </h3>
                  <span
                    className="text-[12px] tabular-nums"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {job.period}
                  </span>
                </div>

                <ul
                  className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.6]"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  {job.highlights.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="border-b py-6" style={{ borderColor: "var(--rule-hair)" }}>
          <h2
            className="text-[18px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Selected Projects
          </h2>

          <div className="mt-4 space-y-5">
            {resumeProjects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--ink-primary)" }}
                  >
                    {proj.liveUrl || proj.githubUrl ? (
                      <a
                        href={proj.liveUrl || proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="editorial-link"
                      >
                        {proj.title}
                      </a>
                    ) : (
                      proj.title
                    )}
                  </h3>
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {proj.stack.join(", ")}
                  </span>
                </div>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="border-b py-6" style={{ borderColor: "var(--rule-hair)" }}>
          <h2
            className="text-[18px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Skills
          </h2>
          <dl className="mt-3 space-y-2 text-[14px]">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt
                  className="w-[140px] shrink-0 font-medium"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {group.label}
                </dt>
                <dd className="m-0" style={{ color: "var(--ink-secondary)" }}>
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Education */}
        <section className="pt-6">
          <h2
            className="text-[18px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--ink-primary)" }}
          >
            Education
          </h2>
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <div
                className="text-[15px] font-semibold"
                style={{ color: "var(--ink-primary)" }}
              >
                {PERSON.education.institution}
              </div>
              <div className="text-[14px]" style={{ color: "var(--ink-secondary)" }}>
                {PERSON.education.degree}, {PERSON.education.gpa}
              </div>
            </div>
            <span
              className="text-[12px] tabular-nums"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
            >
              {PERSON.education.period}
            </span>
          </div>
        </section>
      </article>
    </div>
  );
}
