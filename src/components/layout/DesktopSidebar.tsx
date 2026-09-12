'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Sparkles,
  CalendarCheck,
  TrendingUp,
  Trophy,
  Award,
  Bot,
  User,
  CreditCard,
  Share2,
  LogOut,
} from 'lucide-react';
import { LogoComponent } from '@/components/brand/LogoComponent';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { label: 'Dashboard', href: '/app', icon: Home },
  { label: 'Análise', href: '/app/analysis', icon: Sparkles },
  { label: 'Rotina Diária', href: '/app/routine', icon: CalendarCheck },
  { label: 'Evolução & Check-in', href: '/app/evolution', icon: TrendingUp },
  { label: 'Desafios', href: '/app/challenges', icon: Trophy },
  { label: 'Conquistas', href: '/app/achievements', icon: Award },
  { label: 'Veyro AI', href: '/app/ai', icon: Bot, badge: 'IA' },
  { label: 'Indicações', href: '/app/referrals', icon: Share2 },
  { label: 'Planos & Assinatura', href: '/app/subscription', icon: CreditCard },
  { label: 'Perfil', href: '/app/profile', icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col justify-between border-r border-zinc-800 bg-[#09090b] p-4 fixed left-0 top-0 z-30">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-center py-2 border-b border-zinc-800/80 pb-4">
          <LogoComponent width={130} height={130} />
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-zinc-400')} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Quick Info / Logout footer */}
      <div className="border-t border-zinc-800/80 pt-4">
        <Link
          href="/login"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair da conta</span>
        </Link>
      </div>
    </aside>
  );
}
