import Image from "next/image";
import { Globe, MonitorSmartphone, Smartphone } from "lucide-react";
import {
  projectPlatformMeta,
  type Project,
  type ProjectPlatform,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const platformIcons: Record<
  ProjectPlatform,
  typeof MonitorSmartphone
> = {
  "cross-platform": MonitorSmartphone,
  mobile: Smartphone,
  website: Globe,
};

export function ProjectPlatformIcon({
  platform,
  className,
}: {
  platform: ProjectPlatform;
  className?: string;
}) {
  const Icon = platformIcons[platform];
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

export function ProjectMark({
  project,
  size = "md",
  className,
}: {
  project: Project;
  size?: "sm" | "md";
  className?: string;
}) {
  const dim = size === "sm" ? "size-11" : "size-12";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-ink/10 bg-white transition-transform duration-300 group-hover:scale-105 group-active:scale-105",
        dim,
        className
      )}
    >
      {project.logo ? (
        <Image
          src={project.logo}
          alt=""
          fill
          sizes={size === "sm" ? "44px" : "48px"}
          className="object-contain p-1.5"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-mono text-[0.7rem] font-medium text-sea">
          {project.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function ProjectPlatformBadge({
  platform,
  className,
}: {
  platform: ProjectPlatform;
  className?: string;
}) {
  const meta = projectPlatformMeta[platform];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-ink/15 px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink/70 sm:text-[0.65rem] sm:tracking-[0.14em]",
        className
      )}
    >
      <ProjectPlatformIcon platform={platform} className="size-3 shrink-0" />
      {meta.label}
    </span>
  );
}
