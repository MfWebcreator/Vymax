'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Share2, Copy, CheckCircle2, ShieldCheck, Gift, Users, Sparkles } from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'VEYRO-MATH-8492';
  const referralLink = `https://veyromax.app/signup?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
          <Share2 className="h-3.5 w-3.5 text-white" />
          <span>Programa de Indicação</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Convide & Ganhe Análises
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Compartilhe seu código exclusivo. Seu convidado ganha +2 análises e você ganha +1 análise.
        </p>
      </div>

      {/* Main Copy Link Card */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-zinc-400">Seu Código de Indicação</span>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full flex-1 rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm font-mono font-bold text-white tracking-wider text-center sm:text-left">
                {referralCode}
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                onClick={handleCopy}
                leftIcon={copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              >
                {copied ? 'Link Copiado!' : 'Copiar Link de Convite'}
              </Button>
            </div>
          </div>

          {/* Rules & Rewards summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold">
                +2
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Para o Novo Amigo</h4>
                <p className="text-[11px] text-zinc-400">+2 Análises Gratuitas ao se cadastrar</p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold">
                +1
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Para Você (Indicador)</h4>
                <p className="text-[11px] text-zinc-400">+1 Análise Liberada após a 1ª análise do amigo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anti-Fraud Protection Details */}
      <Card variant="bordered" className="bg-[#0a0a0c]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white" /> Regras de Segurança Anti-Fraude
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-zinc-400">
          <div className="flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>A recompensa do indicador é liberada <strong>somente após</strong> o convidado concluir o onboarding e a 1ª análise inicial.</span>
          </div>
          <div className="flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Proteção contra auto-indicação e contas duplicadas validadas no banco de dados.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
