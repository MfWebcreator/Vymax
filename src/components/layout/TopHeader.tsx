'use client';

import { Flame, Zap, ShieldCheck } from 'lucide-react';
import { calculateLevel } from '@/lib/utils';
import { LogoComponent } from '@/components/brand/LogoComponent';

interface TopHeaderProps {
  userXP?: number;
  streakDays?: number;
  planName?: string;
  userName?: string;
}

export function TopHeader({
  userXP = 120,
  streakDays = 7,
  planName = 'PRO',
  userName = 'Matheus',
}: TopHeaderProps) {
  const levelInfo = calculateLevel(userXP);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-black/90 backdrop-blur-md px-4 sm:px-6">
      {/* Mobile Logo Branding */}
      <div className="flex items-center gap-3 md:hidden">
        <LogoComponent width={90} height={90} />
      </div>

      {/* Desktop Welcome Message */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-sm text-zinc-400">
          Olá, <strong className="text-white">{userName}</strong>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-300">
          <ShieldCheck className="h-3 w-3 text-white" />
          {planName}
        </span>
      </div>

      {/* Metrics Header Bar */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
          <span>{streakDays} dias</span>
        </div>

        {/* Level & XP */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-xs font-semibold text-white">
          <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>Nível {levelInfo.level}</span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden sm:inline text-zinc-400">{userXP} XP</span>
        </div>
      </div>
    </header>
  );
}
