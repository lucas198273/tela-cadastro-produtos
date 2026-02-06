import { useState, useEffect } from 'react';
import { createPayment, type PaymentResponse } from '../../api/payments'; // ajuste o caminho

export default function Checkout() {
  const [amountStr, setAmountStr] = useState<string>(''); // exibe "570,00"
  const [planName, setPlanName] = useState<string>('Plano Selecionado');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedPlan');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const priceCents = Number(parsed.priceCents);

      console.log('[DEBUG Checkout] priceCents cru do localStorage:', priceCents);
      console.log('[DEBUG Checkout] tipo:', typeof priceCents);

      if (!Number.isInteger(priceCents) || priceCents <= 0) {
        console.warn('[Checkout] Valor inválido no localStorage:', priceCents);
        setAmountStr('0,00');
        return;
      }

      // Detecção de bug comum: valor muito alto sugere multiplicação extra por 100
      if (priceCents > 1_000_000) { // > R$ 10.000 → suspeito de erro
        console.warn('[ALERTA BUG VALOR] priceCents parece multiplicado errado:', priceCents);
        // Opcional: setError('Erro no valor do plano. Volte e selecione novamente.');
      }

      const valorReais = priceCents / 100;
      const formatted = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valorReais);

      console.log('[DEBUG Checkout] valorReais calculado:', valorReais);
      console.log('[DEBUG Checkout] formatted para tela:', formatted);

      setAmountStr(formatted);
      setPlanName(parsed.planName || 'Plano Selecionado');
      localStorage.removeItem('selectedPlan');
    } catch (err) {
      console.error('[Checkout] Erro parse localStorage:', err);
      setAmountStr('0,00');
    }
  }, []);

  const handlePayment = async () => {
    setError(null);

    // Limpeza robusta: remove tudo exceto dígitos e vírgula
    const clean = amountStr.replace(/[^\d,]/g, '');
    const normalized = clean.replace(',', '.');
    const valorReais = Number(normalized);

    console.log('[Pagamento] amountStr exibido:', amountStr);
    console.log('[Pagamento] clean/normalized:', clean, '→', normalized);
    console.log('[Pagamento] valorReais após parse:', valorReais);

    if (Number.isNaN(valorReais) || valorReais <= 0) {
      setError('Valor inválido. Volte e selecione o plano novamente.');
      return;
    }

    // Limite realista (ajuste após confirmar com InfinitePay)
    if (valorReais > 10000) {
      setError('Valor acima do limite atual permitido (R$ 10.000). Ajuste ou divida o pagamento.');
      return;
    }

    if (!fullName.trim()) {
      setError('Nome completo é obrigatório.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('E-mail inválido.');
      return;
    }

    setLoading(true);

    try {
      const amountInCents = Math.round(valorReais * 100);
      console.log('[Pagamento] amountInCents final enviado:', amountInCents);

      const response: PaymentResponse = await createPayment({
        amount: amountInCents,
        description: `Pagamento - ${planName}`,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        order_nsu: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      });

      console.log('[Pagamento] Link gerado:', response.link);
      window.location.href = response.link;
    } catch (err: any) {
      console.error('[Pagamento] Erro completo:', err);
      setError(
        err.message?.includes('limite') 
          ? 'Valor acima do limite da InfinitePay. Aumente no app ou tente valor menor.'
          : err.message || 'Erro ao iniciar pagamento. Tente novamente.'
      );
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
          disabled={loading || !fullName.trim() || !email.trim() || !amountStr || Number(amountStr.replace(/[^\d,]/g, '').replace(',', '.')) <= 0}
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