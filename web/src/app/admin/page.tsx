import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import LogoutButton from './LogoutButton';

export default async function AdminHome() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  // Se não houver cookie de sessão, redireciona para login
  if (!session) {
    redirect('/login');
  }
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Painel de Controle</h2>
            <p className="text-zinc-400">Bem-vindo à área administrativa do Rapidus.</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/settings" className="block">
          <div className="p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors space-y-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <span className="text-zinc-900 font-bold">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold">Configurações</h3>
            <p className="text-zinc-400">
              Gerencie seções do site, cores e temas do Rapidus.
            </p>
          </div>
        </Link>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📊</span>
          </div>
          <h3 className="text-xl font-semibold">Analytics</h3>
          <p className="text-zinc-400">
            Visualize métricas e dados de performance do site.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📝</span>
          </div>
          <h3 className="text-xl font-semibold">Conteúdo</h3>
          <p className="text-zinc-400">
            Gerencie posts, páginas e conteúdo dinâmico.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">👥</span>
          </div>
          <h3 className="text-xl font-semibold">Usuários</h3>
          <p className="text-zinc-400">
            Gerencie contas de usuários e permissões.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">🔒</span>
          </div>
          <h3 className="text-xl font-semibold">Segurança</h3>
          <p className="text-zinc-400">
            Configureções de segurança e backup.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📧</span>
          </div>
          <h3 className="text-xl font-semibold">Suporte</h3>
          <p className="text-zinc-400">
            Central de ajuda e tickets de suporte.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Status do Sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-zinc-400">Servidor Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-zinc-400">Database OK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-zinc-400">Cache Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-zinc-400">SSL Válido</span>
          </div>
        </div>
      </div>
    </div>
  );
}
