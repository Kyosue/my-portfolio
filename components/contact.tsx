import { site } from "@/lib/portfolio-data";
import { TechBackdrop } from "@/components/tech-backdrop";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-sea-deep text-white">
      <TechBackdrop variant="dark" />
      <div className="shell relative z-10 grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
            04 — Contact
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Tell me what you&apos;re building
          </h2>
          <p className="mt-5 max-w-md text-base text-white/55">
            Open to freelance projects and full-time roles. I reply to every
            serious inquiry.
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/15 pt-8 lg:border-t-0 lg:pt-0">
          <a
            href={`mailto:${site.email}`}
            className="font-display text-xl font-semibold text-white transition-opacity hover:opacity-70 sm:text-2xl"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="text-base text-white/60 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
          <p className="text-sm text-white/40">{site.location}</p>
          <a
            href={site.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-mist">
      <div className="shell flex flex-col gap-3 py-8 text-sm text-sea sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display font-medium text-ink">
          © 2026 {site.name}
        </p>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
          {site.role}
        </p>
      </div>
    </footer>
  );
}
