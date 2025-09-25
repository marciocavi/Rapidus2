import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Página não encontrada
          </h2>
          <p className="text-slate-400 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
          
          <div>
            <Link
              href="javascript:history.back()"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

