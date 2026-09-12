'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  TrendingUp,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function EvolutionPage() {
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [userPerception, setUserPerception] = useState<'yes' | 'a_little' | 'not_yet' | null>(null);

  // Mock Timeline Data
  const timelineData = [
    { day: 'Dia 1', score: 7.2, date: '01/09' },
    { day: 'Dia 14', score: 7.4, date: '15/09' },
    { day: 'Dia 28', score: 7.7, date: '29/09' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-white" />
            <span>Acompanhamento Quinzenal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Sua Evolução de Apresentação
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Compare a mudança observável ao longo das semanas através dos check-ins com foto.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCheckinModalOpen(true)}
          leftIcon={<Camera className="h-4 w-4" />}
        >
          Realizar Check-in (Dia 14)
        </Button>
      </div>

      {/* Progress Chart */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-white" /> Gráfico de Score de Apresentação
          </CardTitle>
          <CardDescription>Evolução baseada nos check-ins observáveis de 14 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis dataKey="day" stroke="#52525b" fontSize={12} tickLine={false} />
                <YAxis domain={[6.0, 10.0]} stroke="#52525b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#09090b',
                    borderColor: '#27272a',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Before / After Comparison Display */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardHeader>
          <CardTitle className="text-lg">Comparativo Observável: Dia 1 vs Dia 14</CardTitle>
          <CardDescription>Análise visual das mudanças observáveis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo Pair Mock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center space-y-3">
              <span className="inline-block rounded bg-zinc-800 px-2.5 py-0.5 text-xs font-bold text-zinc-300">
                DIA 1 (ANTES)
              </span>
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-600">
                <Camera className="h-10 w-10 text-zinc-700" />
              </div>
              <div className="text-xs text-zinc-400">Score de Apresentação: <strong className="text-white">7,2 / 10</strong></div>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-center space-y-3">
              <span className="inline-block rounded bg-white text-black px-2.5 py-0.5 text-xs font-bold">
                DIA 14 (AGORA)
              </span>
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-700 text-zinc-400">
                <Camera className="h-10 w-10 text-zinc-300" />
              </div>
              <div className="text-xs text-zinc-300">Score Atualizado: <strong className="text-white">7,4 / 10</strong> (+0,2)</div>
            </div>
          </div>

          {/* AI Comparison Analysis */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase text-zinc-300 tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-white" /> Mudanças Observadas pela IA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Grooming: Linhas de barba mais nítidas e alinhadas</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Pele: Aspecto mais limpo com hidratação constante</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Check-in Modal */}
      {isCheckinModalOpen && (
        <Modal
          isOpen={isCheckinModalOpen}
          onClose={() => setIsCheckinModalOpen(false)}
          title="Novo Check-in de 14 Dias"
          description="Envie sua nova foto mantendo luz e iluminação semelhantes à foto inicial."
        >
          <div className="space-y-4 pt-2">
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-950 p-6 text-center">
              <Camera className="h-8 w-8 text-zinc-400 mb-2" />
              <p className="text-xs text-zinc-300 font-semibold">Tirar ou selecionar nova foto</p>
              <p className="text-[11px] text-zinc-500 mt-1">Sem filtros, iluminação frontal neutra</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Você percebeu evolução pessoal nestes 14 dias?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yes', label: 'Sim!' },
                  { id: 'a_little', label: 'Um pouco' },
                  { id: 'not_yet', label: 'Ainda não' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setUserPerception(opt.id as any)}
                    className={`rounded-xl p-2.5 text-center text-xs font-medium border transition-all ${
                      userPerception === opt.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsCheckinModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCheckinModalOpen(false)}
                disabled={!userPerception}
              >
                Concluir Check-in (+200 XP)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
