import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild, ...props }: ContainerProps, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        className={cn(
          "container mx-auto max-w-6xl px-6 sm:px-8 lg:px-10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
