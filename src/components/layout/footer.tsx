import { SOCIAL_LINKS } from "@/constants/links";
import { Container } from "./container";
import { config } from "@/config";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 mt-auto border-t">
      <Container>
        <div className="flex flex-col items-center gap-6 py-12 sm:py-16">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground-dark-secondary hover:text-foreground-dark flex items-center gap-2 transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                <link.icon className="size-5" />
                <span className="text-sm">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="text-foreground-dark-secondary flex flex-col items-center gap-2 text-center text-sm">
            <a
              className="hover:text-foreground-dark transition-colors"
              href={`mailto:${config.contactEmail}`}
            >
              {config.contactEmail}
            </a>
            <p>
              &copy; {currentYear} {config.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
