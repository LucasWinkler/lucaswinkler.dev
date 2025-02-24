import { Container } from "../container";
import { config } from "@/config";
import { FooterSocials } from "./footer-socials";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 mt-auto border-t">
      <Container>
        <div className="flex flex-col items-center gap-6 py-12 sm:py-16">
          <FooterSocials />
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
