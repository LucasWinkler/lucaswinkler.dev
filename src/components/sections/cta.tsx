import { config } from "@/config";
import { Container } from "@/components/layout/container";
import { CopyToClipboardButton } from "@/components/common/copy-to-clipboard-button";

export interface CTAProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export const CTA = ({ eyebrow, heading, description }: CTAProps) => {
  return (
    <Container asChild>
      <section
        id="cta"
        className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
      >
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative px-6 py-10 sm:px-12 sm:py-14 md:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs leading-tight tracking-[0.2em] text-purple-400/80 uppercase sm:mb-4 sm:text-sm">
                {eyebrow}
              </span>
              <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold tracking-tight sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
                {heading}
              </h2>
              <p className="text-foreground-dark-secondary mx-auto mb-8 max-w-[50ch] text-base sm:text-lg md:text-xl">
                {description}
              </p>
              <CopyToClipboardButton
                textToCopy={config.contactEmail}
                iconPosition="left"
                text="Copy Email"
                copiedText="Email Copied"
                errorText="Failed to Copy Email"
                className="mx-auto w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
