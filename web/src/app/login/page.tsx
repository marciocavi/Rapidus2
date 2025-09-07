'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Chama a API de sessão para setar o cookie httpOnly
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Acesso Administrativo</h1>
          <p className="text-zinc-400">Entre com suas credenciais para acessar o painel</p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-zinc-100 px-4 py-3 font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-zinc-500">
              ⚠️ Sistema de demonstração - qualquer credencial funciona
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
