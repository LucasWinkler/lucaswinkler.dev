"use client";

import Image from "next/image";
import { Cursor } from "@/components/ui/cursor";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { useCursor } from "@/hooks/use-cursor";
import type { Project } from "@/types/project";
import { ProjectCursor } from "./project-cursor";

interface ProjectImageProps {
  image: Project["image"];
}

export const ProjectImage = ({ image }: ProjectImageProps) => {
  const { isHovering, targetRef, handlePositionChange } = useCursor();
  const isTouchDevice = useTouchDevice();

  return (
    <div
      className="relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[16/9]"
      ref={!isTouchDevice ? targetRef : undefined}
    >
      {!isTouchDevice && (
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          springConfig={{
            bounce: 0.001,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.15,
          }}
          onPositionChange={handlePositionChange}
        >
          <ProjectCursor isHovering={isHovering} />
        </Cursor>
      )}

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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  );
};
