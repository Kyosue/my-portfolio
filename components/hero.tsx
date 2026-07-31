"use client";

import Image from "next/image";
import { Download, Eye } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { site } from "@/lib/portfolio-data";
import { TechBackdrop } from "@/components/tech-backdrop";

const resumeHref = "/document/Reymund-Abelgas-Resume.pdf";
const resumePreview = "/images/Reymund-Abelgas-Resume.png";

export function Hero() {
  const [firstName, ...restName] = site.name.split(" ");
  const [resumeOpen, setResumeOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!resumeOpen) return;

    const before = document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    const shift = document.documentElement.clientWidth - before;
    if (shift > 0) {
      document.body.style.paddingRight = `${shift}px`;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [resumeOpen]);

  return (
    <section id="top" className="relative overflow-hidden bg-mist">
      <TechBackdrop variant="hero" />
      <div className="shell relative z-10 grid min-h-[calc(100svh-3.5rem)] grid-cols-1 content-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:items-center lg:gap-16 lg:py-24">
        <div className="min-w-0">
          <div
            className="animate-rise flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ animationDelay: "40ms" }}
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
              {site.role}
            </p>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sea">
              Available · Mati City
            </p>
          </div>

          <h1
            className="animate-rise mt-6 font-display text-[clamp(3.25rem,11vw,7rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-ink"
            style={{ animationDelay: "90ms" }}
          >
            {firstName}
            <br />
            {restName.join(" ")}
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-sea sm:text-xl"
            style={{ animationDelay: "150ms" }}
          >
            {site.tagline}
          </p>

          <div
            className="animate-rise mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center bg-ink px-6 text-sm font-medium text-foam transition-colors hover:bg-sea-mid sm:min-w-[11.5rem]"
            >
              See selected work
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center justify-center border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-ink sm:min-w-[11.5rem]"
            >
              Start a conversation
            </a>
          </div>
        </div>

        <aside
          className="animate-rise flex flex-col gap-8 border-t border-ink/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          style={{ animationDelay: "260ms" }}
        >
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
              Focus
            </p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              Web &amp; mobile products that ship cleanly end to end.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
              Currently
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sea">
              Open to freelance builds and full-time roles from{" "}
              <span className="text-ink">Mati City, Philippines</span>.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
              Resume
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={resumeHref}
                download="Reymund-Abelgas-Resume.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
              >
                <Download className="size-3.5" strokeWidth={1.75} aria-hidden />
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 text-left text-sm font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
              >
                <Eye className="size-3.5" strokeWidth={1.75} aria-hidden />
                View resume
              </button>
            </div>
          </div>
        </aside>
      </div>

      {resumeOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close resume"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setResumeOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex h-[min(88vh,52rem)] w-full max-w-4xl flex-col overflow-hidden border border-ink/10 bg-foam"
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                  Resume
                </p>
                <h2
                  id={titleId}
                  className="mt-1 truncate font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                >
                  {site.name}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={resumeHref}
                  download="Reymund-Abelgas-Resume.pdf"
                  className="inline-flex h-9 items-center gap-2 border border-ink/15 px-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-mist"
                >
                  <Download
                    className="size-3.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="flex size-9 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-mist"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-mist p-3 sm:p-5">
              <Image
                src={resumePreview}
                alt={`${site.name} resume`}
                width={2550}
                height={3301}
                className="mx-auto h-auto w-full max-w-3xl bg-white"
                sizes="(max-width: 896px) 100vw, 48rem"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
