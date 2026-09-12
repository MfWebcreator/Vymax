'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function SubscriptionPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('PRO');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const plans = [
    {
      id: 'FREE',
      name: 'FREE',
      priceMonthly: 0,
      priceAnnualMonthly: 0,
      badge: 'Básico',
      headline: 'Recursos básicos iniciais para sua jornada',
      features: [
        'Análise inicial básica de apresentação',
        'Rotina diária essencial (Manhã/Noite)',
        'Gamificação (XP, Níveis e Streak)',
        '5 mensagens por dia na Veyro AI',
      ],
    },
    {
      id: 'PRO',
      name: 'PRO',
      priceMonthly: 19.90,
      priceAnnualMonthly: 15.90,
      badge: 'POPULAR',
      headline: 'Análise avançada + Check-in quinzenal com fotos',
      features: [
        'Análise avançada por IA com score 0-10',
        'Check-in a cada 14 dias com foto',
        'Comparativo observável Antes vs Depois',
        'Veyro AI ilimitado para tirar dúvidas',
        'Acesso a Desafios e Relatórios detalhados',
      ],
      popular: true,
    },
    {
      id: 'PRO_PLUS',
      name: 'PRO+',
      priceMonthly: 39.90,
      priceAnnualMonthly: 31.90,
      badge: '90 DIAS',
      headline: 'Planos de 90 dias com IA adaptativa',
      features: [
        'Tudo do Plano PRO incluído',
        'Planos de 90 dias com IA adaptativa',
        'Relatórios de evolução (30, 60 e 90 dias)',
        'Personalização profunda de categorias',
      ],
    },
    {
      id: 'ELITE',
      name: 'ELITE',
      priceMonthly: 79.90,
      priceAnnualMonthly: 63.90,
      badge: 'VIP',
      headline: 'Acompanhamento VIP 180 dias de consistência',
      features: [
        'Tudo do Plano PRO+ incluído',
        'Plano avançado de 180 dias de consistência',
        'Coach IA avançado contínuo',
        'Acesso antecipado a novas ferramentas',
      ],
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];
  const finalPrice =
    billingCycle === 'annual'
      ? currentPlan.priceAnnualMonthly
      : currentPlan.priceMonthly;

  const handleConfirmCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        setIsCheckoutModalOpen(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-28">
      {/* App Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span>Planos de Assinatura</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight sm:text-2xl">
          Escolha seu Plano de Evolução
        </h1>
        <p className="text-xs text-zinc-400">
          Selecione a opção ideal para manter sua consistência diária no VeyroMax.
        </p>
      </div>

      {/* Billing Switcher */}
      <div className="flex justify-center pt-1">
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mensal
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
              billingCycle === 'annual'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Anual</span>
            <span className="rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-1.5 py-0.2 font-bold">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Stacked Plan Selection List */}
      <div className="space-y-2.5">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const displayPrice =
            billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative flex items-center justify-between rounded-xl p-3.5 transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-zinc-900 border-white shadow-lg opacity-100 ring-1 ring-white/20'
                  : 'bg-[#09090b] border-zinc-800/80 hover:border-zinc-700 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Radio Indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? 'border-white bg-white text-black font-bold text-[10px]'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{plan.name}</span>
                    {plan.badge && (
                      <span
                        className={`rounded-full px-2 py-0.2 text-[9px] font-bold ${
                          plan.popular
                            ? 'bg-white text-black'
                            : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{plan.headline}</p>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-white">
                  {displayPrice === 0 ? 'Grátis' : `R$ ${displayPrice.toFixed(2).replace('.', ',')}`}
                </div>
                {displayPrice > 0 && (
                  <span className="text-[9px] text-zinc-400 block">/mês</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Plan Features Card */}
      <Card variant="bordered" className="bg-[#0a0a0c] border-zinc-800 p-4">
        <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider mb-2.5">
          Recursos Incluídos no {currentPlan.name}:
        </h4>
        <div className="space-y-2">
          {currentPlan.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Sticky App Action Bar */}
      <div className="fixed bottom-16 md:bottom-4 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black via-black to-transparent md:pl-64">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3 rounded-xl bg-zinc-900 border border-zinc-700 p-3 shadow-2xl">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">
              Plano Selecionado
            </div>
            <div className="text-xs font-bold text-white">
              VeyroMax {currentPlan.name} •{' '}
              {finalPrice === 0 ? 'Grátis' : `R$ ${finalPrice.toFixed(2).replace('.', ',')}/mês`}
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCheckoutModalOpen(true)}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {currentPlan.id === 'FREE' ? 'Manter Grátis' : 'Continuar com Assinatura'}
          </Button>
        </div>
      </div>

      {/* Native Checkout Modal */}
      {isCheckoutModalOpen && (
        <Modal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          title={`Assinatura VeyroMax ${currentPlan.name}`}
          description="Pagamento seguro via Asaas"
        >
          <div className="space-y-4 pt-2">
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Plano:</span>
                <strong className="text-white">VeyroMax {currentPlan.name}</strong>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Ciclo:</span>
                <strong className="text-white">
                  {billingCycle === 'annual' ? 'Anual (-20% OFF)' : 'Mensal'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Valor:</span>
                <strong className="text-white">
                  {finalPrice === 0 ? 'Grátis' : `R$ ${finalPrice.toFixed(2).replace('.', ',')}/mês`}
                </strong>
              </div>
            </div>

            {successMessage ? (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-950 border border-emerald-800 p-4 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Assinatura confirmada pelo Asaas! Recursos liberados.</span>
              </div>
            ) : (
              <Button
                variant="primary"
                className="w-full"
                isLoading={isProcessing}
                onClick={handleConfirmCheckout}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Confirmar Assinatura (Asaas)
              </Button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
              <span>Cancelamento fácil a qualquer momento</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
