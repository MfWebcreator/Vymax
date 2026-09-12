/**
 * Asaas Integration Service
 * Server-side wrapper for Asaas Payment Gateway subscriptions and webhooks.
 */

export interface AsaasCustomerInput {
  name: string;
  email: string;
  cpfCnpj?: string;
}

export interface AsaasSubscriptionInput {
  customerId: string;
  value: number;
  nextDueDate: string;
  cycle: 'MONTHLY';
  description: string;
}

export class AsaasService {
  private static get apiKey() {
    return process.env.ASAAS_API_KEY || '';
  }

  private static get baseUrl() {
    return process.env.ASAAS_ENV === 'production'
      ? 'https://www.asaas.com/api/v3'
      : 'https://sandbox.asaas.com/api/v3';
  }

  /**
   * Create customer record in Asaas
   */
  static async createCustomer(input: AsaasCustomerInput) {
    if (!this.apiKey) {
      console.warn('ASAAS_API_KEY missing. Returning simulated customer object.');
      return { id: `cus_${Date.now()}`, ...input };
    }

    const res = await fetch(`${this.baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: this.apiKey,
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.errors?.[0]?.description || 'Erro ao criar cliente no Asaas.');
    }

    return await res.json();
  }

  /**
   * Create recurring subscription in Asaas
   */
  static async createSubscription(input: AsaasSubscriptionInput) {
    if (!this.apiKey) {
      console.warn('ASAAS_API_KEY missing. Returning simulated subscription object.');
      return { id: `sub_${Date.now()}`, status: 'ACTIVE', ...input };
    }

    const res = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: this.apiKey,
      },
      body: JSON.stringify({
        customer: input.customerId,
        billingType: 'UNDEFINED',
        value: input.value,
        nextDueDate: input.nextDueDate,
        cycle: input.cycle,
        description: input.description,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.errors?.[0]?.description || 'Erro ao criar assinatura no Asaas.');
    }

    return await res.json();
  }
}
