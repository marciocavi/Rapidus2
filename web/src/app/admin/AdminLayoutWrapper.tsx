'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

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

  // Para outras rotas, renderiza apenas o conteúdo (sem header global)
  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
}
