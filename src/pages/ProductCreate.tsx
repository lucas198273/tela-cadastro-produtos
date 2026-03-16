// src/pages/ProductCreate.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://ecomercce-ecomercce-app.q3o3kd.easypanel.host';

interface Cor {
  id: string;
  nome: string;
  codigo_hex: string;
}

interface Categoria {
  id: string;
  nome: string;
  tipo_tamanho: string;
}

export default function ProductCreate() {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dados da API
  const [cores, setCores] = useState<Cor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    slug: '',
    descricao: '',
    categoria_id: '',
    material: '',
    preco: '',
    preco_promocional: '',
    cores: [] as string[],
  });

  // 1️⃣ PRIMEIRO: Carregar cores e categorias
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Busca cores e categorias em paralelo
      const [coresResponse, categoriasResponse] = await Promise.all([
        fetch(`${API_URL}/api/v1/cores`),
        fetch(`${API_URL}/api/v1/categorias`)
      ]);

      if (!coresResponse.ok) throw new Error('Erro ao carregar cores');
      if (!categoriasResponse.ok) throw new Error('Erro ao carregar categorias');

      const coresData = await coresResponse.json();
      const categoriasData = await categoriasResponse.json();

      console.log('✅ Cores carregadas:', coresData);
      console.log('✅ Categorias carregadas:', categoriasData);

      setCores(coresData);
      setCategorias(categoriasData);
      
    } catch (err: any) {
      console.error('❌ Erro:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gerar slug automaticamente
  useEffect(() => {
    if (formData.nome && !formData.slug) {
      const slug = formData.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.nome]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCorChange = (corId: string) => {
    setFormData(prev => ({
      ...prev,
      cores: prev.cores.includes(corId)
        ? prev.cores.filter(id => id !== corId)
        : [...prev.cores, corId]
    }));
  };

  // 2️⃣ DEPOIS: Enviar o cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      // Validações básicas
      if (!formData.nome) throw new Error('Nome é obrigatório');
      if (!formData.categoria_id) throw new Error('Categoria é obrigatória');
      if (!formData.cores.length) throw new Error('Selecione pelo menos uma cor');

      const payload = {
        nome: formData.nome,
        slug: formData.slug || undefined,
        descricao: formData.descricao,
        categoria_id: formData.categoria_id,
        material: formData.material,
        preco: parseFloat(formData.preco) || 0,
        preco_promocional: formData.preco_promocional ? parseFloat(formData.preco_promocional) : undefined,
        cores: formData.cores,
      };

      console.log('🚀 Enviando payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(`${API_URL}/api/v1/produtos/incluirNovo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const resultado = await response.json();
      console.log('✅ Resposta:', resultado);
      
      alert('Produto cadastrado com sucesso!');
      navigate('/products');

    } catch (err: any) {
      console.error('❌ Erro:', err);
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cadastrar Produto</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 space-y-6">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do produto *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Camiseta POLOMAX"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Camiseta esportiva confortável..."
            />
          </div>

          {/* Categoria - AGORA VEM DA API */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Selecione...</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material *
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="algodao"
            />
          </div>

          {/* Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço normal *
              </label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="99.90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço promocional
              </label>
              <input
                type="number"
                name="preco_promocional"
                value={formData.preco_promocional}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="79.90"
              />
            </div>
          </div>

          {/* Cores - AGORA VEM DA API */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cores disponíveis *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cores.map(cor => (
                <label key={cor.id} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.cores.includes(cor.id)}
                    onChange={() => handleCorChange(cor.id)}
                    className="h-4 w-4 text-indigo-600 rounded"
                  />
                  <span 
                    className="w-4 h-4 rounded-full border" 
                    style={{ backgroundColor: cor.codigo_hex }}
                  />
                  <span className="text-sm">{cor.nome}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {enviando ? 'Salvando...' : 'Cadastrar Produto'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}