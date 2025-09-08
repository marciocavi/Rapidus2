import Shell from '@/components/admin/ui/Shell';

export default function AdminSettingsPage() {
  const modern = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';

  return (
    <Shell
      modern={modern}
      topbar={<div style={{display:'flex',alignItems:'center',gap:12}}>
        <strong>Rapidus</strong>
        <span style={{opacity:.7}}>Painel Administrativo</span>
      </div>}
      sidebar={<nav>
        {/* substitua por sua navegação real */}
        <div className="text-secondary mb-16">Seções</div>
        <ul style={{display:'grid',gap:8}}>
          <li><a href="#" className="text-secondary">Hero</a></li>
          <li><a href="#" className="text-secondary">Features</a></li>
          <li><a href="#" className="text-secondary">Services</a></li>
          <li><a href="#" className="text-secondary">Parcerias</a></li>
        </ul>
      </nav>}
    >
      {/* Exemplo de Panel */}
      <section className="adm-panel mb-24">
        <div className="adm-panel__header">
          <h2 style={{fontSize:20, fontWeight:700}}>Configuração – Hero</h2>
          <p className="text-secondary">Ajuste a seção principal do site</p>
        </div>
        <div className="adm-panel__body" style={{display:'grid', gap:16}}>
          <label className="adm-field">
            <span className="adm-label">Título Principal</span>
            <input className="adm-input" placeholder="Rapidus" />
            <span className="adm-hint">Será exibido no banner</span>
          </label>

          <label className="adm-field">
            <span className="adm-label">Subtítulo</span>
            <textarea className="adm-textarea" rows={3} placeholder="Soluções digitais rápidas..."/>
          </label>
        </div>
        <div className="adm-panel__footer">
          <button className="adm-btn adm-btn--ghost">Cancelar</button>
          <button className="adm-btn adm-btn--primary">Salvar</button>
        </div>
      </section>
    </Shell>
  );
}


