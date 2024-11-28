import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import ThemeProvider from '@/providers/ThemeProvider';

const fontSans = FontSans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OG Image Generator - Naufal Akbar Nugroho',
  description: 'Generate OG image for your website.',
  openGraph: {
    title: 'OG Image Generator - Naufal Akbar Nugroho',
    description: 'Generate OG image for your website.',
    type: 'website',
    url: 'https://og-image-generator.vercel.app/',
    images:
      'http://localhost:3000/api/og?title=Naufal+Akbar+Nugroho&description=Saya+bersemangat+membuat+kontribusi+untuk+memberikan+pengetahuan+teknologi+kepada+semua+orang%21&logoUrl=https%3A%2F%2Fnuflakbrr.github.io%2Fstatic%2Ffavicons%2Fandroid-chrome-512x512.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
