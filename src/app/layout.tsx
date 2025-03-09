import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "motion/react";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/providers/tooltip-provider";
import { config } from "@/config";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
  weight: "variable",
  adjustFontFallback: true,
  fallback: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
});

export const metadata = createMetadata({
  title: {
    template: `%s – ${config.appName}`,
    default: config.appName,
  },
  canonicalUrlRelative: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = [generatePersonSchema(), generateWebSiteSchema()];

  return (
    <html
      lang="en"
      className={`${inter.variable} md:scroll-smooth antialiased`}
      // Applies only 1 level deep to prevent hydration errors with next-themes
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <MotionConfig
          reducedMotion="user"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          <ThemeProvider
            attribute="class"
            enableSystem
            enableColorScheme
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Header />
              <main id="main" className="relative">
                {children}
              </main>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
