// src/pages/ProductList.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Tipagem mínima e realista do produto
interface Produto {
  id: string | number;
  nome: string;
  descricao: string;
  preco: number;
  preco_promocional?: number;
  estoque: number;
  sku?: string;
  categoria: string;
  ativo: boolean;
  imagens?: string[];          // urls das imagens após upload (ou placeholders)
  // peso_gramas?: number;     // pode adicionar mais campos se quiser mostrar
}

export default function ProductList() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro] = useState<string | null>(null);

  useEffect(() => {
    // Futuro: fetch('/api/produtos') .then(...)
    // Por enquanto: carrega do localStorage (persistência simples)

    const salvos = localStorage.getItem('produtos_cadastrados');
    let lista: Produto[] = [];

    if (salvos) {
      try {
        lista = JSON.parse(salvos);
      } catch (err) {
        console.error('Erro ao parsear produtos do localStorage', err);
      }
    }

    // Se não tiver nada, mostra alguns exemplos iniciais
    if (lista.length === 0) {
      lista = [
        {
          id: 'ex1',
          nome: 'Camiseta Oversized Preta',
          descricao: 'Algodão premium 180g, modelagem ampla, gola redonda',
          preco: 89.90,
          preco_promocional: 69.90,
          estoque: 84,
          sku: 'CAM-OVS-PTA-M',
          categoria: 'camisetas',
          ativo: true,
          imagens: ['https://via.placeholder.com/400x400/111/eee?text=Camiseta+Preta'],
        },
        {
          id: 'ex2',
          nome: 'Calça Jeans Slim Masculina',
          descricao: 'Elastano 2%, lavagem stone wash, corte moderno',
          preco: 159.90,
          estoque: 38,
          sku: 'CAL-SLM-AZ-40',
          categoria: 'calcas',
          ativo: false,
          imagens: ['https://via.placeholder.com/400x400/334/eee?text=Calca+Jeans'],
        },
      ];
    }

    setProdutos(lista);
    setCarregando(false);
  }, []);

  const formatarPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleExcluir = (id: string | number) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;

    const atualizados = produtos.filter(p => p.id !== id);
    setProdutos(atualizados);
    localStorage.setItem('produtos_cadastrados', JSON.stringify(atualizados));
  };

  if (carregando) {
    return (
      <div className="py-12 text-center text-gray-600">
        <p className="text-xl">Carregando produtos...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="py-12 text-center text-red-600">
        <p className="text-xl">{erro}</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Cabeçalho + botão novo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="mt-1 text-gray-600">
            {produtos.length} produto{produtos.length !== 1 ? 's' : ''} cadastrado{produtos.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Link
          to="/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Produto
        </Link>
      </div>

      {produtos.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center mx-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Nenhum produto cadastrado ainda
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Comece adicionando seus produtos para aparecerem na loja
          </p>
          <Link
            to="/products/new"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Cadastrar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {produtos.map(produto => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col"
            >
              {/* Imagem principal */}
              <div className="relative h-48 bg-gray-100">
                {produto.imagens && produto.imagens.length > 0 ? (
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Sem foto
                  </div>
                )}

                {!produto.ativo && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Inativo
                  </div>
                )}

                {produto.preco_promocional && produto.preco_promocional < produto.preco && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Promoção
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                  {produto.nome}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                  {produto.descricao || 'Sem descrição detalhada'}
                </p>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-1">
                    {produto.preco_promocional && produto.preco_promocional < produto.preco ? (
                      <>
                        <span className="text-2xl font-bold text-red-600">
                          {formatarPreco(produto.preco_promocional)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatarPreco(produto.preco)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {formatarPreco(produto.preco)}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Estoque: <span className="font-medium">{produto.estoque}</span>
                    {produto.sku && <span className="ml-3 text-gray-500">SKU: {produto.sku}</span>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/products/edit/${produto.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleExcluir(produto.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}