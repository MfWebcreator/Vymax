'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Trophy, Zap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ChallengesPage() {
  const [activeChallenges, setActiveChallenges] = useState([
    {
      id: 'c1',
      title: 'Desafio 7 Dias de Postura & Skincare',
      description: '7 dias seguidos cumprindo a limpeza facial matinal e o alinhamento postural diário.',
      durationDays: 7,
      progressDays: 5,
      xpReward: 250,
      status: 'in_progress',
    },
    {
      id: 'c2',
      title: 'Desafio 30 Dias de Grooming & Cabelo',
      description: '30 dias mantendo penteado, hidratação e barba alinhada sem falhar.',
      durationDays: 30,
      progressDays: 12,
      xpReward: 800,
      status: 'in_progress',
    },
    {
      id: 'c3',
      title: 'Desafio 90 Dias de Transformação Total',
      description: 'Construção de hábitos inabaláveis por 3 meses com 6 check-ins observáveis.',
      durationDays: 90,
      progressDays: 0,
      xpReward: 2500,
      status: 'available',
    },
  ]);

  const handleStartChallenge = (id: string) => {
    setActiveChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'in_progress', progressDays: 1 } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
          <Trophy className="h-3.5 w-3.5 text-white" />
          <span>Meta Estruturada</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Desafios de Evolução
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Aceite desafios temporários de 7, 30 e 90 dias para acelerar sua consistência e ganhar recompensas em XP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeChallenges.map((challenge) => {
          const progressPercent = Math.round((challenge.progressDays / challenge.durationDays) * 100);
          const isStarted = challenge.status === 'in_progress';

          return (
            <Card key={challenge.id} variant="bordered" className="flex flex-col justify-between bg-[#0a0a0c]">
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-bold text-zinc-300">
                      <Clock className="h-3 w-3" /> {challenge.durationDays} dias
                    </span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded">
                      +{challenge.xpReward} XP
                    </span>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{challenge.description}</CardDescription>
                </CardHeader>

                {isStarted && (
                  <CardContent className="pt-0">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Progresso do Desafio</span>
                        <span className="font-semibold text-white">
                          {challenge.progressDays} / {challenge.durationDays} dias
                        </span>
                      </div>
                      <ProgressBar value={progressPercent} />
                    </div>
                  </CardContent>
                )}
              </div>

              <div className="p-5 pt-3">
                {isStarted ? (
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Desafio em Andamento
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleStartChallenge(challenge.id)}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Aceitar Desafio
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
