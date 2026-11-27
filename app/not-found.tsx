import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The requested page does not exist on Sagnik Chowdhury's portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col items-start justify-center px-5 py-20 sm:px-8 md:py-28">
      <p
        className="text-[12px] tabular-nums"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Error 404 / Track missing
      </p>

      <h1
        className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[44px]"
        style={{ color: "var(--ink-primary)" }}
      >
        That page isn’t here.
      </h1>

      <p
        className="mt-3 max-w-[48ch] text-[16px] leading-[1.65]"
        style={{ color: "var(--ink-secondary)" }}
      >
        The link may have moved during a rebuild, or the URL has a typo. Head back to the main page
        or jump straight to projects and resume.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link href="/" className="btn-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to home</span>
        </Link>
        <Link href="/projects" className="btn-secondary">
          Browse projects
        </Link>
        <Link href="/resume" className="btn-secondary">
          Read resume
        </Link>
      </div>
    </div>
  );
}
