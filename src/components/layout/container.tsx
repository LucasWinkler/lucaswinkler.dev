import { forwardRef } from 'react';
// import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, ...props }: ContainerProps, ref) => {
    const Comp = 'div'; // asChild ? Slot : 'div';

    return (
      <Comp
        className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
