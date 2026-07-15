"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const before = document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    const shift = document.documentElement.clientWidth - before;
    if (shift > 0) {
      document.body.style.paddingRight = `${shift}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-ink/10 bg-foam/90 backdrop-blur-md"
          : "border-transparent bg-mist/80 backdrop-blur-sm"
      )}
    >
      <nav className="shell flex h-14 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-ink"
        >
          {site.name.split(" ")[0]}
          <span className="text-sea">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-sea transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            className="text-sm font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Email
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center text-ink"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full origin-center bg-current transition-[top,transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "top-[0.375rem] rotate-45" : "top-0 rotate-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[0.375rem] h-0.5 w-full bg-current transition-[opacity,transform] duration-200 ease-out",
                  open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full origin-center bg-current transition-[top,transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "top-[0.375rem] -rotate-45" : "top-3 rotate-0"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "nav-menu grid overflow-hidden md:hidden",
          open ? "nav-menu--open" : "nav-menu--closed"
        )}
        inert={!open ? true : undefined}
      >
        <div className="min-h-0">
          <div
            className={cn(
              "border-t border-ink/10 bg-foam px-5 py-6 transition-opacity duration-300 ease-out",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  className={cn(
                    "nav-menu-item",
                    open && "nav-menu-item--in"
                  )}
                  style={{ ["--i" as string]: i }}
                >
                  <a
                    href={link.href}
                    className="font-display text-2xl font-semibold text-ink"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li
                className={cn("nav-menu-item", open && "nav-menu-item--in")}
                style={{ ["--i" as string]: navLinks.length }}
              >
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-sea"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
