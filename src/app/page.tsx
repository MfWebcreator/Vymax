import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Flame,
  ShieldCheck,
  Bot,
  ArrowRight,
  Zap,
  Award,
  CalendarCheck,
} from 'lucide-react';
import { LogoComponent } from '@/components/brand/LogoComponent';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <LogoComponent width={120} height={120} />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Começar agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
        
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-md mb-8">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Evolução de Apresentação Pessoal Guiada por IA</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Transforme <span className="text-zinc-400">consistência</span> em evolução de apresentação.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            O VeyroMax é a sua plataforma completa de evolução pessoal. Combine análise visual por IA, rotina personalizada de cuidados, grooming, estilo, postura e sistema de gamificação diário.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Criar meu plano gratuito
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Já tenho conta
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-zinc-400" /> Sem promessas irreais
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-zinc-400" /> 100% Funcional e Prático
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-zinc-900 bg-[#060608]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Um ecossistema completo para o seu progresso diário
            </h2>
            <p className="mt-4 text-zinc-400">
              Desenvolvido com arquitetura SaaS de alta performance para impulsionar seus hábitos reais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Análise Inicial com IA</CardTitle>
                <CardDescription>
                  Avaliação precisa de características visíveis e relevantes para sua apresentação (cabelo, grooming, pele básica, estilo e postura).
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <CalendarCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Rotina & "Como Fazer?"</CardTitle>
                <CardDescription>
                  Tarefas diárias organizadas por períodos (manhã, tarde e noite) com tutoriais práticos passo a passo e tempo estimado.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Check-in Quinzenal Antes/Depois</CardTitle>
                <CardDescription>
                  A cada 14 dias, realize novos check-ins com fotos. A IA compara e registra a evolução real do seu progresso em gráficos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle>Gamificação & Streak</CardTitle>
                <CardDescription>
                  Ganhe XP ao concluir tarefas, suba de Nível, mantenha sua sequência de dias consecutivos (Streak) e desbloqueie 40+ Conquistas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Veyro AI Chat Assistant</CardTitle>
                <CardDescription>
                  Assistente conversacional que responde dúvidas específicas sobre cortes de cabelo, cuidados de pele, caimento de roupas e hábitos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="bordered" className="bg-[#0a0a0c]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                  <Award className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle>Desafios de 7, 30 e 90 dias</CardTitle>
                <CardDescription>
                  Supere metas focadas para solidificar novos hábitos e acelerar seu potencial de apresentação de forma estruturada.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-t border-zinc-900 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Planos desenhados para o seu ritmo
            </h2>
            <p className="mt-4 text-zinc-400">
              Escolha a assinatura ideal para manter sua consistência de evolução.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* FREE */}
            <Card variant="bordered" className="flex flex-col justify-between bg-[#0a0a0c]">
              <div>
                <CardHeader>
                  <CardTitle className="text-xl">FREE</CardTitle>
                  <CardDescription>Para começar a sua jornada</CardDescription>
                  <div className="mt-4 text-3xl font-extrabold text-white">R$ 0</div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Análise inicial básica
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Rotina diária essencial
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> XP, Níveis e Streak
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> 5 respostas/dia Veyro AI
                  </div>
                </CardContent>
              </div>
              <div className="p-5 pt-0">
                <Link href="/signup" className="w-full">
                  <Button variant="outline" className="w-full">
                    Começar grátis
                  </Button>
                </Link>
              </div>
            </Card>

            {/* PRO */}
            <Card variant="bordered" className="flex flex-col justify-between bg-[#0d0d10] border-zinc-700 relative">
              <div className="absolute -top-3 right-4 rounded-full bg-white text-black px-2.5 py-0.5 text-[10px] font-bold">
                POPULAR
              </div>
              <div>
                <CardHeader>
                  <CardTitle className="text-xl">PRO</CardTitle>
                  <CardDescription>Consistência e evolução acelerada</CardDescription>
                  <div className="mt-4 text-3xl font-extrabold text-white">
                    R$ 19,90 <span className="text-xs font-normal text-zinc-400">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-white" /> Análise avançada por IA
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-white" /> Check-in quinzenal com fotos
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-white" /> Comparativo Antes/Depois
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-white" /> Veyro AI ilimitado
                  </div>
                </CardContent>
              </div>
              <div className="p-5 pt-0">
                <Link href="/signup?plan=PRO" className="w-full">
                  <Button variant="primary" className="w-full">
                    Assinar PRO
                  </Button>
                </Link>
              </div>
            </Card>

            {/* PRO+ */}
            <Card variant="bordered" className="flex flex-col justify-between bg-[#0a0a0c]">
              <div>
                <CardHeader>
                  <CardTitle className="text-xl">PRO+</CardTitle>
                  <CardDescription>Para metas de médio e longo prazo</CardDescription>
                  <div className="mt-4 text-3xl font-extrabold text-white">
                    R$ 39,90 <span className="text-xs font-normal text-zinc-400">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Tudo do Plano PRO
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Planos estruturados de 90 dias
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Adaptação diária por IA
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Relatórios de 30/60/90 dias
                  </div>
                </CardContent>
              </div>
              <div className="p-5 pt-0">
                <Link href="/signup?plan=PRO_PLUS" className="w-full">
                  <Button variant="outline" className="w-full">
                    Assinar PRO+
                  </Button>
                </Link>
              </div>
            </Card>

            {/* ELITE */}
            <Card variant="bordered" className="flex flex-col justify-between bg-[#0a0a0c]">
              <div>
                <CardHeader>
                  <CardTitle className="text-xl">ELITE</CardTitle>
                  <CardDescription>Acompanhamento contínuo completo</CardDescription>
                  <div className="mt-4 text-3xl font-extrabold text-white">
                    R$ 79,90 <span className="text-xs font-normal text-zinc-400">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Tudo do Plano PRO+
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Planos avançados de 180 dias
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Coach IA Avançado
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Acesso antecipado a recursos
                  </div>
                </CardContent>
              </div>
              <div className="p-5 pt-0">
                <Link href="/signup?plan=ELITE" className="w-full">
                  <Button variant="outline" className="w-full">
                    Assinar ELITE
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 bg-black text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoComponent width={90} height={90} showLink={false} />
            <span>© 2026 VeyroMax. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300">Privacidade</Link>
            <Link href="/terms" className="hover:text-zinc-300">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
