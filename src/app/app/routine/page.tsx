'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Sun,
  Sunset,
  Moon,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  Flame,
  Award,
  CalendarCheck,
} from 'lucide-react';

interface RoutineTaskItem {
  id: string;
  title: string;
  description: string;
  period: 'morning' | 'afternoon' | 'night';
  durationMinutes: number;
  difficulty: string;
  xpReward: number;
  category: string;
  completed: boolean;
  instructions: string[];
}

export default function RoutinePage() {
  const [tasks, setTasks] = useState<RoutineTaskItem[]>([
    {
      id: 't1',
      title: 'Higienização e Proteção Matinal',
      description: 'Limpeza de pele suave e aplicação de protetor solar.',
      period: 'morning',
      durationMinutes: 3,
      difficulty: 'Fácil',
      xpReward: 15,
      category: 'Pele',
      completed: true,
      instructions: [
        'Lave o rosto com água morna e sabonete facial neutro.',
        'Seque dando leves toques com uma toalha limpa.',
        'Aplique uma camada uniforme de protetor solar FPS 30+.',
      ],
    },
    {
      id: 't2',
      title: 'Penteado e Ajuste Matinal',
      description: 'Alinhamento do cabelo e barba antes de sair.',
      period: 'morning',
      durationMinutes: 4,
      difficulty: 'Fácil',
      xpReward: 15,
      category: 'Cabelo & Grooming',
      completed: true,
      instructions: [
        'Umedeça levemente o cabelo.',
        'Aplique uma pequena quantidade de pomada/modelador de efeito fosco.',
        'Penteie na direção natural de crescimento e alinhe os fios soltos da barba.',
      ],
    },
    {
      id: 't3',
      title: 'Checagem Postural e Hidratação da Tarde',
      description: 'Correção de postura nos ombros e beber água.',
      period: 'afternoon',
      durationMinutes: 2,
      difficulty: 'Fácil',
      xpReward: 10,
      category: 'Postura',
      completed: false,
      instructions: [
        'Reajuste a coluna encostando as escápulas na cadeira.',
        'Beba um copo cheio de água (300ml).',
        'Respire fundo 3 vezes mantendo o peito aberto.',
      ],
    },
    {
      id: 't4',
      title: 'Limpeza Noturna e Hidratação',
      description: 'Remoção de impurezas do dia e descanso da pele.',
      period: 'night',
      durationMinutes: 4,
      difficulty: 'Fácil',
      xpReward: 20,
      category: 'Pele & Hábitos',
      completed: false,
      instructions: [
        'Lave o rosto para remover a poluição e resíduos do dia.',
        'Aplique um hidratante facial leve noturno.',
        'Organize as peças de roupa principais para o dia seguinte.',
      ],
    },
  ]);

  const [selectedTaskForModal, setSelectedTaskForModal] = useState<RoutineTaskItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalXP = tasks.filter((t) => t.completed).reduce((acc, t) => acc + t.xpReward, 0);
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'all') return true;
    return t.period === activeTab;
  });

  const periodLabels = {
    morning: { label: 'Manhã', icon: Sun },
    afternoon: { label: 'Tarde', icon: Sunset },
    night: { label: 'Noite', icon: Moon },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
            <CalendarCheck className="h-3.5 w-3.5 text-white" />
            <span>Gestor de Hábitos</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Sua Rotina Diária
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Conclua suas missões diárias para somar XP, subir de nível e manter seu Streak ativo.
          </p>
        </div>

        {/* XP Summary Badge */}
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 border border-amber-800">
            <Zap className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-zinc-400">XP Conquistado Hoje</div>
            <div className="text-lg font-bold text-white">+{totalXP} XP</div>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3 text-sm font-semibold">
            <span className="text-white">Progresso da Rotina de Hoje</span>
            <span className="text-zinc-400">
              {completedCount} de {tasks.length} concluídas ({progressPercent}%)
            </span>
          </div>
          <ProgressBar value={progressPercent} />
        </CardContent>
      </Card>

      {/* Period Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        {[
          { id: 'all', label: 'Todas as tarefas' },
          { id: 'morning', label: 'Manhã', icon: Sun },
          { id: 'afternoon', label: 'Tarde', icon: Sunset },
          { id: 'night', label: 'Noite', icon: Moon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const PeriodIcon = periodLabels[task.period].icon;

          return (
            <Card
              key={task.id}
              variant="bordered"
              className={`transition-all ${
                task.completed ? 'bg-zinc-950/60 border-zinc-800/60 opacity-80' : 'bg-[#0a0a0c]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-0.5 transition-transform active:scale-90"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-zinc-600 hover:border-white transition-colors" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
                        <PeriodIcon className="h-3 w-3" />
                        {periodLabels[task.period].label}
                      </span>
                      <span className="text-[10px] text-zinc-500">• {task.category}</span>
                    </div>

                    <h3
                      className={`text-base font-bold ${
                        task.completed ? 'text-zinc-400 line-through' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{task.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded-lg">
                    +{task.xpReward} XP
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTaskForModal(task)}
                    leftIcon={<HelpCircle className="h-4 w-4" />}
                  >
                    Como fazer?
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* "Como Fazer?" Step-by-Step Modal */}
      {selectedTaskForModal && (
        <Modal
          isOpen={Boolean(selectedTaskForModal)}
          onClose={() => setSelectedTaskForModal(null)}
          title={selectedTaskForModal.title}
          description={`Categoria: ${selectedTaskForModal.category} • Duração: ~${selectedTaskForModal.durationMinutes} min`}
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="h-4 w-4 text-zinc-400" /> {selectedTaskForModal.durationMinutes} minutos
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Zap className="h-4 w-4 text-amber-400" /> +{selectedTaskForModal.xpReward} XP
              </span>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-zinc-400 mb-2">Instruções Passo a Passo</h4>
              <div className="space-y-2">
                {selectedTaskForModal.instructions.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toggleTaskCompletion(selectedTaskForModal.id);
                  setSelectedTaskForModal(null);
                }}
              >
                Concluir Tarefa (+{selectedTaskForModal.xpReward} XP)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
