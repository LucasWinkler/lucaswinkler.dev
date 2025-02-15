import { Badge } from "@/components/ui/badge";

interface AvailabilityBadgeProps {
  className?: string;
}

export const AvailabilityBadge = ({ className }: AvailabilityBadgeProps) => {
  return (
    <Badge variant="status" className={className}>
      <span className="relative mr-1 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      Available for opportunities
    </Badge>
  );
};
