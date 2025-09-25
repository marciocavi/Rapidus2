'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Settings, 
  BarChart3, 
  FileText, 
  Users, 
  Shield, 
  HelpCircle,
  Menu,
  X,
  Home,
  ChevronRight,
  Plug
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'AI', href: '/admin/ai', icon: HelpCircle, badge: 'beta' },
  { name: 'Integrações', href: '/admin/integrations', icon: Plug },
  { name: 'Conteúdo', href: '/admin/content', icon: FileText },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Segurança', href: '/admin/security', icon: Shield },
  { name: 'Suporte', href: '/admin/support', icon: HelpCircle },
];

export default function ClientAdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModernUI, setIsModernUI] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [adminTheme, setAdminTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const envUI = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI;
    const envTheme = process.env.NEXT_PUBLIC_ADMIN_THEME;
    const storedUI = localStorage.getItem('modern-admin-ui');
    const storedTheme = localStorage.getItem('admin-theme');

    const uiFlag = envUI === '1' ? true : envUI === '0' ? false : (storedUI === null ? true : storedUI === 'true');
    setIsModernUI(uiFlag);

    const themeValue = envTheme === 'light' || envTheme === 'dark' ? envTheme : (storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark');
    setAdminTheme(themeValue as 'dark' | 'light');
  }, []);

  const getBreadcrumbs = () => {
    const segments = (pathname || '').split('/').filter(Boolean);
    const breadcrumbs: { name: string; href?: string; isLast: boolean }[] = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const href = '/' + segments.slice(0, i + 1).join('/');
      const isLast = i === segments.length - 1;

      breadcrumbs.push({
        name: segment === 'admin' ? 'Dashboard' :
              segment === 'settings' ? 'Configurações' :
              segment === 'analytics' ? 'Analytics' :
              segment === 'content' ? 'Conteúdo' :
              segment === 'users' ? 'Usuários' :
              segment === 'security' ? 'Segurança' :
              segment === 'support' ? 'Suporte' :
              segment === 'ai' ? 'Ai' :
              segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : href,
        isLast,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (!isClient) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="animate-pulse p-6">
          <div className="h-8 bg-zinc-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (isModernUI) {
    return (
      <div className="adm-shell" data-modern-admin="1" data-admin-theme={adminTheme}>
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className={`adm-sidebar fixed inset-y-0 left-0 z-50 w-48 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-2 border-b border-slate-700/50">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="text-sm font-bold text-white">Rapidus</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-2 space-y-0.5">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href} className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-sm transition-all duration-200 group ${isActive ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                    <Icon className={`w-3 h-3 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="font-medium text-xs">{item.name}</span>
                    {item.badge && <span className="ml-auto px-1 py-0.5 text-xs bg-red-500 text-white rounded-full">{item.badge}</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="p-2 border-t border-slate-700/50">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">Admin</p>
                  <p className="text-xs text-slate-400 truncate">admin@rapidus.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-48">
          <header className="adm-topbar">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
                  <Menu className="w-4 h-4" />
                </button>
                <nav className="flex items-center space-x-1 text-xs">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      {index > 0 && <ChevronRight className="w-2 h-2 text-slate-500" />}
                      {crumb.href ? (
                        <Link href={crumb.href} className="text-slate-400 hover:text-white transition-colors">{crumb.name}</Link>
                      ) : (
                        <span className="text-white font-medium">{crumb.name}</span>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center space-x-1 text-xs text-slate-400">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Sistema Online</span>
                </div>
                <Link href="/" target="_blank" className="px-2 py-1 text-xs bg-green-500/20 text-green-300 border border-green-500/30 rounded-sm hover:bg-green-500/30 transition-colors">Ver Site</Link>
                <button onClick={() => { window.dispatchEvent(new CustomEvent('admin-save')); }} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-sm hover:bg-blue-500/30 transition-colors">Salvar</button>
                <Link href="/login" className="px-2 py-1 text-xs bg-red-500/20 text-red-300 border border-red-500/30 rounded-sm hover:bg-red-500/30 transition-colors">Sair</Link>
              </div>
            </div>
          </header>
          <main className="adm-content">{children}</main>
        </div>
      </div>
    );
  }

  // fallback simples
  return <div className="p-6 text-white">{children}</div>;
}


