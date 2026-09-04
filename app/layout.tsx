import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brad\u2019s Brigade \u2014 The home base for firetruck musters',
  description:
    'Brad\u2019s Brigade brings firetruck enthusiasts, muster organizers, and chapter officers together in one place, raising awareness and money for the Muscular Dystrophy Association.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Mona+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
