"use client";

import { Cursor } from "@/components/ui/cursor";
import { Project } from "@/types/project";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { useCursor } from "@/hooks/use-cursor";
import { ProjectCursor } from "./project-cursor";
import { ProjectCardContent } from "./project-card-content";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isTouchDevice = useTouchDevice();
  const { isHovering, targetRef, handlePositionChange } = useCursor();

  if (isTouchDevice) {
    return <ProjectCardContent project={project} />;
  }

  return (
    <div ref={targetRef}>
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
      <ProjectCardContent project={project} />
    </div>
  );
}
