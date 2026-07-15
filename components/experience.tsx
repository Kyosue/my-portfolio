import Image from "next/image";
import { education, experience } from "@/lib/portfolio-data";
import { TechBackdrop } from "@/components/tech-backdrop";

export function Experience() {
  return (
    <section id="path" className="relative overflow-hidden bg-mist">
      <TechBackdrop variant="section" />
      <div className="shell relative z-10 py-20 sm:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
            02 — Path
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Experience &amp; education
          </h2>
        </div>

        <ol className="relative space-y-0">
          {experience.map((job, index) => (
            <li
              key={`${job.org}-${job.title}`}
              className="grid gap-4 border-t border-ink/10 py-10 md:grid-cols-[10rem_1fr] lg:grid-cols-[10rem_16rem_1fr] lg:gap-10"
            >
              <p className="font-mono text-xs text-sea tabular-nums md:pt-1">
                {job.period}
              </p>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {job.title}
                </h3>
                <p className="mt-2 text-sm text-sea">
                  {job.org}
                  <span className="text-ink/30"> · </span>
                  {job.location}
                </p>
                {index === 0 ? (
                  <p className="mt-3 inline-block bg-ink px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foam">
                    Current focus
                  </p>
                ) : null}
              </div>
              <ul className="space-y-2.5 md:col-span-2 lg:col-span-1">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-sea"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-8 border-t border-ink/10 bg-foam px-6 py-10 sm:gap-10 sm:px-8 lg:grid-cols-[10rem_minmax(0,1fr)_13rem] lg:items-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sea">
            Education
          </p>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {education.degree}
            </h3>
            <p className="mt-3 text-sm text-sea">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-sea">{education.period}</p>
          </div>
          <div className="relative aspect-square w-full max-w-[13rem] overflow-hidden border border-ink/10 bg-mist lg:max-w-none">
            <Image
              src={education.photo}
              alt={`${education.degree} graduation portrait of Reymund Abelgas`}
              fill
              sizes="208px"
              className="object-cover object-[center_18%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
