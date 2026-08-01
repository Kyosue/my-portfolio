"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getStackLayers,
  getStackPreview,
  projectPlatformMeta,
  projects,
  type Project,
  type ProjectStack,
} from "@/lib/portfolio-data";
import { ProjectMark, ProjectPlatformBadge } from "@/components/project-preview";

function ProjectStackPreview({
  stack,
  limit = 6,
}: {
  stack: ProjectStack;
  limit?: number;
}) {
  const preview = getStackPreview(stack, limit);

  return (
    <div className="flex flex-wrap gap-1.5">
      {preview.map((tech) => (
        <span
          key={tech}
          className="border border-ink/12 px-2 py-0.5 font-mono text-[0.7rem] font-medium text-ink/75"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectStackDetail({ stack }: { stack: ProjectStack }) {
  const layers = getStackLayers(stack);

  return (
    <div className="space-y-5">
      {layers.map(({ key, label }) => (
        <div
          key={key}
          className="grid gap-2 sm:grid-cols-[5.5rem_1fr] sm:gap-x-4 sm:gap-y-2"
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea sm:pt-1.5">
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

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.65;

function isMobileSheet() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 639px)").matches
  );
}

function ProjectDetailSheet({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef({
    tracking: false,
    startY: 0,
    lastY: 0,
    lastT: 0,
    vy: 0,
    offset: 0,
  });
  const closingRef = useRef(false);

  const applyOffset = (y: number, animated: boolean) => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    if (!sheet) return;

    dragRef.current.offset = y;
    sheet.style.transition = animated
      ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    sheet.style.transform =
      y > 0 ? `translate3d(0, ${y}px, 0)` : "translate3d(0, 0, 0)";

    if (backdrop) {
      const fade = Math.max(0, 1 - y / Math.max(sheet.offsetHeight * 0.75, 1));
      backdrop.style.transition = animated ? "opacity 0.3s ease" : "none";
      backdrop.style.opacity = String(fade);
    }
  };

  const finishClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    onClose();
  };

  const dismissSheet = () => {
    if (!isMobileSheet()) {
      finishClose();
      return;
    }
    const sheet = sheetRef.current;
    if (!sheet) {
      finishClose();
      return;
    }
    applyOffset(sheet.offsetHeight + 24, true);
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      sheet.removeEventListener("transitionend", onEnd);
      finishClose();
    };
    sheet.addEventListener("transitionend", onEnd);
    window.setTimeout(finishClose, 340);
  };

  const onHandlePointerDown = (e: React.PointerEvent) => {
    if (!isMobileSheet() || closingRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const drag = dragRef.current;
    drag.tracking = true;
    drag.startY = e.clientY;
    drag.lastY = e.clientY;
    drag.lastT = performance.now();
    drag.vy = 0;

    const sheet = sheetRef.current;
    sheet?.style.setProperty("animation", "none");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onHandlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.tracking) return;

    const now = performance.now();
    const dy = Math.max(0, e.clientY - drag.startY);
    const dt = Math.max(now - drag.lastT, 1);
    drag.vy = (e.clientY - drag.lastY) / dt;
    drag.lastY = e.clientY;
    drag.lastT = now;
    applyOffset(dy, false);
  };

  const onHandlePointerUp = () => {
    const drag = dragRef.current;
    if (!drag.tracking) return;
    drag.tracking = false;

    const shouldClose =
      drag.offset > DISMISS_DISTANCE || drag.vy > DISMISS_VELOCITY;

    if (shouldClose) {
      dismissSheet();
      return;
    }
    applyOffset(0, true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-stretch sm:justify-end">
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close details"
        className="work-panel-backdrop absolute inset-0 bg-ink/45"
        onClick={dismissSheet}
      />
      <aside
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-panel-title"
        className="work-panel relative z-10 flex h-[min(92dvh,100%)] w-full max-w-lg flex-col rounded-t-2xl border border-ink/10 bg-foam touch-pan-y sm:h-full sm:rounded-none sm:border-l sm:border-r-0 sm:border-t-0 sm:border-b-0 sm:touch-auto"
      >
        <div
          className="shrink-0 touch-none sm:contents"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        >
          <div
            className="flex cursor-grab justify-center pt-3 active:cursor-grabbing sm:hidden"
            aria-hidden
          >
            <span className="h-1.5 w-12 rounded-full bg-ink/20" />
          </div>

          <div className="flex items-start justify-between gap-3 border-b border-ink/10 px-5 pb-4 pt-3 sm:gap-4 sm:px-8 sm:py-5">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-white sm:size-12">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                    draggable={false}
                  />
                ) : (
                  <span
                    className="flex size-full items-center justify-center font-mono text-[0.7rem] font-medium text-sea"
                    aria-hidden
                  >
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {project.featured ? (
                    <span className="bg-ink px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-foam">
                      Featured
                    </span>
                  ) : null}
                  <span className="border border-ink/15 px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                    {project.kind}
                  </span>
                  <ProjectPlatformBadge platform={project.platform} />
                  {project.url ? (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-sea">
                      Live
                    </span>
                  ) : null}
                </div>
                <h3
                  id="work-panel-title"
                  className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-3xl"
                >
                  {project.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-ink/80">
                  {project.category}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                  {project.role}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissSheet}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex size-10 shrink-0 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-mist sm:size-9"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <p className="text-base leading-relaxed text-sea">{project.summary}</p>

          <h4 className="mt-8 font-display text-lg font-semibold tracking-tight text-ink sm:mt-10 sm:text-xl">
            Technical stack
          </h4>
          <div className="mt-4 sm:mt-5">
            <ProjectStackDetail stack={project.stack} />
          </div>

          <h4 className="mt-8 font-display text-lg font-semibold tracking-tight text-ink sm:mt-10 sm:text-xl">
            Key features
          </h4>
          <ul className="mt-4 space-y-3.5 sm:space-y-4">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="border-l-2 border-ink pl-3.5 text-[0.95rem] leading-relaxed text-sea sm:pl-4 sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-ink/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-4">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-h-12 w-full shrink-0 items-center justify-center gap-2 bg-ink px-4 text-sm font-medium leading-none text-foam transition-colors hover:bg-sea-mid sm:h-11 sm:min-h-11"
            >
              Visit live site
              <ExternalLink
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          ) : (
            <button
              type="button"
              onClick={dismissSheet}
              className="inline-flex h-12 min-h-12 w-full shrink-0 items-center justify-center bg-ink px-4 text-sm font-medium leading-none text-foam transition-colors hover:bg-sea-mid sm:h-11 sm:min-h-11"
            >
              Close
            </button>
          )}
        </div>
      </aside>
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
        <div className="flex flex-col gap-3 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-10">
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

        <ul className="mt-2 sm:mt-6">
          {projects.map((project, i) => (
            <li
              key={project.name}
              className="animate-rise"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group relative w-full border-b border-ink/10 px-0 py-6 text-left transition-colors first:border-t first:border-ink/10 hover:bg-foam active:bg-foam sm:py-10"
              >
                <span
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-ink transition-transform duration-300 group-active:scale-y-100 sm:group-hover:scale-y-100"
                  aria-hidden
                />

                <div className="px-1 sm:hidden">
                  <div className="flex gap-3.5">
                    <div className="flex w-12 shrink-0 flex-col items-center gap-2 pt-0.5">
                      <span className="font-mono text-[0.6rem] tabular-nums tracking-wider text-sea/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ProjectMark project={project} size="md" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="min-w-0 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-ink">
                          {project.name}
                        </h3>
                        <span
                          className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/45 transition-transform duration-300 group-active:translate-x-0.5"
                          aria-hidden
                        >
                          View →
                        </span>
                      </div>

                      <p className="mt-1.5 text-[0.8rem] font-medium leading-snug text-ink/75">
                        {project.featured ? (
                          <span className="text-ink">Featured · </span>
                        ) : null}
                        {project.category}
                      </p>

                      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-sea">
                        {project.kind}
                        <span className="mx-1.5 text-ink/20">·</span>
                        {projectPlatformMeta[project.platform].label}
                      </p>

                      <p className="mt-3 line-clamp-2 text-[0.9rem] leading-relaxed text-sea">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden gap-6 px-4 sm:flex sm:items-start">
                  <span className="w-10 shrink-0 pt-1.5 font-mono text-sm tabular-nums text-sea">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-5">
                      <ProjectMark project={project} size="md" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-sea-mid">
                              {project.name}
                            </h3>
                            <p className="mt-1.5 text-sm font-medium text-ink/75">
                              {project.category}
                            </p>
                            <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                              {project.role}
                              {project.url ? (
                                <>
                                  <span className="mx-2 text-ink/25">·</span>
                                  <span className="normal-case tracking-normal text-ink/55">
                                    Live
                                  </span>
                                </>
                              ) : null}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                            {project.featured ? (
                              <span className="whitespace-nowrap bg-ink px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-foam">
                                Featured
                              </span>
                            ) : null}
                            <span className="whitespace-nowrap border border-ink/15 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                              {project.kind}
                            </span>
                            <ProjectPlatformBadge platform={project.platform} />
                            <span
                              className="inline-flex size-9 items-center justify-center bg-ink text-sm text-foam transition-transform duration-300 group-hover:translate-x-0.5"
                              aria-hidden
                            >
                              →
                            </span>
                          </div>
                        </div>

                        <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-sea">
                          {project.summary}
                        </p>

                        <div className="mt-4">
                          <ProjectStackPreview stack={project.stack} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <ProjectDetailSheet
          project={active}
          onClose={() => setActive(null)}
        />
      ) : null}
    </section>
  );
}
