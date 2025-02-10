'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { MAX_SUBLINKS, NAV_CTA, NAV_LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';

export const DesktopNav = () => {
  return (
    <NavigationMenu className='dark hidden md:flex'>
      <NavigationMenuList>
        {NAV_LINKS.map(({ href, label, sublinks }) => {
          const hasSublinks = sublinks && sublinks.links.length > 0;

          return (
            <NavigationMenuItem key={href}>
              {hasSublinks ? (
                <>
                  <NavigationMenuTrigger className='bg-transparent hover:bg-transparent'>
                    {label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <a
                            className='flex group/nav-sublink h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:from-muted/60 transition-colors ease-out duration-150'
                            href={href}>
                            <div className='mb-2 mt-4 text-lg font-medium group-hover/nav-sublink:scale-95 transition-transform ease-out duration-150'>
                              {sublinks.label}
                            </div>
                            {sublinks.description && (
                              <p className='text-sm leading-tight text-muted-foreground group-hover/nav-sublink:scale-95 transition-transform ease-out duration-150'>
                                {sublinks.description}
                              </p>
                            )}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {sublinks.links.slice(0, MAX_SUBLINKS).map(sublink => (
                        <li className='col-span-1' key={sublink.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={sublink.href}
                              className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                              <div className='text-sm font-medium leading-none'>
                                {sublink.label}
                              </div>
                              <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
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
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn('px-10', navigationMenuTriggerStyle())}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuItem>
          <Link href={NAV_CTA.href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {NAV_CTA.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
