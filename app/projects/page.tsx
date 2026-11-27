import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OG_IMAGE, PERSON, PROJECTS, SITE_URL } from "@/lib/portfolio-data";
import ProjectsArchive from "@/components/ProjectsArchive";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected AI pipelines, client storefronts, web apps, and utilities built by Sagnik Chowdhury — including The Teatime, Smart Playlist, P.L.A.T.E, Sleepify, and Bill Processor Bot.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    url: `${SITE_URL}/projects`,
    title: "Projects | Sagnik Chowdhury",
    description:
      "AI pipelines, full-stack storefronts, and utilities built by Sagnik Chowdhury with architecture notes and live links.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sagnik Chowdhury projects" }],
  },
};

const PROJECTS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects by Sagnik Chowdhury",
  url: `${SITE_URL}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.tagline,
      url: project.liveUrl || project.githubUrl || `${SITE_URL}/projects`,
    })),
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 pt-10 pb-8 sm:px-8 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_JSON_LD) }}
      />

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] no-underline transition-colors duration-150"
          style={{ color: "var(--ink-muted)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <h1
          className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[42px]"
          style={{ color: "var(--ink-primary)" }}
        >
          Projects
        </h1>
        <p
          className="mt-3 max-w-[58ch] text-[16px] leading-[1.65]"
          style={{ color: "var(--ink-secondary)" }}
        >
          AI pipelines, client storefronts, and smaller tools built to scratch my own itch. More
          code on{" "}
          <a
            href={PERSON.github}
            target="_blank"
            rel="noreferrer"
            className="editorial-link font-medium"
          >
            GitHub {PERSON.githubHandle}
          </a>
          .
        </p>
      </div>

      <ProjectsArchive />
    </div>
  );
}
