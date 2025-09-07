import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/app/components/Navbar";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { loadSiteConfig } from "@/lib/site-config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Rapidus',
  description: 'Base app',
};

export const viewport: Viewport = { themeColor: '#000000' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialConfig = await loadSiteConfig();

  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-dark-bg text-neutral-dark-onSurfaceHigh antialiased`}>
        <SiteConfigProvider initialConfig={initialConfig}>
          <header className="top-0 z-50 bg-neutral-dark-bg border-b border-neutral-dark-border">
            <Navbar />
          </header>
          <main className="py-8">
            {children}
          </main>
          <footer className="border-t border-neutral-dark-border bg-neutral-dark-surfaceAlt">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-container">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-xl font-bold text-gradient-brand">Rapidus</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-neutral-dark-onSurfaceLow">
                  <span>© 2024 Rapidus</span>
                  <span>•</span>
                  <span>Soluções Digitais</span>
                </div>
              </div>
            </div>
          </footer>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
