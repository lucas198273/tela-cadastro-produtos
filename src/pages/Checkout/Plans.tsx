
import { useNavigate } from 'react-router-dom'; // ou useHistory se for v5

export default function Plans() {
  const navigate = useNavigate();


  const plans = [
    {
      id: 1,
      name: 'Plano Básico',
      price: 2.00,          // em reais
      priceCents: 200,      // em centavos (para envio)
      description: 'Ideal para iniciantes',
      features: [
        'Integração simples com InfinitePay',
        'Checkout PIX + Cartão até 12x',
        'Suporte por e-mail',
        'Até 100 transações/mês',
      ],
    },
    {
      id: 2,
      name: 'Plano Pro',
      price: 597.00,
      priceCents: 59700,
      description: 'Mais completo e personalizado',
      features: [
        'Tudo do Básico',
        'Customização (cores, logo, texto)',
        'Webhook para automações',
        'Suporte prioritário (WhatsApp)',
        'Até 500 transações/mês',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Plano Enterprise',
      price: 997.00,
      priceCents: 99700,
      description: 'Para negócios que crescem rápido',
      features: [
        'Tudo do Pro',
        'Suporte dedicado 3 meses',
        'Treinamento + configuração completa',
        'Transações ilimitadas',
        'Prioridade em novas features',
      ],
    },
  ];

  const handleSelectPlan = (priceCents: number, planName: string) => {
    // Você pode salvar no localStorage/context se quiser persistir
    localStorage.setItem('selectedPlan', JSON.stringify({ priceCents, planName }));
    navigate('/checkout'); // ou '/pagamento'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Escolha seu Plano de Integração
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Receba via PIX na hora e cartão em até 12x com InfinitePay
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                plan.popular ? 'border-green-500 scale-105' : 'border-gray-200'
              } transition-transform`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  Mais Popular
                </div>
              )}

              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-5xl font-extrabold text-gray-900">
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                  <span className="text-xl font-normal text-gray-500"> único</span>
                </p>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.priceCents, plan.name)}
                  className={`mt-8 w-full py-4 px-6 rounded-xl font-bold text-lg transition ${
                    plan.popular
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                >
                  Selecionar {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p>Pagamento processado de forma 100% segura pela InfinitePay.</p>
          <p className="mt-2">PIX instantâneo • Cartão em até 12x • Sem complicação.</p>
        </div>
      </div>
    </div>
  );
}