'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { AIService } from '@/lib/ai/AIService';
import { Bot, Send, User, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function VeyroAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        'Olá! Sou o Veyro AI, seu assistente pessoal de apresentação, rotina e hábitos. Como posso te orientar hoje com corte, barba, skincare ou estilo?',
      timestamp: '17:40',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      // Call AIService chat endpoint
      const aiReplyText = await AIService.chatWithVeyro(query);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    'Qual corte de cabelo combina com meu objetivo?',
    'O que preciso fazer na rotina de hoje?',
    'Como cuidar melhor da minha pele no dia a dia?',
    'Dicas para melhorar o caimento das minhas roupas',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 mb-1">
            <Bot className="h-3.5 w-3.5 text-white" />
            <span>IA Conversacional</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Veyro AI Coach
          </h1>
        </div>

        <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-zinc-400 font-medium">
          Contexto do Perfil Ativo
        </span>
      </div>

      {/* Main Chat Container */}
      <Card variant="bordered" className="flex-1 flex flex-col bg-[#0a0a0c] overflow-hidden p-0">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black font-bold">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-md rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 text-white rounded-br-none border border-zinc-700'
                    : 'bg-zinc-950 text-zinc-200 rounded-bl-none border border-zinc-800'
                }`}
              >
                <p>{msg.content}</p>
                <span className="mt-1 block text-[10px] text-zinc-500 text-right">
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white font-bold border border-zinc-700">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 p-3 rounded-xl w-fit border border-zinc-800">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Veyro AI está formulando a resposta...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40 overflow-x-auto flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t border-zinc-800 bg-[#0c0c0f]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Digite sua dúvida sobre rotina, corte, pele ou estilo..."
              className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputQuery.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
