"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function distance(a: Touch, b: Touch) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

type Transform = {
  scale: number;
  x: number;
  y: number;
};

export function ResumeZoomViewer({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<Transform>({ scale: 1, x: 0, y: 0 });
  const gestureRef = useRef({
    mode: "none" as "none" | "pan" | "pinch",
    startScale: 1,
    startDist: 0,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    lastTap: 0,
  });

  const applyTransform = (animated = false) => {
    const el = contentRef.current;
    if (!el) return;
    const { scale, x, y } = transformRef.current;
    el.style.transition = animated
      ? "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const clampTransform = () => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    const t = transformRef.current;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const cw = content.offsetWidth * t.scale;
    const ch = content.offsetHeight * t.scale;
    const maxX = Math.max(0, (cw - vw) / 2);
    const maxY = Math.max(0, (ch - vh) / 2);
    t.x = Math.min(maxX, Math.max(-maxX, t.x));
    t.y = Math.min(maxY, Math.max(-maxY, t.y));
  };

  const reset = (animated = true) => {
    transformRef.current = { scale: 1, x: 0, y: 0 };
    applyTransform(animated);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onTouchStart = (e: TouchEvent) => {
      const gesture = gestureRef.current;
      const t = transformRef.current;

      if (e.touches.length === 2) {
        e.preventDefault();
        gesture.mode = "pinch";
        gesture.startDist = distance(e.touches[0], e.touches[1]);
        gesture.startScale = t.scale;
        gesture.originX = t.x;
        gesture.originY = t.y;
        return;
      }

      if (e.touches.length === 1) {
        const now = performance.now();
        if (now - gesture.lastTap < 280) {
          e.preventDefault();
          if (t.scale > 1.05) {
            reset(true);
          } else {
            const rect = viewport.getBoundingClientRect();
            const touch = e.touches[0];
            const cx = touch.clientX - rect.left - rect.width / 2;
            const cy = touch.clientY - rect.top - rect.height / 2;
            t.scale = 2.25;
            t.x = -cx * (t.scale - 1);
            t.y = -cy * (t.scale - 1);
            clampTransform();
            applyTransform(true);
          }
          gesture.lastTap = 0;
          gesture.mode = "none";
          return;
        }
        gesture.lastTap = now;

        gesture.mode = "pan";
        gesture.startX = e.touches[0].clientX;
        gesture.startY = e.touches[0].clientY;
        gesture.originX = t.x;
        gesture.originY = t.y;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const gesture = gestureRef.current;
      const t = transformRef.current;

      if (gesture.mode === "pinch" && e.touches.length === 2) {
        e.preventDefault();
        const dist = distance(e.touches[0], e.touches[1]);
        const next = Math.min(
          MAX_SCALE,
          Math.max(MIN_SCALE, gesture.startScale * (dist / gesture.startDist))
        );
        t.scale = next;
        clampTransform();
        applyTransform(false);
        return;
      }

      if (gesture.mode === "pan" && e.touches.length === 1) {
        e.preventDefault();
        t.x = gesture.originX + (e.touches[0].clientX - gesture.startX);
        t.y = gesture.originY + (e.touches[0].clientY - gesture.startY);
        clampTransform();
        applyTransform(false);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const gesture = gestureRef.current;
      if (e.touches.length === 0) {
        gesture.mode = "none";
        if (transformRef.current.scale < 1.05) {
          reset(true);
        } else {
          clampTransform();
          applyTransform(true);
        }
        return;
      }
      if (e.touches.length === 1 && gesture.mode === "pinch") {
        gesture.mode = "pan";
        gesture.startX = e.touches[0].clientX;
        gesture.startY = e.touches[0].clientY;
        gesture.originX = transformRef.current.x;
        gesture.originY = transformRef.current.y;
      }
    };

    viewport.addEventListener("touchstart", onTouchStart, { passive: false });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd);
    viewport.addEventListener("touchcancel", onTouchEnd);

    return () => {
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative min-h-0 flex-1 touch-none overflow-hidden bg-mist"
    >
      <p className="pointer-events-none absolute inset-x-0 top-1.5 z-[1] text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-sea">
        Pinch to zoom · Double-tap
      </p>
      <div className="flex h-full items-center justify-center p-2">
        <div
          ref={contentRef}
          className="origin-center will-change-transform"
          style={{ transform: "translate3d(0,0,0) scale(1)" }}
        >
          <Image
            src={src}
            alt={alt}
            width={2550}
            height={3301}
            className="pointer-events-none mx-auto block h-auto w-full max-w-3xl select-none bg-white"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
