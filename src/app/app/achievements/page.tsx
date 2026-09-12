'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Award, Lock, CheckCircle2, Zap, EyeOff } from 'lucide-react';

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: 'first_steps' | 'consistency' | 'missions' | 'evolution' | 'challenges';
  xpReward: number;
  unlocked: boolean;
  isSecret?: boolean;
}

export default function AchievementsPage() {
  const [achievements] = useState<AchievementItem[]>([
    // First Steps
    {
      id: 'a1',
      title: 'Primeiro Passo',
      description: 'Concluiu a análise inicial de apresentação.',
      category: 'first_steps',
      xpReward: 50,
      unlocked: true,
    },
    {
      id: 'a2',
      title: 'Começou',
      description: 'Completou a primeira tarefa da rotina diária.',
      category: 'first_steps',
      xpReward: 30,
      unlocked: true,
    },
    {
      id: 'a3',
      title: 'Evoluindo',
      description: 'Manteve 3 dias seguidos de hábitos.',
      category: 'first_steps',
      xpReward: 70,
      unlocked: true,
    },
    {
      id: 'a4',
      title: 'Primeiro Upgrade',
      description: 'Atingiu o Nível 2 de evolução.',
      category: 'first_steps',
      xpReward: 100,
      unlocked: true,
    },

    // Consistency
    {
      id: 'a5',
      title: '7 Dias Implacáveis',
      description: 'Manteve uma sequência de 7 dias consecutivos.',
      category: 'consistency',
      xpReward: 150,
      unlocked: true,
    },
    {
      id: 'a6',
      title: '30 Dias de Consistência',
      description: 'Manteve 30 dias ininterruptos de hábitos.',
      category: 'consistency',
      xpReward: 400,
      unlocked: false,
    },
    {
      id: 'a7',
      title: '100 Dias',
      description: 'Manteve 100 dias consecutivos de rotina.',
      category: 'consistency',
      xpReward: 1000,
      unlocked: false,
    },
    {
      id: 'a8',
      title: 'Imparável',
      description: 'Completou 180 dias sem quebrar a sequência.',
      category: 'consistency',
      xpReward: 2000,
      unlocked: false,
    },

    // Missions
    {
      id: 'a9',
      title: '10 Missões',
      description: 'Concluiu 10 missões diárias na plataforma.',
      category: 'missions',
      xpReward: 100,
      unlocked: true,
    },
    {
      id: 'a10',
      title: '50 Missões',
      description: 'Concluiu 50 missões diárias.',
      category: 'missions',
      xpReward: 300,
      unlocked: false,
    },
    {
      id: 'a11',
      title: '100 Missões',
      description: 'Concluiu 100 missões diárias.',
      category: 'missions',
      xpReward: 600,
      unlocked: false,
    },

    // Evolution & Secrets
    {
      id: 'a12',
      title: 'Primeiro Check-in',
      description: 'Realizou o primeiro check-in quinzenal.',
      category: 'evolution',
      xpReward: 200,
      unlocked: true,
    },
    {
      id: 'a13',
      title: 'Conquista Secreta',
      description: 'Segredo: Conclua a rotina da noite antes da meia-noite.',
      category: 'consistency',
      xpReward: 150,
      unlocked: false,
      isSecret: true,
    },
  ]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = 40; // Total configurable achievements system
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const categoryLabels = {
    first_steps: 'Primeiros Passos',
    consistency: 'Consistência',
    missions: 'Missões Diárias',
    evolution: 'Evolução & Check-ins',
    challenges: 'Desafios',
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
          <Award className="h-3.5 w-3.5 text-white" />
          <span>Sistema de Recompensas</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Conquistas ({unlockedCount} / {totalCount})
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Desbloqueie conquistas marcando presença e mantendo sua evolução diária no VeyroMax.
        </p>
      </div>

      {/* Progress Summary Card */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2 text-sm font-bold">
            <span className="text-white">Progresso Geral de Conquistas</span>
            <span className="text-zinc-400">
              {unlockedCount} de {totalCount} desbloqueadas ({progressPercent}%)
            </span>
          </div>
          <ProgressBar value={progressPercent} />
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((item) => (
          <Card
            key={item.id}
            variant="bordered"
            className={`transition-all ${
              item.unlocked
                ? 'bg-zinc-950 border-zinc-700/80 shadow-md'
                : 'bg-[#0a0a0c]/60 border-zinc-800/60 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    item.unlocked
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                  }`}
                >
                  {item.isSecret && !item.unlocked ? (
                    <EyeOff className="h-5 w-5" />
                  ) : item.unlocked ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    {categoryLabels[item.category]}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {item.isSecret && !item.unlocked ? 'Conquista Secreta' : item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {item.isSecret && !item.unlocked
                      ? 'Continue praticando para descobrir esta conquista.'
                      : item.description}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-amber-400 shrink-0">
                +{item.xpReward} XP
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
