// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from '@/components/cookie-consent';
import { LanguageToggle } from '@/components/language-toggle';
import Link from 'next/link';
import { Wand2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationLinks = [
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <Wand2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">VoiceScribe</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="flex-1">
              {children}
              <CookieConsent />
            </main>

            <footer className="border-t mt-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <nav className="flex gap-4">
                    {navigationLinks.map(({ href, label }) => (
                      <Link 
                        key={href}
                        href={href}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                  <p className="text-sm text-foreground/70">
                    © 2024 VoiceScribe. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}