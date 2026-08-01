import { site, skills } from "@/lib/portfolio-data";

const skillGroups = [
  { label: "Languages", items: skills.languages },
  { label: "Frameworks", items: skills.frameworks },
  { label: "Data", items: skills.databases },
  { label: "Cloud", items: skills.cloud },
  { label: "Tools", items: skills.tools },
] as const;

export function About() {
  return (
    <section id="studio" className="bg-foam">
      <div className="shell py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
            03 — Studio
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            How I work
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sea sm:text-lg">
            {site.profile}
          </p>
        </div>

        <div className="mt-16 border-t border-ink/10 pt-14">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
            Technical stack
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 lg:grid-cols-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-display text-sm font-semibold text-ink">
                  {group.label}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-sea">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
