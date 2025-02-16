import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { config } from "@/config";
import { createMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer";
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
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="dark overflow-x-hidden antialiased">
        <Header />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
