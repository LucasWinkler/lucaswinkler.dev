"use client";

import { createSocialLinks } from "@/constants/links";

export const FooterSocials = () => {
  const socialLinks = createSocialLinks();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {socialLinks.map(({ href, icon: SocialIcon, label, iconRef }) => (
        <a
          key={href}
          href={href}
          className="text-foreground-dark-secondary hover:text-foreground-dark flex items-center gap-2 transition-colors"
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`Visit ${label} profile`}
          onMouseEnter={() => iconRef?.current?.startAnimation()}
          onMouseLeave={() => iconRef?.current?.stopAnimation()}
          onFocus={() => iconRef?.current?.startAnimation()}
          onBlur={() => iconRef?.current?.stopAnimation()}
        >
          <SocialIcon className="size-4 sm:size-5" ref={iconRef} aria-hidden />
          <span className="text-xs sm:text-sm">{label}</span>
        </a>
      ))}
    </div>
  );
};
