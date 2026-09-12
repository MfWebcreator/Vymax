'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LogoComponent } from '@/components/brand/LogoComponent';
import {
  User,
  ShieldCheck,
  Zap,
  Flame,
  CreditCard,
  Share2,
  LogOut,
  Settings,
  Lock,
} from 'lucide-react';
import { calculateLevel } from '@/lib/utils';
import { logout } from '@/app/(auth)/actions';

export default function ProfilePage() {
  const levelInfo = calculateLevel(240);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Perfil & Configurações
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Gerencie seus dados pessoais, nível de conta, privacidade e assinatura.
        </p>
      </div>

      {/* Profile Header Card */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800 border border-zinc-700 font-bold text-2xl text-white">
            M
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-white">Matheus Felipe</h2>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
                PRO
              </span>
            </div>
            <p className="text-xs text-zinc-400">matheus@exemplo.com</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-medium">
              <span className="flex items-center gap-1 text-amber-400">
                <Zap className="h-3.5 w-3.5" /> Nível {levelInfo.level} (240 XP)
              </span>
              <span className="flex items-center gap-1 text-orange-400">
                <Flame className="h-3.5 w-3.5 fill-orange-400" /> 7 dias de Streak
              </span>
            </div>
          </div>

          <Link href="/app/subscription">
            <Button variant="outline" size="sm" leftIcon={<CreditCard className="h-4 w-4" />}>
              Gerenciar Plano
            </Button>
          </Link>
        </div>
      </Card>

      {/* Account Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Status Card */}
        <Card variant="bordered" className="bg-[#0a0a0c]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Share2 className="h-4 w-4 text-white" /> Código de Indicação
            </CardTitle>
            <CardDescription>Convide amigos e receba análises gratuitas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm font-mono font-bold text-white">
              <span>VEYRO-MATH-8492</span>
              <Link href="/app/referrals">
                <span className="text-xs text-zinc-400 hover:text-white underline">Ver detalhes</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Photos Card */}
        <Card variant="bordered" className="bg-[#0a0a0c]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-4 w-4 text-white" /> Privacidade das Fotos
            </CardTitle>
            <CardDescription>Armazenamento 100% privado via Supabase Storage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Suas fotos nunca são expostas publicamente.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Acesso temporário exclusivo com URLs assinadas.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logout Action */}
      <div className="pt-4 flex justify-end">
        <form action={logout}>
          <Button variant="danger" size="md" type="submit" leftIcon={<LogOut className="h-4 w-4" />}>
            Sair da Conta
          </Button>
        </form>
      </div>
    </div>
  );
}
