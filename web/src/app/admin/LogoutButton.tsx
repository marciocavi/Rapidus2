'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);
    
    try {
      // Chama a API para remover o cookie de sessão
      await fetch('/api/session', {
        method: 'DELETE',
      });
      
      // Redireciona para login
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? 'Saindo...' : 'Sair'}
    </button>
  );
}
