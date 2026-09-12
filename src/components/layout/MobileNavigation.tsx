'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Sparkles,
  CalendarCheck,
  TrendingUp,
  Bot,
  User,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/app', icon: Home },
  { label: 'Análise', href: '/app/analysis', icon: Sparkles },
  { label: 'Rotina', href: '/app/routine', icon: CalendarCheck },
  { label: 'Evolução', href: '/app/evolution', icon: TrendingUp },
  { label: 'Desafios', href: '/app/challenges', icon: Trophy },
  { label: 'Perfil', href: '/app/profile', icon: User },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating Veyro AI Action Button (Mobile) */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <Link
          href="/app/ai"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform active:scale-95 border-2 border-zinc-200"
          aria-label="Veyro AI"
        >
          <Bot className="h-7 w-7 text-black" />
        </Link>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around bg-black/95 border-t border-zinc-800 backdrop-blur-lg px-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 text-[10px] font-medium transition-colors py-1 px-2 rounded-lg',
                isActive
                  ? 'text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-zinc-400')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
