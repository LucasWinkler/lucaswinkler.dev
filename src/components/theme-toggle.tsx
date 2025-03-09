"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitorIcon, MonitorIconHandle } from "@/components/ui/icons/monitor";
import { MoonIcon, MoonIconHandle } from "@/components/ui/icons/moon";
import { SunIcon, SunIconHandle } from "@/components/ui/icons/sun";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "ghost" | "default";
}

export const ThemeToggle = ({ variant = "default" }: ThemeToggleProps) => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const triggerSunIconRef = useRef<SunIconHandle>(null);
  const triggerMoonIconRef = useRef<MoonIconHandle>(null);
  const dropdownSunIconRef = useRef<SunIconHandle>(null);
  const dropdownMoonIconRef = useRef<MoonIconHandle>(null);
  const dropdownMonitorIconRef = useRef<MonitorIconHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnimation =
    (
      ref: React.RefObject<
        SunIconHandle | MoonIconHandle | MonitorIconHandle | null
      >,
      action: "start" | "stop",
    ) =>
    () => {
      if (ref.current) {
        if (action === "start") {
          ref.current.startAnimation();
        } else {
          ref.current.stopAnimation();
        }
      }
    };

  if (!mounted) {
    return (
      <Button
        variant={variant === "ghost" ? "ghost" : "outline"}
        size={variant === "ghost" ? "iconMedium" : "icon"}
        className={cn(
          "",
          variant === "default" &&
            "transition-all size-10 duration-200 ease-out hover:bg-accent/50",
          variant === "ghost" &&
            "hover:text-accent-foreground focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex items-center justify-center transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
        )}
      >
        <div
          className={cn(
            "size-4.5 rounded-full bg-secondary",
            variant === "ghost" && "size-5",
          )}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          variant === "default" &&
            "transition-all size-10 duration-200 ease-out hover:bg-accent/50",
          variant === "ghost" &&
            "hover:text-accent-foreground focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex items-center justify-center transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
        )}
        asChild
      >
        <Button
          onMouseEnter={handleAnimation(
            resolvedTheme === "light" ? triggerSunIconRef : triggerMoonIconRef,
            "start",
          )}
          onMouseLeave={handleAnimation(
            resolvedTheme === "light" ? triggerSunIconRef : triggerMoonIconRef,
            "stop",
          )}
          onFocus={handleAnimation(
            resolvedTheme === "light" ? triggerSunIconRef : triggerMoonIconRef,
            "start",
          )}
          onBlur={handleAnimation(
            resolvedTheme === "light" ? triggerSunIconRef : triggerMoonIconRef,
            "stop",
          )}
          variant={variant === "ghost" ? "ghost" : "outline"}
          size={variant === "ghost" ? "iconMedium" : "icon"}
        >
          {resolvedTheme === "light" ? (
            <SunIcon
              className={cn("size-4.5", variant === "ghost" && "size-5")}
              ref={triggerSunIconRef}
            />
          ) : (
            <MoonIcon
              className={cn("size-4.5", variant === "ghost" && "size-5")}
              ref={triggerMoonIconRef}
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1" align="end">
        <DropdownMenuItem
          className={theme === "light" ? "bg-accent/75" : ""}
          onClick={() => setTheme("light")}
          onMouseEnter={handleAnimation(dropdownSunIconRef, "start")}
          onMouseLeave={handleAnimation(dropdownSunIconRef, "stop")}
          onFocus={handleAnimation(dropdownSunIconRef, "start")}
          onBlur={handleAnimation(dropdownSunIconRef, "stop")}
        >
          <SunIcon className="size-4.5" ref={dropdownSunIconRef} aria-hidden />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "dark" ? "bg-accent/75" : ""}
          onClick={() => setTheme("dark")}
          onMouseEnter={handleAnimation(dropdownMoonIconRef, "start")}
          onMouseLeave={handleAnimation(dropdownMoonIconRef, "stop")}
          onFocus={handleAnimation(dropdownMoonIconRef, "start")}
          onBlur={handleAnimation(dropdownMoonIconRef, "stop")}
        >
          <MoonIcon
            className="size-4.5"
            ref={dropdownMoonIconRef}
            aria-hidden
          />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "system" ? "bg-accent/75" : ""}
          onClick={() => setTheme("system")}
          onMouseEnter={handleAnimation(dropdownMonitorIconRef, "start")}
          onMouseLeave={handleAnimation(dropdownMonitorIconRef, "stop")}
          onFocus={handleAnimation(dropdownMonitorIconRef, "start")}
          onBlur={handleAnimation(dropdownMonitorIconRef, "stop")}
        >
          <MonitorIcon
            className="size-4.5"
            ref={dropdownMonitorIconRef}
            aria-hidden
          />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
