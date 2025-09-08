'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from "@/app/components/Navbar";

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // Se for rota admin, não renderiza header/footer global
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Para outras rotas, renderiza normalmente
  return (
    <>
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
              <span className="text-lg font-semibold">Rapidus</span>
            </div>
            <div className="text-sm text-neutral-dark-onSurfaceMedium">
              © 2024 Rapidus. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
