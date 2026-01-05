/* ================================
 * Tipos de pagamento aceitos
 * ================================ */
export type PaymentMethod = "pix" | "card" | "boleto";

/* ================================
 * Pagador (usado somente no PIX)
 * ================================ */
export interface Payer {
  email: string;
  first_name: string;
  last_name: string;
  cpf: string;
}

/* ================================
 * Payload enviado ao backend
 * ================================ */
export interface CreatePaymentPayload {
  amount: number;
  method: PaymentMethod;
  description?: string;

  // 👉 obrigatório apenas para PIX
  payer?: Payer;
}

/* ================================
 * Respostas do backend
 * ================================ */

// PIX
export interface PixPaymentResponse {
  type: "pix";
  qr_code: string;
  qr_code_base64: string;
}

// Cartão ou Boleto
export interface RedirectPaymentResponse {
  type: "card" | "boleto";
  init_point: string;
}

export type PaymentResponse =
  | PixPaymentResponse
  | RedirectPaymentResponse;

/* ================================
 * Configuração da API
 * ================================ */
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================================
 * Criar pagamento
 * ================================ */
export async function createPayment(
  payload: CreatePaymentPayload
): Promise<PaymentResponse> {
  const response = await fetch(
    `${API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    let errorMessage = "Erro ao criar pagamento";

    try {
      const error = await response.json();
      errorMessage = error?.error || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return response.json();
}
