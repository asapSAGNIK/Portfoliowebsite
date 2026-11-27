"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Mail } from "lucide-react";
import { PERSON } from "@/lib/portfolio-data";

export default function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const isResume = pathname?.startsWith("/resume");

  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      className="no-print fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur-md md:hidden"
      style={{
        borderColor: "var(--rule-hair)",
        backgroundColor: "color-mix(in srgb, var(--surface-ground) 92%, transparent)",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto flex max-w-[1000px] items-center gap-2.5 px-4 pt-3">
        <a
          href={`mailto:${PERSON.email}`}
          className="btn-primary flex-1 justify-center py-2.5 text-[14px]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>Get in touch</span>
        </a>

        {isResume ? (
          <a
            href={PERSON.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary shrink-0 px-3.5 py-2.5 text-[14px]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>PDF</span>
          </a>
        ) : (
          <Link
            href="/resume"
            className="btn-secondary shrink-0 px-3.5 py-2.5 text-[14px]"
          >
            Resume
          </Link>
        )}
      </div>
    </div>
  );
}
