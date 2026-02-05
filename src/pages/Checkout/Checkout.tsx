// src/pages/Checkout.tsx
import { useState, useEffect } from 'react';
import { createPayment, type PaymentResponse } from '../../api/payments'; // ajuste o caminho se necessário

export default function Checkout() {
  const [amountStr, setAmountStr] = useState<string>(''); // exibe como "597,00"
  const [planName, setPlanName] = useState<string>('Plano Selecionado');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedPlan');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const priceCents = Number(parsed.priceCents);

        console.log('[DEBUG Checkout] Valor cru do localStorage (priceCents):', priceCents);
        console.log('[DEBUG Checkout] Tipo do priceCents:', typeof priceCents);

        if (isNaN(priceCents) || priceCents <= 0) {
          console.warn('Valor inválido no localStorage:', priceCents);
          setAmountStr('0,00');
          return;
        }

        // Converte centavos para reais e formata BR
        const valorReais = priceCents / 100;
        const formatted = valorReais
          .toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(/\u00A0/g, ' '); // corrige espaço não-quebrável que o toLocaleString pode gerar

        console.log('[DEBUG Checkout] Valor em reais calculado:', valorReais);
        console.log('[DEBUG Checkout] Valor formatado para exibição:', formatted);

        setAmountStr(formatted);
        setPlanName(parsed.planName || 'Plano Selecionado');
        localStorage.removeItem('selectedPlan');
      } catch (err) {
        console.error('Erro ao parsear selectedPlan do localStorage:', err);
        setAmountStr('0,00');
      }
    }
  }, []);

  const handlePayment = async () => {
    setError(null);

    // Remove pontos de milhar e troca vírgula por ponto
    const cleanAmount = amountStr.replace(/\./g, '').replace(',', '.');
    const valorReais = Number(cleanAmount);

    console.log('[DEBUG Pagamento] amountStr exibido:', amountStr);
    console.log('[DEBUG Pagamento] valorReais após limpeza:', valorReais);

    if (isNaN(valorReais) || valorReais <= 0 || valorReais > 100000) {
      setError('Valor inválido ou acima do limite permitido.');
      return;
    }

    if (!fullName.trim()) {
      setError('Nome completo é obrigatório.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('E-mail inválido.');
      return;
    }

    setLoading(true);

    try {
      // Única conversão: reais → centavos
      const amountInCents = Math.round(valorReais * 100);
      console.log('[DEBUG Pagamento] amountInCents enviado para createPayment:', amountInCents);

      const response: PaymentResponse = await createPayment({
        amount: amountInCents,
        description: `Pagamento - ${planName}`,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        order_nsu: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      });

      console.log('[DEBUG Pagamento] Link recebido da API:', response.link);

      window.location.href = response.link;
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err);
      setError(err.message || 'Erro ao iniciar o pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>

      <div className="mb-8 p-6 bg-gray-50 rounded-xl text-center">
        <h2 className="text-xl font-semibold mb-2">{planName}</h2>
        <p className="text-4xl font-bold text-green-600">
          {amountStr ? `R$ ${amountStr}` : 'R$ 0,00'}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="Ex: Lucas Pereira"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 outline-none"
            placeholder="seuemail@exemplo.com"
            disabled={loading}
          />
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Você será redirecionado para o checkout seguro da InfinitePay.<br />
          Aceitamos PIX instantâneo ou cartão em até 12x.<br />
          Recebimento na hora ou em 1 dia útil.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading || !fullName.trim() || !email.trim() || !amountStr}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition
            ${loading || !fullName.trim() || !email.trim() || !amountStr
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
            }
          `}
        >
          {loading ? 'Processando...' : 'Pagar Agora'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Pagamento processado com segurança pela InfinitePay.<br />
          Seus dados são criptografados e protegidos.
        </p>
      </div>
    </div>
  );
}