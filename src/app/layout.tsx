import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { createMetadata } from '@/utils/seo';
import { config } from '@/config';
import './globals.css';

export const metadata = createMetadata({
  title: {
    template: `%s | ${config.appName}`,
    default: config.appName,
  },
  canonicalUrlRelative: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://rsms.me/' />
        <link
          rel='preload'
          as='style'
          type='text/css'
          crossOrigin='anonymous'
          href='https://rsms.me/inter/inter.css'
        />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </head>
      <body className='antialiased'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
