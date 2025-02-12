import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer";
import { createMetadata } from "@/lib/seo";
import { config } from "@/config";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

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
    <html lang="en" className={`${inter.variable} --font-inter`}>
      <body className={`dark overflow-x-hidden antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
