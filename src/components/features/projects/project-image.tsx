import Image from "next/image";
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
    <div className="relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[16/9]">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <Image
        src={image.src || "/images/project-placeholder.webp"}
        alt={image.alt}
        fill
        className="z-10 object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(min-width: 1024px) 90vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        unoptimized
      />
    </div>
  );
};
