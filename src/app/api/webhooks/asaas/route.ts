import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const webhookToken = req.headers.get('asaas-access-token');
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    // Token signature check if configured
    if (expectedToken && webhookToken !== expectedToken) {
      return NextResponse.json({ error: 'Assinatura inválida do webhook' }, { status: 401 });
    }

    const payload = await req.json();
    const event = payload.event;
    const payment = payload.payment;

    console.log(`[Asaas Webhook] Evento recebido: ${event}`, payment);

    switch (event) {
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_CONFIRMED':
        // Update subscription status in Supabase DB to 'active'
        break;

      case 'PAYMENT_OVERDUE':
        // Update subscription status to 'past_due'
        break;

      case 'PAYMENT_DELETED':
      case 'SUBSCRIPTION_DELETED':
        // Update subscription status to 'canceled'
        break;

      default:
        console.log(`[Asaas Webhook] Evento não mapeado: ${event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Asaas Webhook Error]:', error);
    return NextResponse.json({ error: 'Erro ao processar webhook' }, { status: 500 });
  }
}
