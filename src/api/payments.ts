// services/payments.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const APP_ENV = import.meta.env.VITE_APP_ENV || (import.meta.env.DEV ? "development" : "production");

console.log(
  `%c[Pagamento] Ambiente: ${APP_ENV.toUpperCase()} | API: ${API_URL}`,
  APP_ENV === "development"
    ? "background:#0f0;color:#000;padding:4px 8px;border-radius:4px;"
    : "background:#f00;color:#fff;padding:4px 8px;border-radius:4px;"
);

export interface CreatePaymentPayload {
  amount: number;              // em centavos (ex: 15075 para R$ 150,75)
  description?: string;
  name: string;                // nome completo do pagador
  email: string;
  order_nsu?: string;
}

export interface PaymentResponse {
  type: "infinitepay_checkout";
  link: string;
  order_nsu?: string;
  slug?: string;
}

function normalizePayload(payload: CreatePaymentPayload) {
  if (!payload.name.trim() || !payload.email.trim()) {
    throw new Error("Nome e e-mail são obrigatórios");
  }

  if (!payload.amount || payload.amount <= 0 || !Number.isInteger(payload.amount)) {
    throw new Error("Valor deve ser inteiro positivo em centavos");
  }

  return {
    amount: payload.amount,
    description: payload.description ?? "Pagamento via InfinitePay",
    order_nsu: payload.order_nsu ?? `chk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    customer: {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
    },
  };
}

export async function createPayment(payload: CreatePaymentPayload): Promise<PaymentResponse> {
  const envTag = `[${APP_ENV.toUpperCase()}]`;
  const normalized = normalizePayload(payload);

  console.log(`${envTag} Enviando payload normalizado:`, normalized);

  try {
    const response = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Env": APP_ENV,
      },
      body: JSON.stringify(normalized),
    });

    const json = await response.json();

    if (!response.ok) {
      const errorDetail = json.error || json.details || json.message || JSON.stringify(json, null, 2) || `Status ${response.status}`;
      console.error(`${envTag} Erro do backend (status ${response.status}):`, errorDetail);
      throw new Error(errorDetail);
    }

    if (!json.link) {
      throw new Error("Link de pagamento não retornado pela InfinitePay");
    }

    console.log(`${envTag} Checkout gerado:`, json.link);
    return json as PaymentResponse;
  } catch (err) {
    console.error(`${envTag} Falha completa na requisição:`, err);
    throw err instanceof Error ? err : new Error("Falha desconhecida ao criar pagamento");
  }
}