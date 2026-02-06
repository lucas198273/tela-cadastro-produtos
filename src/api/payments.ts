// src/services/payments.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const APP_ENV =
  import.meta.env.VITE_APP_ENV ||
  (import.meta.env.DEV ? 'development' : 'production');

console.log(
  `%c[Pagamento Service] Ambiente: ${APP_ENV.toUpperCase()} | Backend: ${API_URL}`,
  APP_ENV === 'development'
    ? 'background:#0f0;color:#000;padding:4px 8px;border-radius:4px;'
    : 'background:#f00;color:#fff;padding:4px 8px;border-radius:4px;'
);

export interface CreatePaymentPayload {
  amount: number;          // em REAIS (ex: 150.75)
  description?: string;
  name: string;            // nome completo
  email: string;
  order_nsu?: string;
}

export interface PaymentResponse {
  type: 'infinitepay_checkout';
  link: string;
  slug?: string;
  order_nsu?: string;
}

// ===============================
// Normalização do payload
// ===============================
function normalizePayload(payload: CreatePaymentPayload) {
  if (!payload.name?.trim()) {
    throw new Error('Nome completo é obrigatório');
  }

  if (!payload.email?.trim()) {
    throw new Error('E-mail é obrigatório');
  }

  if (!payload.amount || payload.amount <= 0) {
    throw new Error('Valor deve ser maior que zero');
  }

  return {
    amount: payload.amount, // backend converte para centavos
    description: payload.description ?? 'Pagamento via InfinitePay',
    order_nsu:
      payload.order_nsu ??
      `chk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    customer: {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
    },
  };
}

// ===============================
// Criar pagamento
// ===============================
export async function createPayment(
  payload: CreatePaymentPayload
): Promise<PaymentResponse> {
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

      console.error(
        `${envTag} Erro backend (${response.status}):`,
        errorMsg,
        errorData
      );

      throw new Error(errorMsg);
    }

    const json = await response.json();

    if (!json.link || typeof json.link !== 'string') {
      console.error(`${envTag} Resposta inválida:`, json);
      throw new Error('Link de pagamento não retornado');
    }

    console.log(`${envTag} Sucesso! Link gerado: ${json.link}`);
    return json as PaymentResponse;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err : new Error('Falha ao criar pagamento');
    console.error(`${envTag} Exceção completa:`, error);
    throw error;
  }
}
