import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createSocialLinks, MAX_SUBLINKS, NAV_LINKS } from "@/constants/links";

export const DesktopNav = () => {
  const socialLinks = createSocialLinks();

  return (
    <div className="text-foreground-dark-tertiary hidden items-center gap-4 md:flex">
      <NavigationMenu role="navigation">
        <NavigationMenuList className="gap-2">
          {NAV_LINKS.map(({ href, label, sublinks }) => {
            const hasSublinks = sublinks && sublinks.links.length > 0;

            return (
              <NavigationMenuItem key={href}>
                {hasSublinks ? (
                  <>
                    <NavigationMenuTrigger
                      aria-label={`Open ${label} dropdown menu`}
                      className="font-normal"
                    >
                      {label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              aria-label={`Go to ${sublinks.label} page`}
                              className="group/nav-sublink from-muted/50 to-muted hover:from-muted/60 flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline transition-colors duration-150 ease-out outline-none select-none focus:shadow-md"
                              href={href}
                            >
                              <span
                                aria-describedby={`sublink-description-${label.toLowerCase()}`}
                                className="mt-4 mb-2 text-lg font-medium transition-transform duration-150 ease-out group-hover/nav-sublink:scale-95"
                              >
                                {sublinks.label}
                              </span>
                              {sublinks.description && (
                                <p
                                  id={`sublink-description-${label.toLowerCase()}`}
                                  className="text-foreground-dark-secondary text-sm leading-tight transition-transform duration-150 ease-out group-hover/nav-sublink:scale-95"
                                >
                                  {sublinks.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {sublinks.links
                          .slice(0, MAX_SUBLINKS)
                          .map((sublink) => (
                            <li className="col-span-1" key={sublink.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  aria-label={`Go to ${sublink.label} page`}
                                  href={sublink.href}
                                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                                >
                                  <span
                                    aria-describedby={`sublink-description-${sublink.label.toLowerCase()}`}
                                    className="text-sm leading-none font-medium"
                                  >
                                    {sublink.label}
                                  </span>
                                  <p
                                    id={`sublink-description-${sublink.label.toLowerCase()}`}
                                    className="text-foreground-dark-secondary line-clamp-2 text-sm leading-snug"
                                  >
                                    {sublink.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      className: "px-3",
                    })}
                  >
                    <Link href={href}>{label}</Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      {socialLinks.length > 0 && (
        <ul className="flex items-center gap-1 border-l border-gray-800 pl-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                className="hover:text-accent-foreground focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 inline-flex items-center justify-center p-2 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
                href={href}
              >
                <Icon className="size-5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
