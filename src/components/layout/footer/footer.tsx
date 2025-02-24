import { config } from "@/config";

import { Container } from "../container";
import { FooterSocials } from "./footer-socials";

export const Footer = () => {
  return (
    <footer className="border-border/40 mt-auto border-t">
      <Container className="flex flex-col items-center gap-6 py-12 sm:py-16">
        <FooterSocials />
        <div className="text-foreground-dark-secondary flex flex-col items-center gap-3 text-center">
          <a
            className="hover:text-foreground-dark text-sm transition-colors"
            href={`mailto:${config.contactEmail}`}
            aria-label="Send me an email"
          >
            {config.contactEmail}
          </a>
          <p className="text-sm">
            &copy; {config.copyrightYear} {config.name}
          </p>
        </div>
      </Container>
    </footer>
  );
};
