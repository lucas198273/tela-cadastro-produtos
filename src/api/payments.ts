// src/services/payments.ts

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const APP_ENV = import.meta.env.VITE_APP_ENV || (import.meta.env.DEV ? 'development' : 'production');

console.log(
  `%c[Pagamento Service] Ambiente: ${APP_ENV.toUpperCase()} | Backend: ${API_URL}`,
  APP_ENV === 'development'
    ? 'background:#0f0;color:#000;padding:4px 8px;border-radius:4px;'
    : 'background:#f00;color:#fff;padding:4px 8px;border-radius:4px;'
);

export interface CreatePaymentPayload {
  amount: number;          // em REAIS (ex: 150.75)
  description?: string;
  name: string;            // nome completo (ex: "Lucas Pereira")
  email: string;
  order_nsu?: string;      // opcional, geramos se não vier
}

export interface PaymentResponse {
  type: 'infinitepay_checkout';
  link: string;
  slug?: string;
  order_nsu?: string;
}

function normalizePayload(payload: CreatePaymentPayload) {
  if (!payload.name?.trim() || !payload.email?.trim()) {
    throw new Error('Nome completo e e-mail são obrigatórios');
  }

  if (!payload.amount || payload.amount <= 0) {
    throw new Error('Valor deve ser maior que zero');
  }

  // Split name para first/last (backend espera payer com first_name/last_name)
  const nameParts = payload.name.trim().split(/\s+/);
  const firstName = nameParts[0] || 'Cliente';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    amount: payload.amount,  // envia em reais → backend converte
    description: payload.description ?? 'Pagamento via InfinitePay',
    order_nsu: payload.order_nsu ?? `chk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    payer: {
      first_name: firstName,
      last_name: lastName,
      email: payload.email.trim().toLowerCase(),
    },
  };
}

export async function createPayment(payload: CreatePaymentPayload): Promise<PaymentResponse> {
  const envTag = `[${APP_ENV.toUpperCase()}]`;
  const normalized = normalizePayload(payload);

  console.log(`${envTag} Enviando para backend:`, normalized);

  try {
    const response = await fetch(`${API_URL}/api/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Frontend-Env': APP_ENV,
      },
      body: JSON.stringify(normalized),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        errorData.error ||
        errorData.details ||
        errorData.message ||
        `Erro ${response.status}: ${response.statusText}`;
      console.error(`${envTag} Erro backend (${response.status}):`, errorMsg, errorData);
      throw new Error(errorMsg);
    }

    const json = await response.json();

    if (!json.link || typeof json.link !== 'string' || !json.link.startsWith('http')) {
      console.error(`${envTag} Resposta inválida (sem link válido):`, json);
      throw new Error('Link de pagamento não retornado ou inválido');
    }

    console.log(`${envTag} Sucesso! Link gerado: ${json.link}`);
    return json as PaymentResponse;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Falha ao criar pagamento');
    console.error(`${envTag} Exceção completa:`, error);
    throw error;
  }
}