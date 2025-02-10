import { Header } from '@/components/layout/header/header';
import { Footer } from '@/components/layout/footer';
import { createMetadata } from '@/lib/seo';
import { config } from '@/config';
import '@/styles/globals.css';

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
          href='https://rsms.me/inter/inter.css'
        />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </head>
      <body className='antialiased'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
