'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoComponent } from '@/components/brand/LogoComponent';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { AIService, type AnalysisInput } from '@/lib/ai/AIService';
import { Sparkles, ArrowRight, ArrowLeft, Camera, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState<AnalysisInput>({
    fullName: 'Usuário VeyroMax',
    mainGoal: 'Melhorar apresentação geral e consistência',
    hairType: 'Liso',
    groomingStyle: 'Barba curta desenhada',
    skinType: 'Mista',
    stylePreference: 'Moderno / Minimalista',
    timeAvailability: '15 minutos/dia',
    mainDifficulty: 'Falta de consistência diária',
    photoUrl: undefined,
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      // Execute AIService Analysis
      const result = await AIService.analyzeProfile(formData);

      // Store initial analysis in localStorage for local demo mode or server action
      if (typeof window !== 'undefined') {
        localStorage.setItem('veyro_latest_analysis', JSON.stringify(result));
        localStorage.setItem('veyro_onboarding_done', 'true');
      }

      // Small delay for fluid UI processing state
      setTimeout(() => {
        router.push('/app/analysis');
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Header logo */}
      <div className="mx-auto text-center mb-6">
        <LogoComponent width={130} height={130} showLink={false} />
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
          <span>Passo {step} de 4</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i <= step ? 'bg-white' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <Card variant="bordered" className="bg-[#0c0c0f]">
          <CardContent className="pt-6">
            {isProcessing ? (
              <div className="py-12 text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <Loader2 className="h-12 w-12 text-white animate-spin" />
                  <Sparkles className="h-5 w-5 text-zinc-300 absolute" />
                </div>
                <h3 className="text-xl font-bold text-white">Analisando seu Perfil de Apresentação...</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  A IA do VeyroMax está processando seus dados e gerando seu plano personalizado de consistência.
                </p>
              </div>
            ) : (
              <>
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">Qual é o seu objetivo principal?</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Selecione a meta prioritária para personalizarmos seu plano.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        'Melhorar apresentação geral e consistência',
                        'Ajustar corte de cabelo e estilo de barba',
                        'Criar rotina diária sólida de cuidados com a pele',
                        'Melhorar caimento das roupas e presença pessoal',
                      ].map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setFormData({ ...formData, mainGoal: goal })}
                          className={`flex w-full items-center justify-between rounded-xl p-3.5 text-left text-sm transition-all border ${
                            formData.mainGoal === goal
                              ? 'bg-zinc-800 border-white text-white font-medium'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <span>{goal}</span>
                          {formData.mainGoal === goal && (
                            <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Tipo de Cabelo
                      </label>
                      <select
                        value={formData.hairType}
                        onChange={(e) => setFormData({ ...formData, hairType: e.target.value })}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="Liso">Liso</option>
                        <option value="Ondulado">Ondulado</option>
                        <option value="Cacheado">Cacheado</option>
                        <option value="Crespo">Crespo</option>
                        <option value="Raspado / Calvo">Raspado / Calvo</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">Grooming & Cuidados com a Pele</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Nos ajude a calibrar os produtos e passos recomendados.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Estilo de Grooming / Barba
                      </label>
                      <select
                        value={formData.groomingStyle}
                        onChange={(e) => setFormData({ ...formData, groomingStyle: e.target.value })}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="Barba curta desenhada">Barba curta desenhada</option>
                        <option value="Barba cheia alinhada">Barba cheia alinhada</option>
                        <option value="Rosto liso / Sem barba">Rosto liso / Sem barba</option>
                        <option value="Cavanhaque / Bigode">Cavanhaque / Bigode</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Sensibilidade / Tipo de Pele
                      </label>
                      <select
                        value={formData.skinType}
                        onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="Mista">Mista (Oleosa no nariz/testa)</option>
                        <option value="Oleosa">Oleosa</option>
                        <option value="Seca">Seca / Sensível</option>
                        <option value="Normal">Normal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Estilo de Vestuário Preferido
                      </label>
                      <select
                        value={formData.stylePreference}
                        onChange={(e) => setFormData({ ...formData, stylePreference: e.target.value })}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="Moderno / Minimalista">Moderno / Minimalista</option>
                        <option value="Casual Alinhado">Casual Alinhado</option>
                        <option value="Streetwear Tecnológico">Streetwear Tecnológico</option>
                        <option value="Esportivo Elegante">Esportivo Elegante</option>
                        <option value="Social / Formal">Social / Formal</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">Disponibilidade e Desafios</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Sua rotina será montada para caber no seu tempo real.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Tempo diário para rotina
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['5-10 minutos', '15 minutos', '30+ minutos'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeAvailability: time })}
                            className={`rounded-xl p-3 text-center text-xs font-medium border transition-all ${
                              formData.timeAvailability === time
                                ? 'bg-zinc-800 border-white text-white'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">
                        Principal dificuldade atual
                      </label>
                      <select
                        value={formData.mainDifficulty}
                        onChange={(e) => setFormData({ ...formData, mainDifficulty: e.target.value })}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:outline-none"
                      >
                        <option value="Falta de consistência diária">Falta de consistência diária</option>
                        <option value="Não sei quais produtos usar">Não sei quais produtos usar</option>
                        <option value="Falta de tempo pela manhã">Falta de tempo pela manhã</option>
                        <option value="Dificuldade em combinar peças">Dificuldade em combinar peças</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">Foto para Análise Visual (Opcional)</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        A foto permite calibrar a nota de apresentação e gerar o comparativo quinzenal Antes/Depois.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 mb-3">
                        <Camera className="h-6 w-6 text-zinc-300" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Envie uma foto frontal neutra
                      </p>
                      <p className="text-xs text-zinc-500 max-w-xs mt-1">
                        Boa iluminação, sem filtros e com expressão neutra para maior precisão.
                      </p>

                      <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors border border-zinc-700">
                        <span>Selecionar Imagem</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              setFormData({
                                ...formData,
                                photoUrl: URL.createObjectURL(file),
                              });
                            }
                          }}
                        />
                      </label>

                      {formData.photoUrl && (
                        <span className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Foto carregada com sucesso!
                        </span>
                      )}
                    </div>

                    <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-3 flex items-start gap-2.5 text-[11px] text-zinc-400">
                      <ShieldCheck className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />
                      <span>
                        <strong>Privacidade Máxima:</strong> Suas fotos ficam armazenadas em bucket privado e nunca são compartilhadas publicamente.
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/80">
                  {step > 1 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      leftIcon={<ArrowLeft className="h-4 w-4" />}
                    >
                      Voltar
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    {step === 4 ? 'Gerar Minha Análise & Plano' : 'Próximo'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
