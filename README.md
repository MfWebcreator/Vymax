# VeyroMax — Plataforma SaaS de Evolução Pessoal

O **VeyroMax** é um SaaS completo de evolução e apresentação pessoal baseado em hábitos, grooming, cuidados de cabelo, skincare básico, estilo, postura e consistência.

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Recharts.
- **Backend / DB / Auth**: Supabase PostgreSQL, Supabase Auth (`@supabase/ssr`), Supabase Storage (bucket privado `user-photos`).
- **Arquitetura de IA**: Camada de abstração `AIService` no servidor com fallback seguro e guardrails rígidos.
- **Pagamentos**: Asaas Payment Gateway (Assinaturas, Clientes, Webhook com verificação de token).
- **Identidade Visual**: Logo oficial fornecida em `/public/brand/logo.png`.

---

## 🛠️ Instalação e Execução Local

```bash
# 1. Entrar na pasta do projeto
cd veyromax

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# 4. Executar servidor de desenvolvimento
npm run dev
```

---

## 🗄️ Banco de Dados & Supabase Migrations

Execute o script de migração contido em:
`supabase/migrations/01_initial_schema.sql`

O script cria todas as 16 tabelas do banco, políticas RLS (Row Level Security), dados iniciais de planos e conquistas.

---

## 🔒 Segurança e Guardrails da IA

A análise visual e o coach Veyro AI seguem regras estritas de segurança:
1. **Sem diagnósticos médicos**: Não diagnostica doenças de pele ou alopecia.
2. **Sem inferências sensíveis**: Não infere raça, etnia, gênero, religião ou personalidade.
3. **Sem promessas irreais**: Não promete alterações ósseas faciais (nariz, mandíbula).
4. **Privacidade**: As fotos ficam em bucket privado com acesso exclusivo via URLs temporárias assinadas.
