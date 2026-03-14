// src/pages/ProductEdit.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    material: '',
    preco: '',
    preco_promocional: '',
    cores: [] as string[],
    tamanhos: [] as string[],
    ativo: true,
    estoque: '',
  });

  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const CATEGORIAS = [
    'Camisetas', 'Calças e Bermudas', 'Moletom', 'Jaquetas', 
    'Acessórios', 'Calçados', 'Eletrônicos', 'Outros', 'Infantil'
  ];

  const CORES = ['preto', 'branco', 'cinza', 'azul', 'vermelho', 'verde', 'amarelo'];
  
  const TAMANHOS = ['4 anos', '6 anos', '8 anos', '10 anos', '12 anos', '14 anos', 'P', 'M', 'G', 'GG'];

  useEffect(() => {
    // Carregar produto do localStorage
    const salvos = localStorage.getItem('produtos_cadastrados');
    if (salvos) {
      const lista = JSON.parse(salvos);
      const produto = lista.find((p: any) => p.id === id);
      
      if (produto) {
        setFormData({
          nome: produto.nome || '',
          descricao: produto.descricao || '',
          categoria: produto.categoria || '',
          material: produto.material || '',
          preco: produto.preco?.toString() || '',
          preco_promocional: produto.preco_promocional?.toString() || '',
          cores: produto.cores || [],
          tamanhos: produto.tamanhos || [],
          ativo: produto.ativo !== undefined ? produto.ativo : true,
          estoque: produto.estoque?.toString() || '',
        });
      }
    }
    setCarregando(false);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'cores' | 'tamanhos', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const salvos = localStorage.getItem('produtos_cadastrados');
      let lista = salvos ? JSON.parse(salvos) : [];
      
      const index = lista.findIndex((p: any) => p.id === id);
      
      if (index >= 0) {
        lista[index] = {
          id,
          ...formData,
          preco: parseFloat(formData.preco) || 0,
          preco_promocional: formData.preco_promocional ? parseFloat(formData.preco_promocional) : undefined,
          estoque: parseInt(formData.estoque) || 0,
        };
        
        localStorage.setItem('produtos_cadastrados', JSON.stringify(lista));
        alert('Produto atualizado com sucesso!');
        navigate('/products');
      }
    } catch (error) {
      alert('Erro ao atualizar produto');
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Produto #{id}</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden p-8">
          <div className="space-y-6">
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
              />
            </div>

            {/* Categoria + Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Selecione...</option>
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

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
                  placeholder="Ex: Algodão"
                />
              </div>
            </div>

            {/* Preços + Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque *
                </label>
                <input
                  type="number"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Cores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cores disponíveis *
              </label>
              <div className="flex flex-wrap gap-4">
                {CORES.map(cor => (
                  <label key={cor} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.cores.includes(cor)}
                      onChange={() => handleCheckboxChange('cores', cor)}
                      className="h-5 w-5 text-indigo-600 rounded"
                    />
                    <span className="text-sm capitalize">{cor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamanhos disponíveis *
              </label>
              <div className="flex flex-wrap gap-4">
                {TAMANHOS.map(tam => (
                  <label key={tam} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.tamanhos.includes(tam)}
                      onChange={() => handleCheckboxChange('tamanhos', tam)}
                      className="h-5 w-5 text-indigo-600 rounded"
                    />
                    <span className="text-sm">{tam}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ativo */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.ativo}
                onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
                className="h-5 w-5 text-indigo-600 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Produto ativo
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {enviando ? 'Salvando...' : 'Salvar Alterações'}
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