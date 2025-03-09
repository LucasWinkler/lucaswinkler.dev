import Image from "next/image";

import placeholder from "@/../public/images/project-placeholder.webp";
import type { Project } from "@/types/project";

interface ProjectImageProps {
  image: Project["image"];
  priority?: boolean;
}

export const ProjectImage = ({
  image,
  priority = false,
}: ProjectImageProps) => {
  return (
    <div className="relative aspect-[16/9] min-[56.25rem]:aspect-[16/10] lg:aspect-[16/9]">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="absolute inset-0 opacity-[0.15] bg-radial-[circle_at_1px_1px] from-slate-500 dark:from-white/20 to-transparent from-[1px] to-[1px] bg-[size:32px_32px]" />
      </div>
      <Image
        src={image.src || placeholder}
        alt={image.alt}
        fill
        className="z-10 object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={`
          (min-width: 1024px) calc(58.33% - 48px), 
          (min-width: 900px) calc(50% - 32px),
          calc(100vw - 48px)
        `}
        priority={priority}
        draggable={false}
      />
    </div>
  );
};
