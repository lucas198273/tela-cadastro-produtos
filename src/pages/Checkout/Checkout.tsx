import { useState } from "react";
import {
  createPayment,
  type PaymentMethod,
  type PaymentResponse,
} from "../../api/payments";

export default function Checkout() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);

  // 🔹 Dados do pagador (PIX)
  const [email, setEmail] = useState(""); // ⚡ Adicionado email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");

  const handlePayment = async () => {
    // 🔒 Validação do valor
    if (!amount || Number(amount) <= 0) {
      alert("Informe um valor válido");
      return;
    }

    // 🔒 Validação PIX
    if (method === "pix") {
      if (!email || !firstName || !lastName || !cpf) {
        alert("Preencha todos os campos do pagador para pagamento via Pix");
        return;
      }
    }

    setLoading(true);
    setQrCodeBase64(null);

    try {
      const data: PaymentResponse = await createPayment({
        amount: Number(amount),
        method,
        description: "Pagamento de teste",
        payer:
          method === "pix"
            ? {
                email,
                first_name: firstName,
                last_name: lastName,
                cpf,
              }
            : undefined,
      });

      // 🔳 PIX → exibe QR Code
      if (data.type === "pix") {
        setQrCodeBase64(data.qr_code_base64);
        return;
      }

      // 🔗 CARTÃO ou BOLETO → redireciona
      if (data.type === "card" || data.type === "boleto") {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pagamento</h1>

      {/* Valor */}
      <label className="block mb-2">Valor</label>
      <input
        type="number"
        min="1"
        placeholder="Ex: 58.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Método */}
      <label className="block mb-2">Forma de pagamento</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value as PaymentMethod)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="pix">Pix</option>
        <option value="card">Cartão de Crédito</option>
        <option value="boleto">Boleto</option>
      </select>

      {/* Campos exclusivos do PIX */}
      {method === "pix" && (
        <div className="space-y-3 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="CPF (somente números)"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {/* Botão */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processando..." : "Pagar"}
      </button>

      {/* QR Code PIX */}
      {qrCodeBase64 && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-semibold">Escaneie o QR Code para pagar</p>
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code Pix"
            className="mx-auto w-48 h-48"
          />
        </div>
      )}
    </div>
  );
}
