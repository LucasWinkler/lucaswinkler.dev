import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names using clsx and tailwind-merge
 * @param inputs - Class values to merge
 * @returns Merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
