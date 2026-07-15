import { site } from "@/lib/portfolio-data";
import { TechBackdrop } from "@/components/tech-backdrop";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-mist">
      <TechBackdrop variant="hero" />
      <div className="shell relative z-10 grid min-h-[calc(100svh-3.5rem)] grid-cols-1 items-end gap-12 pb-16 pt-16 lg:grid-cols-[1.4fr_0.8fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <p className="animate-rise font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
            {site.role}
          </p>
          <h1
            className="animate-rise mt-5 font-display text-[clamp(3.5rem,14vw,8rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-ink"
            style={{ animationDelay: "80ms" }}
          >
            {site.name.split(" ")[0]}
            <br />
            {site.name.split(" ").slice(1).join(" ")}
          </h1>
          <p
            className="animate-rise mt-8 max-w-md text-base leading-relaxed text-sea sm:text-lg"
            style={{ animationDelay: "150ms" }}
          >
            {site.tagline}
          </p>
        </div>

        <div
          className="animate-rise flex flex-col gap-8 border-t border-ink/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          style={{ animationDelay: "220ms" }}
        >
          <p className="text-sm leading-relaxed text-sea">
            Available for freelance builds and full-time roles. Based in{" "}
            <span className="text-ink">Mati City, Philippines</span>.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex h-11 items-center bg-ink px-5 text-sm font-medium text-foam transition-colors hover:bg-sea-mid"
            >
              See selected work
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 items-center border border-ink/20 px-5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Start a conversation
            </a>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sea">
              Focus
            </p>
            <p className="mt-2 font-display text-base font-medium text-ink">
              Web & mobile products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
