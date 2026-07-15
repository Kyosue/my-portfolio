"use client";

import { cn } from "@/lib/utils";

type TechBackdropProps = {
  className?: string;
  variant?: "hero" | "section" | "dark";
};

export function TechBackdrop({
  className,
  variant = "hero",
}: TechBackdropProps) {
  const dense = variant === "hero";
  const onDark = variant === "dark";

  return (
    <div
      className={cn(
        "tech-backdrop pointer-events-none absolute inset-0",
        onDark && "tech-backdrop--dark",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "tech-grid",
          dense ? "tech-grid--dense" : "tech-grid--soft"
        )}
      />
      <div className="tech-dots" />
      {dense ? <div className="tech-scan" /> : null}
      {dense ? (
        <>
          <div className="tech-orbit tech-orbit--a" />
          <div className="tech-orbit tech-orbit--b" />
          <div className="tech-node tech-node--1" />
          <div className="tech-node tech-node--2" />
          <div className="tech-node tech-node--3" />
          <svg className="tech-circuit" viewBox="0 0 400 240" fill="none">
            <path
              d="M20 40 H120 V100 H220 M220 100 V180 H360 M220 100 H300 V40 H380"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="120" cy="40" r="3" fill="currentColor" />
            <circle cx="220" cy="100" r="3" fill="currentColor" />
            <circle cx="360" cy="180" r="3" fill="currentColor" />
            <circle cx="380" cy="40" r="3" fill="currentColor" />
          </svg>
          <p className="tech-code">
            {"const stack = ['react-native','firebase','node'];"}
            <br />
            {"await ship({ platform: 'mobile+web' });"}
          </p>
        </>
      ) : null}
      <span className="tech-mark tech-mark--tl" />
      <span className="tech-mark tech-mark--tr" />
      <span className="tech-mark tech-mark--bl" />
      <span className="tech-mark tech-mark--br" />
    </div>
  );
}
