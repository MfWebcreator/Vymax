'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Zap,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { calculateLevel } from '@/lib/utils';

export default function DashboardPage() {
  const [userXP] = useState(240);
  const [streak] = useState(7);
  const levelInfo = calculateLevel(userXP);

  // Mock Routine Progress
  const [completedCount] = useState(2);
  const totalTasks = 4;
  const routineProgressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#0d0d10] to-black border border-zinc-800 p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Dia 7 da sua jornada</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Evolução diária em andamento
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Objetivo: <strong className="text-zinc-200">Melhorar alinhamento de barba e hidratação facial</strong>
          </p>
        </div>

        <Link href="/app/routine">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Continuar rotina
          </Button>
        </Link>
      </div>

      {/* Main Metrics Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score & Potential */}
        <div className="lg:col-span-2 space-y-4">
          <ScoreBadge score={7.2} potentialScore={8.8} />

          {/* Level Progress */}
          <Card variant="bordered" className="bg-[#0a0a0c]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <CardTitle className="text-base">Progresso do Nível {levelInfo.level}</CardTitle>
                </div>
                <span className="text-xs font-semibold text-zinc-400">
                  {levelInfo.xpInCurrentLevel} / {levelInfo.xpNeededForNext} XP
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ProgressBar value={levelInfo.progressPercent} showLabel label="Próximo Nível em breve" />
            </CardContent>
          </Card>
        </div>

        {/* Side Summary Card */}
        <div className="space-y-4">
          {/* Streak Card */}
          <Card variant="bordered" className="bg-[#0a0a0c]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-950/50 border border-orange-800">
                  <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{streak} dias de Streak</h4>
                  <p className="text-xs text-zinc-400">Melhor sequência: 14 dias</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                Ativo hoje
              </span>
            </div>
          </Card>

          {/* Next Check-in Card */}
          <Card variant="bordered" className="bg-[#0a0a0c]">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-zinc-400 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-zinc-300" /> Próximo Check-in
                </span>
                <span className="text-xs text-zinc-300 font-bold">Em 7 dias</span>
              </div>
              <p className="text-xs text-zinc-400">
                Dia 14: Envie sua nova foto para a IA avaliar sua evolução observável.
              </p>
              <Link href="/app/evolution" className="inline-flex items-center gap-1 text-xs text-white font-medium hover:underline pt-1">
                Ver histórico de evolução <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Today's Missions & Routine Status */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-white" /> Rotina & Missões de Hoje
              </CardTitle>
              <CardDescription>
                {completedCount} de {totalTasks} tarefas concluídas ({routineProgressPercent}%)
              </CardDescription>
            </div>
            <Link href="/app/routine">
              <Button variant="outline" size="sm">
                Gerenciar Rotina
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <ProgressBar value={routineProgressPercent} className="mb-4" />

          {/* Task Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-zinc-900/80 border border-zinc-800 p-3.5 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <div>
                  <span className="font-medium text-white line-through text-zinc-400">Higienização e Proteção Matinal</span>
                  <span className="block text-xs text-zinc-500">Pele • 3 min</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">+15 XP</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-900/80 border border-zinc-800 p-3.5 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <div>
                  <span className="font-medium text-white line-through text-zinc-400">Penteado e Ajuste Matinal</span>
                  <span className="block text-xs text-zinc-500">Cabelo & Grooming • 4 min</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">+15 XP</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-zinc-600" />
                <div>
                  <span className="font-medium text-white">Checagem Postural e Hidratação da Tarde</span>
                  <span className="block text-xs text-zinc-400">Postura • 2 min</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-300">+10 XP</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-zinc-600" />
                <div>
                  <span className="font-medium text-white">Limpeza Noturna e Hidratação</span>
                  <span className="block text-xs text-zinc-400">Pele & Hábitos • 4 min</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-300">+20 XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Veyro AI Quick Assistant Prompt */}
      <Card variant="interactive" className="bg-gradient-to-r from-zinc-900 to-black border-zinc-800">
        <Link href="/app/ai" className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tire dúvidas com a Veyro AI</h4>
              <p className="text-xs text-zinc-400">
                "Qual pomada combina com meu cabelo?" ou "Como alinhar a barba no pescoço?"
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-400" />
        </Link>
      </Card>
    </div>
  );
}
