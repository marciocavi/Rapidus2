import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from "next/font/google";

import AdminLayoutWrapper from "@/app/admin/AdminLayoutWrapper";
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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = { themeColor: '#000000' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialConfig = await loadSiteConfig();

  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-dark-bg text-neutral-dark-onSurfaceHigh antialiased`}>
        <SiteConfigProvider initialConfig={initialConfig}>
          <AdminLayoutWrapper>
            {children}
          </AdminLayoutWrapper>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
