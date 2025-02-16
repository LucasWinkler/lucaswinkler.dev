"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { config } from "@/config";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const MotionButton = motion.create(Button);

export const CTA = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section
      id="cta"
      className="scroll-mt-[var(--header-height)] py-12 sm:py-16 md:py-20"
    >
      <Container>
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
                Get in touch
              </span>
              <h2 className="font-heading text-foreground-dark 2xs:text-[2.25rem] mb-4 text-[1.75rem] leading-[1.1] font-bold tracking-tight sm:mb-6 sm:text-4xl sm:tracking-normal md:mb-8 md:text-5xl lg:text-6xl lg:tracking-[-0.02em]">
                Let&apos;s build
                <br />
                something together
              </h2>
              <p className="text-foreground-dark-secondary mx-auto mb-8 max-w-[50ch] text-base sm:text-lg md:text-xl">
                I&apos;m actively seeking opportunities to contribute to cool
                projects. Whether you have a position available or would like to
                connect, I&apos;d love to hear from you.
              </p>
              <div className="flex justify-center">
                <MotionButton
                  size="lg"
                  className="group w-full sm:w-auto"
                  onClick={handleCopyEmail}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={copied ? "check" : "copy"}
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="mr-2"
                    >
                      {copied ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <span>{copied ? "Email copied!" : "Copy Email"}</span>
                </MotionButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
