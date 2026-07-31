"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getStackLayers,
  getStackPreview,
  projects,
  type Project,
  type ProjectStack,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function ProjectStackPreview({ stack }: { stack: ProjectStack }) {
  const preview = getStackPreview(stack);

  return (
    <p className="font-mono text-[0.8125rem] font-medium leading-relaxed tracking-[0.02em] text-ink/70">
      {preview.join("  ·  ")}
    </p>
  );
}

function ProjectStackDetail({ stack }: { stack: ProjectStack }) {
  const layers = getStackLayers(stack);

  return (
    <div className="space-y-5">
      {layers.map(({ key, label }) => (
        <div key={key} className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2">
          <p className="pt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea">
            {label}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stack[key]!.map((tech) => (
              <span
                key={tech}
                className="border border-ink/15 bg-mist/60 px-2.5 py-1 font-mono text-[0.8125rem] font-medium text-ink/85"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;

    const before = document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    const shift = document.documentElement.clientWidth - before;
    if (shift > 0) {
      document.body.style.paddingRight = `${shift}px`;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="work" className="overflow-hidden bg-mist">
      <div className="shell py-20 sm:py-28">
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
              01 — Work
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Projects I&apos;ve built
            </h2>
          </div>
          <p className="font-mono text-sm tabular-nums text-sea">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>

        <ul className="mt-4 border-t border-ink/10">
          {projects.map((project, i) => (
            <li key={project.name} className="border-b border-ink/10">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group grid w-full grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 px-1 py-8 text-left transition-colors hover:bg-foam/80 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-6 sm:px-3 sm:py-9"
              >
                <span className="pt-2.5 font-mono text-sm tabular-nums text-sea">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-white sm:size-11">
                        {project.logo ? (
                          <Image
                            src={project.logo}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <span
                            className="flex size-full items-center justify-center font-mono text-[0.65rem] font-medium text-sea"
                            aria-hidden
                          >
                            {project.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                            {project.name}
                          </h3>
                          <span className="border border-ink/15 px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                            {project.kind}
                          </span>
                        </div>
                        <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                          {project.role}
                        </p>
                      </div>
                    </div>

                    <span
                      className="flex size-9 shrink-0 items-center justify-center bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-sea sm:mt-5 sm:pl-14">
                    {project.summary}
                  </p>

                  <div className="mt-3 sm:pl-14">
                    <ProjectStackPreview stack={project.stack} />
                  </div>

                  <p className="mt-4 text-sm font-medium text-ink sm:sr-only">
                    Open details
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            aria-label="Close details"
            className="work-panel-backdrop absolute inset-0 bg-ink/45"
            onClick={() => setActive(null)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-panel-title"
            className="work-panel relative z-10 flex h-full w-full max-w-lg flex-col border-l border-ink/10 bg-foam"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5 sm:px-8">
              <div className="flex min-w-0 items-start gap-3">
                {active.logo ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-white">
                    <Image
                      src={active.logo}
                      alt={`${active.name} logo`}
                      fill
                      sizes="48px"
                      className="object-contain p-1.5"
                    />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                      {active.role}
                    </p>
                    <span className="border border-ink/15 px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                      {active.kind}
                    </span>
                  </div>
                  <h3
                    id="work-panel-title"
                    className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                  >
                    {active.name}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex size-9 shrink-0 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-mist"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
              <p className="text-base leading-relaxed text-sea">{active.summary}</p>

              <h4 className="mt-10 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                Technical stack
              </h4>
              <div className="mt-5">
                <ProjectStackDetail stack={active.stack} />
              </div>

              <h4 className="mt-10 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                Key features
              </h4>
              <ul className="mt-4 space-y-4">
                {active.highlights.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-ink pl-4 text-base leading-relaxed text-sea"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/10 px-6 py-4 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                {active.url ? (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-ink text-sm font-medium text-foam transition-colors hover:bg-sea-mid"
                  >
                    Visit live site
                    <ExternalLink
                      className="size-3.5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className={cn(
                    "inline-flex h-11 items-center justify-center text-sm font-medium transition-colors",
                    active.url
                      ? "flex-1 border border-ink/15 text-ink hover:border-ink hover:bg-mist"
                      : "w-full bg-ink text-foam hover:bg-sea-mid"
                  )}
                >
                  Close panel
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
