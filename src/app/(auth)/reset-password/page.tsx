'use client';

import React from 'react';
import Link from 'next/link';
import { LogoComponent } from '@/components/brand/LogoComponent';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { loginWithGoogle } from '../actions';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <LogoComponent width={140} height={140} />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Autenticação via Google
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          O VeyroMax utiliza login unificado via Google
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="bordered" className="bg-[#0c0c0e]">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Sua conta é protegida diretamente pela segurança do Google. Não há necessidade de criar ou redefinir senhas locais.
            </p>

            <Button
              type="button"
              variant="primary"
              size="md"
              className="w-full bg-white text-black hover:bg-zinc-200 border border-white font-semibold flex items-center justify-center gap-2"
              onClick={() => loginWithGoogle()}
            >
              <span>Entrar com o Google</span>
            </Button>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-zinc-400">
          <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-zinc-300 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para a página inicial de login
          </Link>
        </p>
      </div>
    </div>
  );
}
