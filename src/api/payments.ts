// services/payments.ts

// Detecção de ambiente (uma única vez)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const APP_ENV = import.meta.env.VITE_APP_ENV || (import.meta.env.DEV ? "development" : "production");

// Log inicial de configuração (aparece só uma vez)
console.log(
  `%c[Pagamento] Ambiente: ${APP_ENV.toUpperCase()} | API: ${API_URL}`,
  APP_ENV === "development"
    ? "background: #0f0; color: black; padding: 4px 8px; border-radius: 4px;"
    : "background: #f00; color: white; padding: 4px 8px; border-radius: 4px;"
);

// Tipos
export type PaymentMethod = "card" | "pix" | "any";

export interface CreatePaymentPayload {
  amount: number;
  method?: PaymentMethod;          // opcional (InfinitePay ignora)
  description?: string;
  payer?: {
    first_name: string;
    last_name?: string;
    email: string;
    cpf?: string;
  };
  order_nsu?: string;              // recomendado para rastreamento
}

export interface PaymentResponse {
  type: "infinitepay_checkout";
  link: string;
  order_nsu?: string;
  slug?: string;                   // para debug/polling futuro
}

// Função principal
export async function createPayment(
  payload: CreatePaymentPayload
): Promise<PaymentResponse> {
  const envTag = `[${APP_ENV.toUpperCase()}]`;

  console.log(`${envTag} Enviando pagamento InfinitePay:`, payload);

  try {
    const response = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Env": APP_ENV,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`${envTag} Erro do backend:`, errorData);
      throw new Error(
        errorData.error ||
        errorData.details ||
        errorData.message ||
        `Erro HTTP ${response.status}`
      );
    }

    const json = await response.json();

    if (!json.link) {
      throw new Error("Link de pagamento não retornado pelo backend");
    }

    console.log(
      `${envTag} Sucesso! Link:`,
      json.link.length > 60 ? json.link.slice(0, 57) + "..." : json.link
    );

    return json as PaymentResponse;
  } catch (err) {
    console.error(`${envTag} Falha na requisição:`, err);
    throw err instanceof Error
      ? err
      : new Error("Falha desconhecida ao criar pagamento");
  }
}