"use client";

import { useEffect, useState } from "react";
import { UserRound, Briefcase } from "lucide-react";

type Section = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const SECTIONS: Section[] = [
  { id: "hero", label: "Me!", icon: UserRound },
  { id: "work", label: "Journey", icon: Briefcase },
];

export default function ScrollCapsuleNav() {
  const [activeId, setActiveId] = useState<string>("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  // scroll spy — only these two
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop: fixed left middle, hover to expand. Hidden on mobile */}
      <div className="fixed left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none">
        <div className="group flex flex-col items-center">
          <div className="scrolldown" role="navigation" aria-label="Quick navigation">
            <span className="scrolldown-dot" aria-hidden />
            <nav className="scroll-nav">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                    aria-label={s.label}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={`nav-icon-wrap ${isActive ? "nav-icon-wrap-active" : ""}`}>
                      <Icon size={15} strokeWidth={isActive ? 2.4 : 1.9} />
                    </span>
                    <span className="nav-tooltip">{s.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="chevrons" aria-hidden>
            <div className="chevrondown" />
            <div className="chevrondown" />
          </div>
        </div>
      </div>

      {/* Mobile backdrop to close */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/20 backdrop-blur-[1px]"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile: tap-to-expand capsule at bottom-left */}
      <div className="fixed bottom-20 left-4 z-40 flex md:hidden">
        <div className="relative flex flex-col items-center">
          <div
            onClick={() => setMobileOpen((v) => !v)}
            className={`scrolldown scrolldown-mobile ${mobileOpen ? "is-expanded" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMobileOpen((v) => !v);
              }
            }}
          >
            {!mobileOpen && <span className="scrolldown-dot" aria-hidden />}
            {mobileOpen && (
              <nav className="scroll-nav scroll-nav-mobile">
                {SECTIONS.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollTo(s.id);
                      }}
                      className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                      aria-label={s.label}
                    >
                      <span className={`nav-icon-wrap ${isActive ? "nav-icon-wrap-active" : ""}`}>
                        <Icon size={15} />
                      </span>
                      <span className="nav-tooltip">{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
          {!mobileOpen && (
            <div className="chevrons chevrons-mobile" aria-hidden>
              <div className="chevrondown" />
              <div className="chevrondown" />
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ===== Base capsule - from Uiverse.io by mrhyddenn, adapted ===== */
        .scrolldown {
          --color: #A7D129;
          --sizeX: 22px;
          --sizeY: 50px;
          position: relative;
          width: var(--sizeX);
          height: var(--sizeY);
          border: calc(var(--sizeX) / 10) solid var(--color);
          border-radius: 50px;
          box-sizing: border-box;
          margin-bottom: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition:
            width 0.42s cubic-bezier(0.34, 1.25, 0.64, 1),
            height 0.42s cubic-bezier(0.34, 1.25, 0.64, 1),
            background 0.30s ease,
            border-color 0.30s ease,
            box-shadow 0.30s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .scrolldown:hover,
        .scrolldown.is-expanded,
        .group:hover .scrolldown {
          width: 54px;
          height: 118px;
          background: rgba(10, 10, 10, 0.92);
          border-color: #3E432E;
          border-width: 1.5px;
          box-shadow:
            0 12px 40px rgba(0,0,0,0.75),
            0 0 0 1px rgba(167,209,41,0.10),
            0 0 22px rgba(167,209,41,0.07);
          cursor: default;
        }

        /* dot animation - same as original */
        .scrolldown-dot {
          position: absolute;
          bottom: 30px;
          left: 50%;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          background-color: var(--color);
          border-radius: 100%;
          animation: scrolldown-anim 2s infinite;
          box-sizing: border-box;
          box-shadow: 0px -5px 3px 1px #2a547066;
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        .group:hover .scrolldown-dot,
        .scrolldown.is-expanded .scrolldown-dot {
          opacity: 0;
          animation: none;
          transform: translateY(8px);
        }

        @keyframes scrolldown-anim {
          0% { opacity: 0; height: 6px; }
          40% { opacity: 1; height: 10px; }
          80% { transform: translate(0, 20px); height: 10px; opacity: 0; }
          100% { height: 3px; opacity: 0; }
        }

        /* chevrons - original, but fade on hover */
        .chevrons {
          padding: 6px 0 0 0;
          margin-left: 0;
          margin-top: 8px;
          width: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition:
            opacity 0.28s ease,
            transform 0.28s ease,
            margin-top 0.32s ease,
            height 0.32s ease;
          height: 34px;
          overflow: hidden;
          pointer-events: none;
        }

        .chevrons-mobile {
          margin-top: 6px;
          margin-left: 0;
          width: 22px;
        }

        .group:hover .chevrons,
        .scrolldown.is-expanded + .chevrons,
        .group:hover + .chevrons {
          opacity: 0;
          transform: translateY(-8px);
          height: 0;
          margin-top: 0;
        }

        .scrolldown-mobile.is-expanded ~ .chevrons-mobile,
        .scrolldown-mobile.is-expanded + .chevrons-mobile {
          opacity: 0;
          height: 0;
          margin-top: 0;
        }

        .chevrondown {
          margin-top: -6px;
          position: relative;
          border: solid var(--color);
          border-width: 0 2.5px 2.5px 0;
          display: inline-block;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          opacity: 0.9;
        }
        .chevrondown:nth-child(odd) { animation: pulse54012 500ms ease infinite alternate; }
        .chevrondown:nth-child(even) { animation: pulse54012 500ms ease infinite alternate 250ms; }
        @keyframes pulse54012 { from { opacity: 0; } to { opacity: 0.5; } }

        /* ===== Expanded nav inside capsule — icon only ===== */
        .scroll-nav {
          opacity: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 100%;
          padding: 10px 0;
          transition: opacity 0.22s ease 0.06s;
        }

        .group:hover .scroll-nav,
        .scrolldown.is-expanded .scroll-nav {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.28s ease 0.12s;
        }

        .scroll-nav-mobile {
          padding: 10px 0;
          gap: 10px;
        }

        .nav-item {
          position: relative;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition:
            background 0.20s ease,
            border-color 0.20s ease,
            transform 0.18s ease,
            box-shadow 0.20s ease;
        }

        .nav-item:hover {
          transform: scale(1.06);
        }

        .nav-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(62, 67, 46, 0.55);
          border: 1px solid rgba(97, 111, 57, 0.45);
          color: #A7D129;
          flex-shrink: 0;
          transition: background 0.20s ease, border-color 0.20s ease, transform 0.20s ease;
        }

        .nav-item:hover .nav-icon-wrap {
          background: rgba(167, 209, 41, 0.14);
          border-color: rgba(167,209,41,0.28);
        }

        .nav-icon-wrap-active {
          background: #A7D129 !important;
          border-color: #A7D129 !important;
          color: #0a0a0a !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(167,209,41,0.12);
        }

        /* tooltip on hover of each icon */
        .nav-tooltip {
          position: absolute;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);
          white-space: nowrap;
          font-family: "Satoshi Medium", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #A7D129;
          background: rgba(10,10,10,0.96);
          border: 1px solid #3E432E;
          padding: 4px 8px;
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }

        .nav-tooltip::before {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: #3E432E;
          margin-right: -1px;
        }

        .nav-item:hover .nav-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Mobile capsule specifics - same slim sizes */
        .scrolldown-mobile {
          width: var(--sizeX);
          height: var(--sizeY);
          margin-bottom: 0;
        }
        .scrolldown-mobile.is-expanded {
          width: 54px;
          height: 118px;
        }

        /* Ensure group hover works even with small gap */
        .group {
          padding: 10px 14px 18px 14px;
          margin: -10px -14px -18px -14px;
        }

        @media (prefers-reduced-motion: reduce) {
          .scrolldown, .scrolldown-dot, .chevrons, .scroll-nav, .nav-item, .nav-tooltip {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
