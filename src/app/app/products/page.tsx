'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  partnerName: string;
  affiliateUrl: string;
}

export default function ProductsPage() {
  const products: ProductItem[] = [
    {
      id: 'p1',
      title: 'Gel de Limpeza Facial Neutro FPS 30',
      category: 'Pele',
      description: 'Limpeza profunda sem ressecar a pele. Recomendado para o uso diário matinal.',
      price: 'R$ 49,90',
      partnerName: 'Parceiro Verificado',
      affiliateUrl: '#',
    },
    {
      id: 'p2',
      title: 'Pomada Modeladora Efeito Matte / Fosco',
      category: 'Cabelo',
      description: 'Fixação média com acabamento natural sem brilho excessivo para penteados modernos.',
      price: 'R$ 39,90',
      partnerName: 'Parceiro Verificado',
      affiliateUrl: '#',
    },
    {
      id: 'p3',
      title: 'Óleo Hidratante e Fortalecedor de Barba',
      category: 'Grooming',
      description: 'Alinha fios rebeldes da barba e alivia coceiras com toque seco.',
      price: 'R$ 35,00',
      partnerName: 'Parceiro Verificado',
      affiliateUrl: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-2">
          <ShoppingBag className="h-3.5 w-3.5 text-white" />
          <span>Curadoria VeyroMax</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Produtos Recomendados
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Seleção de produtos essenciais para potencializar sua rotina de cuidados pessoais.
        </p>
      </div>

      <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 flex items-start gap-3 text-xs text-zinc-400">
        <ShieldCheck className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />
        <div>
          <strong className="text-zinc-200">Transparência de Parceria:</strong> Alguns links nesta página contêm identificadores de afiliados. Recomendamos apenas produtos alinhados aos princípios de higiene e apresentação.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.id} variant="bordered" className="flex flex-col justify-between bg-[#0a0a0c]">
            <div>
              <CardHeader>
                <span className="inline-block w-fit rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400 uppercase mb-2">
                  {p.category}
                </span>
                <CardTitle className="text-base">{p.title}</CardTitle>
                <CardDescription className="text-xs mt-1">{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold text-white mb-1">{p.price}</div>
                <span className="text-[10px] text-zinc-500">{p.partnerName}</span>
              </CardContent>
            </div>

            <div className="p-5 pt-0">
              <a href={p.affiliateUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full" rightIcon={<ExternalLink className="h-4 w-4" />}>
                  Ver Produto no Parceiro
                </Button>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
