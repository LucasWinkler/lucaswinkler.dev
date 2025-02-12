import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      className={cn(
        "font-medium tracking-widest text-white uppercase",
        className,
      )}
      href="/"
      aria-label="Logo"
      aria-description="Link to the home page"
    >
      Lucas Winkler
    </Link>
  );
};
