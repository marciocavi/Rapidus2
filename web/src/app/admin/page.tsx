'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';

import { 
  Settings, 
  BarChart3, 
  FileText, 
  Users, 
  Shield,
  TrendingUp,
  Activity,
  Database,
  Clock,
  CheckCircle,
  DollarSign,
  Target
} from 'lucide-react';

import { StatCard, MiniLineChart, RadialGauge } from '@/components/admin/dashboard';

export default function AdminHome() {
  const [isModernUI, setIsModernUI] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Evitar hydration error
  useEffect(() => {
    setIsClient(true);
    const envFlag = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';
    const localStorageFlag = localStorage.getItem('modern-admin-ui') === 'true';
    setIsModernUI(envFlag || localStorageFlag);
  }, []);

  // Dados para os gráficos
  const sessionsData = [
    { x: '00:00', y: 120 },
    { x: '04:00', y: 80 },
    { x: '08:00', y: 200 },
    { x: '12:00', y: 350 },
    { x: '16:00', y: 280 },
    { x: '20:00', y: 180 }
  ];

  const conversionsData = [
    { x: 'Seg', y: 45 },
    { x: 'Ter', y: 52 },
    { x: 'Qua', y: 38 },
    { x: 'Qui', y: 67 },
    { x: 'Sex', y: 73 },
    { x: 'Sáb', y: 41 },
    { x: 'Dom', y: 29 }
  ];

  const revenueData = [
    { x: 'Jan', y: 12000 },
    { x: 'Fev', y: 15000 },
    { x: 'Mar', y: 18000 },
    { x: 'Abr', y: 22000 },
    { x: 'Mai', y: 25000 },
    { x: 'Jun', y: 28000 }
  ];

  const quickActions = [
    {
      name: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
      description: 'Gerencie seções do site, cores e temas',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      description: 'Visualize métricas e dados de performance',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      name: 'Conteúdo',
      href: '/admin/content',
      icon: FileText,
      description: 'Gerencie posts, páginas e conteúdo',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      name: 'Usuários',
      href: '/admin/users',
      icon: Users,
      description: 'Gerencie contas e permissões',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const systemStatus = [
    { name: 'Servidor', status: 'online', icon: Activity },
    { name: 'Database', status: 'online', icon: Database },
    { name: 'Cache', status: 'online', icon: CheckCircle },
    { name: 'SSL', status: 'online', icon: Shield }
  ];

  // Função para toggle da interface moderna
  const toggleModernUI = () => {
    const current = localStorage.getItem('modern-admin-ui') === 'true';
    localStorage.setItem('modern-admin-ui', (!current).toString());
    setIsModernUI(!current);
  };

  // Loading state para evitar hydration error
  if (!isClient) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (isModernUI) {
    return (
      <div className="space-y-8" data-modern-admin="1">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo ao Rapidus</h1>
              <p className="text-slate-300 text-lg">Painel de controle administrativo</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleModernUI}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
              >
                Interface Neon: ON
              </button>
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha 1: StatCards com gráficos */}
        <div className="adm-grid">
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-white" />}
            label="Sessões"
            value="2,847"
            delta="+12%"
            right={<MiniLineChart data={sessionsData} />}
          />
          
          <StatCard
            icon={<Target className="w-5 h-5 text-white" />}
            label="Conversões"
            value="1,234"
            delta="+8%"
            right={<MiniLineChart data={conversionsData} />}
          />
          
          <StatCard
            icon={<DollarSign className="w-5 h-5 text-white" />}
            label="Receita"
            value="R$ 28.5k"
            delta="+15%"
            right={<MiniLineChart data={revenueData} />}
          />
        </div>

        {/* Linha 2: Card largo com gráfico principal + RadialGauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="adm-panel adm-card--glass p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Geral</h3>
              <div style={{ height: 300 }}>
                <MiniLineChart data={sessionsData} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="adm-panel adm-card--glass p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Meta Mensal</h3>
              <RadialGauge value={75} label="Concluído" size={140} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} href={action.href} className="group">
                  <div className={`${action.bgColor} ${action.borderColor} border rounded-xl p-6 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.name}</h3>
                    <p className="text-slate-400 text-sm">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Status do Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {systemStatus.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className={`text-sm ${
                      item.status === 'online' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Layout original (fallback)
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">Painel de Controle</h2>
            <p className="text-zinc-400">Bem-vindo à área administrativa do Rapidus.</p>
          </div>
          <button
            onClick={toggleModernUI}
            className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
          >
            Ativar Interface Neon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/settings" className="block">
          <div className="p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors space-y-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <span className="text-zinc-900 font-bold">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Configurações</h3>
            <p className="text-zinc-400">
              Gerencie seções do site, cores e temas do Rapidus.
            </p>
          </div>
        </Link>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Analytics</h3>
          <p className="text-zinc-400">
            Visualize métricas e dados de performance do site.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Conteúdo</h3>
          <p className="text-zinc-400">
            Gerencie posts, páginas e conteúdo dinâmico.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">👥</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Usuários</h3>
          <p className="text-zinc-400">
            Gerencie contas de usuários e permissões.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">🔒</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Segurança</h3>
          <p className="text-zinc-400">
            Configureções de segurança e backup.
          </p>
        </div>

        <div className="p-6 border border-zinc-800 rounded-lg space-y-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-zinc-900 font-bold">📧</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Suporte</h3>
          <p className="text-zinc-400">
            Central de ajuda e tickets de suporte.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Status do Sistema</h3>
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
