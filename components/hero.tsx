"use client";

import Image from "next/image";
import { Download, Eye } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { site } from "@/lib/portfolio-data";
import { TechBackdrop } from "@/components/tech-backdrop";
import { ResumeZoomViewer } from "@/components/resume-zoom-viewer";

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

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const prevViewport = viewportMeta?.getAttribute("content") ?? null;
    viewportMeta?.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      if (viewportMeta) {
        viewportMeta.setAttribute(
          "content",
          prevViewport ?? "width=device-width, initial-scale=1"
        );
      }
      window.removeEventListener("keydown", onKey);
    };
  }, [resumeOpen]);

  return (
    <section id="top" className="relative overflow-hidden bg-mist">
      <TechBackdrop variant="hero" />
      <div className="shell relative z-10 flex flex-col justify-center gap-10 py-12 sm:min-h-[calc(100svh-3.5rem)] sm:gap-12 sm:py-20 lg:grid lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:items-center lg:gap-16 lg:py-24">
        <div className="min-w-0">
          <div
            className="animate-rise space-y-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:space-y-0"
            style={{ animationDelay: "40ms" }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-sea sm:text-[0.7rem] sm:tracking-[0.2em]">
              {site.role}
            </p>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-sea sm:text-[0.7rem] sm:tracking-[0.16em]">
              {site.availabilityShort}
            </p>
          </div>

          <h1
            className="animate-rise mt-5 font-display text-[clamp(2.75rem,13vw,7rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink sm:mt-6 sm:leading-[0.88]"
            style={{ animationDelay: "90ms" }}
          >
            {firstName}
            <br />
            {restName.join(" ")}
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-sea sm:mt-8 sm:text-lg lg:text-xl"
            style={{ animationDelay: "150ms" }}
          >
            {site.tagline}
          </p>

          <div
            className="animate-rise mt-8 grid grid-cols-1 gap-2.5 sm:mt-12 sm:flex sm:flex-row sm:items-center sm:gap-3"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="#work"
              className="inline-flex h-12 w-full items-center justify-center bg-ink px-6 text-sm font-medium text-foam transition-colors hover:bg-sea-mid sm:w-auto sm:min-w-[11.5rem]"
            >
              See selected work
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 w-full items-center justify-center border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-ink sm:w-auto sm:min-w-[11.5rem]"
            >
              Start a conversation
            </a>
          </div>
        </div>

        <aside
          className="animate-rise border-t border-ink/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          style={{ animationDelay: "260ms" }}
        >
          {/* Mobile: compact stacked meta */}
          <div className="space-y-5 lg:hidden">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                Focus
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                Web &amp; mobile products that ship cleanly end to end.
              </p>
            </div>

            <p className="text-sm leading-relaxed text-sea">
              {site.availability}
            </p>

            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                Resume
              </p>
              <div className="mt-3 flex overflow-hidden border border-ink/15">
                <a
                  href={resumeHref}
                  download="Reymund-Abelgas-Resume.pdf"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-foam px-3 text-sm font-medium text-ink transition-colors active:bg-mist"
                >
                  <Download
                    className="size-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 border-l border-ink/15 px-3 text-sm font-medium text-sea transition-colors active:bg-mist active:text-ink"
                >
                  <Eye
                    className="size-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: original rail */}
          <div className="hidden flex-col gap-8 lg:flex">
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
                {site.availability}
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
                  <Download
                    className="size-3.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
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
          </div>
        </aside>
      </div>

      {resumeOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-6">
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
            className="relative z-10 flex h-[min(88dvh,100%)] w-full max-w-lg flex-col overflow-hidden border border-ink/10 bg-foam sm:h-[min(88vh,52rem)] sm:max-w-2xl lg:max-w-3xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ink/10 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                  Resume
                </p>
                <h2
                  id={titleId}
                  className="mt-0.5 truncate font-display text-lg font-semibold tracking-tight text-ink sm:mt-1 sm:text-2xl"
                >
                  {site.name}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={resumeHref}
                  download="Reymund-Abelgas-Resume.pdf"
                  className="inline-flex h-9 items-center gap-2 border border-ink/15 px-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-mist sm:h-9 sm:px-3"
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

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-mist">
              <div className="flex min-h-0 flex-1 flex-col sm:hidden">
                <ResumeZoomViewer
                  src={resumePreview}
                  alt={`${site.name} resume`}
                />
              </div>
              <div className="hidden min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:block">
                <Image
                  src={resumePreview}
                  alt={`${site.name} resume`}
                  width={2550}
                  height={3301}
                  className="mx-auto block h-auto w-full max-w-3xl bg-white"
                  sizes="(max-width: 896px) 100vw, 48rem"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
