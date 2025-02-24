import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { config } from "@/config";
import { createMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { TooltipProvider } from "@/components/providers/tooltip-provider";
import "@/styles/globals.css";
import { generatePersonSchema } from "@/lib/schema";

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
  return (
    <html lang="en" className={`${inter.variable} md:scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema()),
          }}
        />
      </head>
      <body className="dark overflow-x-hidden antialiased">
        <TooltipProvider>
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
