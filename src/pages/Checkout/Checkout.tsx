// Checkout.tsx
import { useState } from "react";
import { createPayment,  type PaymentResponse } from "../../api/payments"; // ajuste o path se necessário

export default function Checkout() {
  const [amount, setAmount] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setError(null);

    const valor = Number(amount);
    if (!amount || isNaN(valor) || valor <= 0) {
      setError("Informe um valor válido maior que zero.");
      return;
    }

    if (!firstName.trim() || !email.trim()) {
      setError("Preencha nome e e-mail para agilizar o checkout.");
      return;
    }

    setLoading(true);

    try {
      const data: PaymentResponse = await createPayment({
        amount: valor,
        method: "any", // InfinitePay unifica PIX + cartão
        description: "Pagamento via InfinitePay",
        payer: {
          first_name: firstName.trim(),
          last_name: lastName.trim() || undefined,
          email: email.trim(),
        },
        order_nsu: `checkout-${Date.now()}`, // Gere do seu sistema real (ex: ID do pedido)
      });

      // Redireciona para o checkout da InfinitePay
      window.location.href = data.link;
    } catch (err: any) {
      console.error("Erro no pagamento InfinitePay:", err);
      setError(err.message || "Erro ao iniciar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Pagamento com InfinitePay</h1>

      {/* Valor */}
      <label className="block mb-2 font-medium">Valor (R$)</label>
      <input
        type="number"
        step="0.01"
        min="1"
        placeholder="Ex: 58.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={loading}
      />

      {/* Nome e Sobrenome */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Sobrenome</label>
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          />
        </div>
      </div>

      {/* E-mail */}
      <label className="block mb-2 font-medium">E-mail</label>
      <input
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={loading}
      />

      {/* Info sobre o fluxo */}
      <p className="text-sm text-gray-600 mb-6">
        Você será redirecionado para o checkout seguro da InfinitePay. Escolha PIX (instantâneo) ou cartão de crédito (parcelado em até 12x). Recebimento antecipado na hora ou em 1 dia útil.
      </p>

      {/* Erro */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Botão */}
      <button
        onClick={handlePayment}
        disabled={loading || !amount || !firstName.trim() || !email.trim()}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
            Processando...
          </span>
        ) : (
          "Pagar Agora"
        )}
      </button>

      {/* Segurança */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        Pagamento processado de forma segura pela InfinitePay. Alta taxa de aprovação e proteção antifraude. Seus dados nunca passam pelo nosso servidor.
      </p>
    </div>
  );
}