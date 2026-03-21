import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'F1 Performance Hub · 2026',
  description: 'Track Analyzer, Live 2026 Season standings, and Car Comparison — powered by Jolpica F1 API and FastF1 telemetry',
  openGraph: {
    title: 'F1 Performance Hub · 2026',
    description: 'Interactive F1 dash with real-time standings and telemetry.',
    url: 'https://f1hub.app',
    siteName: 'F1 Performance Hub',
    images: [
      {
        url: 'https://f1hub.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1 Performance Hub · 2026',
    description: 'Track Analyzer, Live 2026 Season standings and more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" href="/hero-car.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e10600" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
