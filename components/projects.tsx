"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | null>(null);
  const programScroll = useRef(false);
  const [active, setActive] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

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

  useEffect(() => {
    return () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, []);

  const measureIndex = (track: HTMLDivElement) => {
    const cards = [...track.querySelectorAll<HTMLElement>("[data-work-card]")];
    if (!cards.length) return 0;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll > 0 && track.scrollLeft >= maxScroll - 4) {
      return cards.length - 1;
    }

    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const target = track.scrollLeft + pad;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - target);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  const syncProgress = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.querySelectorAll<HTMLElement>("[data-work-card]")];
    if (cards.length < 2) {
      setProgress(0);
      return;
    }

    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    // Progress is relative to first→last snap positions, not the trailing spacer.
    const start = Math.max(0, cards[0].offsetLeft - pad);
    const end = Math.max(1, cards[cards.length - 1].offsetLeft - pad);
    const ratio = (track.scrollLeft - start) / (end - start);
    if (ratio >= 0.985 || track.scrollLeft >= end - 2) {
      setProgress(1);
      return;
    }
    if (ratio <= 0.015 || track.scrollLeft <= start + 2) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(1, Math.max(0, ratio)));
  };

  const applyIndex = (next: number) => {
    setIndex(next);
    if (next === projects.length - 1) setProgress(1);
    else if (next === 0) setProgress(0);
    else syncProgress();
  };

  const settleIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    applyIndex(measureIndex(track));
    programScroll.current = false;
  };

  const scrollToIndex = (i: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-work-card]")[i];
    if (!track || !card) return;

    programScroll.current = true;
    setIndex(i);
    if (i === 0) setProgress(0);
    else if (i === projects.length - 1) setProgress(1);
    else setProgress(i / (projects.length - 1));

    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const delta =
      card.getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      pad;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextLeft = Math.min(
      maxScroll,
      Math.max(0, track.scrollLeft + delta)
    );

    track.scrollTo({ left: nextLeft, behavior });

    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(
      settleIndex,
      behavior === "smooth" ? 420 : 40
    );
  };

  const scrollByCard = (dir: -1 | 1) => {
    const next = Math.min(projects.length - 1, Math.max(0, index + dir));
    if (next === index) {
      // Force last/first alignment if index is already at edge but scroll isn't.
      scrollToIndex(next);
      return;
    }
    scrollToIndex(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    if (!programScroll.current) {
      syncProgress();
      // Keep active card in sync while dragging — don't wait for settle.
      const next = measureIndex(track);
      setIndex((prev) => (prev === next ? prev : next));
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let capturing = false;
    let touchMoved = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const snapNow = () => {
      const trackEl = trackRef.current;
      if (!trackEl || programScroll.current) return;
      // Kill momentum first so snap starts immediately on release.
      trackEl.scrollTo({ left: trackEl.scrollLeft, behavior: "auto" });
      const next = measureIndex(trackEl);
      scrollToIndex(next);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, label")) return;

      startX = e.clientX;
      startScroll = track.scrollLeft;
      moved = false;
      capturing = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons !== 1) return;
      if (e.pointerType !== "mouse") return;
      const target = e.target as HTMLElement | null;
      if (
        !capturing &&
        target?.closest("button, a, input, textarea, select, label")
      ) {
        return;
      }

      const dx = e.clientX - startX;
      if (!capturing) {
        if (Math.abs(dx) < 8) return;
        capturing = true;
        moved = true;
        setDragging(true);
        track.setPointerCapture(e.pointerId);
      }
      track.scrollLeft = startScroll - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!capturing) return;
      if (track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }
      capturing = false;
      setDragging(false);
      if (moved) {
        snapNow();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchMoved = false;
      touchStartX = e.touches[0]?.clientX ?? 0;
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0]?.clientX ?? touchStartX;
      const y = e.touches[0]?.clientY ?? touchStartY;
      const dx = Math.abs(x - touchStartX);
      const dy = Math.abs(y - touchStartY);
      if (dx > 8 && dx > dy) touchMoved = true;
    };

    const onTouchEnd = () => {
      if (!touchMoved) return;
      snapNow();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-mist">
      <div className="shell pt-20 sm:pt-28">
        <div className="flex flex-col gap-8 border-b border-ink/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
              01 — Work
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Products I&apos;ve shipped
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p
              className="work-index font-mono text-sm tabular-nums text-sea"
              aria-live="polite"
            >
              <span className="text-ink" key={index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-ink/25">/</span>
              {String(projects.length).padStart(2, "0")}
            </p>
            <div className="flex overflow-hidden border border-ink/15">
              <button
                type="button"
                aria-label="Previous project"
                disabled={index === 0}
                onClick={() => scrollByCard(-1)}
                className="flex h-11 w-12 items-center justify-center text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={index === projects.length - 1}
                onClick={() => scrollByCard(1)}
                className="flex h-11 w-12 items-center justify-center border-l border-ink/15 text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <div className="work-fade work-fade--left" aria-hidden />
        <div className="work-fade work-fade--right" aria-hidden />

        <div
          ref={trackRef}
          onScroll={onScroll}
          className={cn(
            "work-board flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] pb-6 sm:gap-5 sm:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))] sm:px-[max(2rem,calc((100vw-72rem)/2+2rem))]",
            dragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
        >
          {projects.map((project, i) => {
            const focused = i === index;
            return (
              <article
                key={project.name}
                data-work-card
                className={cn(
                  "work-frame group relative flex min-h-[27rem] w-[min(86vw,26.5rem)] shrink-0 snap-start snap-always flex-col justify-between overflow-hidden border p-7 transition-[transform,opacity,background-color,border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-[30rem] sm:w-[29rem] sm:p-9",
                  focused
                    ? "z-[1] scale-[1.02] border-ink bg-ink text-foam opacity-100 shadow-[0_28px_70px_rgba(11,18,32,0.22)]"
                    : "scale-[0.97] border-ink/10 bg-mist text-ink opacity-55 hover:border-ink/25 hover:opacity-80"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute -right-2 -top-6 font-display text-[8.5rem] font-semibold leading-none tracking-tight sm:-right-1 sm:text-[10rem]",
                    focused ? "text-foam/[0.06]" : "text-ink/[0.05]"
                  )}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-40",
                    focused ? "work-frame-grid--dark" : "work-frame-grid"
                  )}
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {project.logo ? (
                        <div
                          className={cn(
                            "relative size-11 shrink-0 overflow-hidden rounded-full border bg-white sm:size-12",
                            focused ? "border-foam/25" : "border-ink/10"
                          )}
                        >
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            fill
                            sizes="48px"
                            className="object-contain p-1.5"
                          />
                        </div>
                      ) : null}
                      <span
                        className={cn(
                          "font-mono text-[0.65rem] uppercase tracking-[0.18em]",
                          focused ? "text-foam/45" : "text-sea"
                        )}
                      >
                        {project.role}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[0.65rem] uppercase tracking-[0.16em]",
                        focused ? "text-foam/45" : "text-sea"
                      )}
                    >
                      Case study
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-12 max-w-[18ch] font-display text-[1.9rem] font-semibold leading-[1.05] tracking-tight sm:mt-14 sm:text-[2.4rem]",
                      focused ? "text-foam" : "text-ink"
                    )}
                  >
                    {project.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-5 max-w-[22rem] text-sm leading-relaxed sm:text-[0.95rem]",
                      focused ? "text-foam/65" : "text-sea"
                    )}
                  >
                    {project.summary}
                  </p>
                </div>

                <div className="relative mt-10">
                  <p
                    className={cn(
                      "font-mono text-[0.65rem] leading-relaxed tracking-[0.04em]",
                      focused ? "text-foam/40" : "text-ink/45"
                    )}
                  >
                    {project.stack.join("  ·  ")}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className={cn(
                      "mt-8 flex w-full items-center justify-between border-t pt-5 text-left transition-colors",
                      focused
                        ? "border-foam/15 hover:border-foam/35"
                        : "border-ink/10 hover:border-ink/30"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium",
                        focused ? "text-foam" : "text-ink"
                      )}
                    >
                      Open details
                    </span>
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-0.5",
                        focused ? "bg-foam text-ink" : "bg-ink text-foam"
                      )}
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
          {/* Enough trailing space so the last card can snap fully into the left padding. */}
          <div
            className="w-[calc(100vw-min(86vw,26.5rem)-2.5rem)] shrink-0 sm:w-[calc(100vw-29rem-4rem)]"
            aria-hidden
          />
        </div>
      </div>

      <div className="shell pb-20 pt-8 sm:pb-28">
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Scrub work board"
            className="work-rail group relative h-1.5 flex-1 cursor-pointer overflow-hidden bg-ink/10"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.min(
                1,
                Math.max(0, (e.clientX - rect.left) / rect.width)
              );
              const next = Math.round(ratio * (projects.length - 1));
              scrollToIndex(next);
            }}
          >
            <span
              className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
            <span
              className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border border-ink bg-foam opacity-0 shadow-sm transition-[left,opacity] duration-300 group-hover:opacity-100"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
              aria-hidden
            />
          </button>
          <p className="work-name hidden min-w-[10rem] truncate text-right font-mono text-xs text-sea sm:block">
            <span key={projects[index]?.name}>{projects[index]?.name}</span>
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 sm:hidden">
          {projects.map((project, i) => (
            <button
              key={project.name}
              type="button"
              aria-label={`Show ${project.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-ink" : "w-1.5 bg-ink/20"
              )}
            />
          ))}
        </div>
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
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                    {active.role}
                  </p>
                  <h3
                    id="work-panel-title"
                    className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink"
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

              <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                Stack
              </p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-ink/70">
                {active.stack.join("  ·  ")}
              </p>

              <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
                Highlights
              </p>
              <ul className="mt-4 space-y-4">
                {active.highlights.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-ink pl-4 text-sm leading-relaxed text-sea"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/10 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex h-11 w-full items-center justify-center bg-ink text-sm font-medium text-foam transition-colors hover:bg-sea-mid"
              >
                Close panel
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
