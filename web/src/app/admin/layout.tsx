'use client';

import '@/design/theme/modern-admin.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Shell from '@/components/admin/ui/Shell';
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
  ChevronRight
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
  { name: 'Conteúdo', href: '/admin/content', icon: FileText },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Segurança', href: '/admin/security', icon: Shield },
  { name: 'Suporte', href: '/admin/support', icon: HelpCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModernUI, setIsModernUI] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Evitar hydration error
  useEffect(() => {
    setIsClient(true);
    const envFlag = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';
    const localStorageFlag = localStorage.getItem('modern-admin-ui') === 'true';
    setIsModernUI(envFlag || localStorageFlag);
  }, []);

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
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
              segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : href,
        isLast
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Loading state para evitar hydration error
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
      <Shell modern={true}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-modern-admin="1">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-white">Rapidus</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User info */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin</p>
                  <p className="text-xs text-slate-400 truncate">admin@rapidus.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Header */}
          <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {index > 0 && <ChevronRight className="w-4 h-4 text-slate-500" />}
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      ) : (
                        <span className="text-white font-medium">{crumb.name}</span>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sistema Online</span>
                </div>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Sair
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
      </Shell>
    );
  }

  // Layout original (fallback)
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen">
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-xl font-bold text-white">Rapidus Admin</h1>
          </div>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight className="w-4 h-4 text-zinc-500" />}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-zinc-400 hover:text-white"
                      >
                        {crumb.name}
                      </Link>
                    ) : (
                      <span className="text-white font-medium">{crumb.name}</span>
                    )}
                  </div>
                ))}
              </nav>
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sair
              </Link>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}