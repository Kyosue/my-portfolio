"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

function applyThemeWithTransition(setTheme: (value: string) => void, value: string) {
  const root = document.documentElement;
  const run = () => setTheme(value);

  root.classList.add("theme-transition");
  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 400);

  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => void;
  };

  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(run);
    return;
  }

  run();
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn("flex overflow-hidden border border-ink/15", className)}
    >
      {modes.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} theme`}
            aria-pressed={active}
            title={label}
            onClick={() => {
              if (theme === value) return;
              applyThemeWithTransition(setTheme, value);
            }}
            className={cn(
              "flex size-7 items-center justify-center transition-colors duration-300",
              active
                ? "bg-ink text-foam"
                : "text-sea hover:bg-mist hover:text-ink"
            )}
          >
            <Icon className="size-3" strokeWidth={1.75} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
