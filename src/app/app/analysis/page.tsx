'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { AIService, type AnalysisResult } from '@/lib/ai/AIService';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Scissors,
  UserCheck,
  Droplet,
  Shirt,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Load stored analysis or generate fallback
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('veyro_latest_analysis');
      if (stored) {
        try {
          setAnalysis(JSON.parse(stored));
          return;
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Default analysis if none stored yet
    AIService.analyzeProfile({
      fullName: 'Usuário',
      mainGoal: 'Melhorar apresentação geral',
      hairType: 'Liso',
      groomingStyle: 'Barba curta',
      skinType: 'Mista',
      stylePreference: 'Moderno',
      timeAvailability: '15 min/dia',
      mainDifficulty: 'Consistência',
    }).then(setAnalysis);
  }, []);

  if (!analysis) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <Sparkles className="h-8 w-8 text-white animate-spin mx-auto" />
          <p className="text-sm text-zinc-400">Carregando análise de apresentação...</p>
        </div>
      </div>
    );
  }

  const categoryIcons: Record<string, any> = {
    hair: Scissors,
    grooming: UserCheck,
    skin: Droplet,
    style: Shirt,
    presentation: Compass,
    habits: Sparkles,
  };

  const categoryLabels: Record<string, string> = {
    hair: 'Cabelo',
    grooming: 'Grooming / Barba',
    skin: 'Cuidados com a Pele',
    style: 'Estilo & Caimento',
    presentation: 'Postura & Presença',
    habits: 'Consistência de Hábitos',
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span>Análise de Apresentação Pessoal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Seu Relatório de Apresentação Inicial
        </h1>
        <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
          Avaliação de características visíveis e relevantes para sua presença diária, hábitos e cuidado.
        </p>
      </div>

      {/* Main Score & Potential Cards */}
      <ScoreBadge score={analysis.currentScore} potentialScore={analysis.potentialScore} />

      {/* Important Disclaimer Notice */}
      <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 flex items-start gap-3 text-xs text-zinc-400">
        <ShieldCheck className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />
        <div>
          <strong className="text-zinc-200">Nota de Apresentação vs Valor Pessoal:</strong> Esta nota avalia exclusivamente hábitos observáveis, alinhamento de grooming, corte e consistência de cuidados diários. Não representa beleza física estrutural ou valor pessoal.
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Avaliação por Categoria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analysis.categories).map(([key, cat]) => {
            const Icon = categoryIcons[key] || Sparkles;
            const label = categoryLabels[key] || key;

            return (
              <Card key={key} variant="bordered" className="bg-[#0a0a0c]">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{label}</CardTitle>
                        <span className="text-[11px] text-zinc-400">{cat.status}</span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-white">{cat.score.toFixed(1)}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                    {cat.tip}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Strengths & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card variant="bordered" className="bg-[#0a0a0c]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Pontos Fortes Observados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.strengths.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card variant="bordered" className="bg-[#0a0a0c]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-amber-400">
              <AlertCircle className="h-5 w-5 text-amber-400" /> Principais Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.opportunities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-800">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Initial Plan Recommendations */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recomendações do Plano Inicial</CardTitle>
              <CardDescription>Ações prioritárias para impulsionar seus primeiros 14 dias</CardDescription>
            </div>
            <Link href="/app/routine">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Ver Minha Rotina
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {analysis.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-4">
              <div>
                <span className="inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 uppercase mb-1">
                  Impacto {rec.impact}
                </span>
                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
