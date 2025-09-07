import React from 'react';

export type ShellProps = {
  /** Quando true, adiciona data-modern-admin="1" para ativar o tema */
  modern?: boolean;
  /** Conteúdo da Topbar (ex.: logo, busca, ações) */
  topbar?: React.ReactNode;
  /** Conteúdo da Sidebar (ex.: navegação de seções) */
  sidebar?: React.ReactNode;
  /** Conteúdo principal */
  children: React.ReactNode;
};

/**
 * Admin Shell (Modern UI)
 * - Aplica classes utilitárias definidas em modern-admin.css
 * - Não altera rotas/props de páginas; apenas layout/estilo
 */
export default function Shell({ modern = false, topbar, sidebar, children }: ShellProps) {
  return (
    <div className="adm-shell" data-modern-admin={modern ? '1' : '0'}>
      <header className="adm-topbar">
        {topbar}
      </header>

      <div className="adm-layout">
        {sidebar && (
          <aside className="adm-sidebar">
            {sidebar}
          </aside>
        )}

        <main className="adm-content">
          {children}
        </main>
      </div>
    </div>
  );
}
