import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import StoreProvider from '@/components/StoreProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.bosphorusbakery.com`),
  title: {
    default: 'Home | Bosphorus Bakery',
    template: '%s | Bosphorus Bakery',
  },
  description: '%s',
  robots: { index: true, follow: true },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <StoreProvider>{children}</StoreProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
