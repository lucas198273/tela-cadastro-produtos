// src/pages/ProductCreate.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Schema Zod alinhado ao seu JSON desejado
const produtoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'Slug é obrigatório').optional(),
  descricao: z.string().min(10, 'Descrição muito curta').max(500),
  categoria_id: z.string().min(1, 'Selecione uma categoria'),
  material: z.string().min(3, 'Material é obrigatório'),
  preco: z.number().positive('Preço deve ser maior que zero'),
  preco_promocional: z.number().positive().optional(),
  cores: z.array(z.string()).min(1, 'Selecione pelo menos uma cor'),
  tamanhos: z.array(z.string()).min(1, 'Selecione pelo menos um tamanho/idade'),
});

type ProdutoForm = z.infer<typeof produtoSchema>;

// Categorias predefinidas (substitua IDs pelos reais do seu banco)
const CATEGORIAS_PREDEFINIDAS = [
  { id: '4ea2cb14-cade-4055-8483-c9991261749e', nome: 'Camisetas' },
  { id: '5fb3dc22-e1f7-4a9b-9c1d-8f6e2a3b4c5d', nome: 'Calças e Bermudas' },
  { id: '6ac4ed33-f2g8-5b0c-ad2e-9f7f3b4c5d6e', nome: 'Moletom' },
  { id: '7bd5fe44-g3h9-6c1d-be3f-0g8g4c5d6e7f', nome: 'Jaquetas' },
  { id: '8ce6gf55-h4i0-7d2e-cf4g-1h9h5d6e7f8g', nome: 'Acessórios' },
  { id: '9df7hg66-i5j1-8e3f-dg5h-2i0i6e7f8g9h', nome: 'Calçados' },
  { id: 'aeg8ih77-j6k2-9f4g-eh6i-3j1j7f8g9h0i', nome: 'Eletrônicos' },
  { id: 'bfh9ji88-k7l3-0g5h-fi7j-4k2k8g9h0i1j', nome: 'Outros' },
  { id: 'cgi0kj99-l8m4-1h6i-gj8k-5l3l9h0i1j2k', nome: 'Infantil' }, // categoria infantil específica
];

const CORES_DISPONIVEIS = ['preto', 'branco', 'cinza', 'azul', 'vermelho', 'verde', 'amarelo'];

const TAMANHOS_INFANTIS = [
  '4 anos',
  '6 anos',
  '8 anos',
  '10 anos',
  '12 anos',
  '14 anos',
  'P',
  'M',
  'G',
  'GG',
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

export default function ProductCreate() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);
  const [imagens, setImagens] = useState<File[]>([]);
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ProdutoForm>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: '',
      slug: '',
      descricao: '',
      categoria_id: '',
      material: '',
      preco: 0,
      preco_promocional: undefined,
      cores: [],
      tamanhos: [],
    },
  });

  // Gera slug automaticamente
  const nome = watch('nome');
  if (nome && !watch('slug')) {
    const slugGerado = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setValue('slug', slugGerado);
  }

  const onImagensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const arquivos = Array.from(e.target.files);
    const novos = arquivos.slice(0, 8 - imagens.length);
    if (novos.length === 0) return;

    const novasPreviews = novos.map(file => URL.createObjectURL(file));
    setImagens(prev => [...prev, ...novos]);
    setPreviews(prev => [...prev, ...novasPreviews]);
  };

  const removerImagem = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImagens(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProdutoForm) => {
    setEnviando(true);

    try {
      const formData = new FormData();

      formData.append('nome', data.nome);
      if (data.slug) formData.append('slug', data.slug);
      formData.append('descricao', data.descricao);
      formData.append('categoria_id', data.categoria_id);
      formData.append('material', data.material);
      formData.append('preco', data.preco.toString());
      if (data.preco_promocional) formData.append('preco_promocional', data.preco_promocional.toString());
      formData.append('cores', JSON.stringify(data.cores));
      formData.append('tamanhos', JSON.stringify(data.tamanhos));

      imagens.forEach(file => formData.append('imagens', file));

      const response = await fetch(`${API_URL}/api/produtos`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Erro ao cadastrar produto');
      }

      alert('Produto cadastrado com sucesso!');
      reset();
      setImagens([]);
      setPreviews([]);
      navigate('/');

    } catch (err: any) {
      alert(err.message || 'Falha ao salvar o produto. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cadastrar Produto</h1>
          <p className="mt-2 text-gray-600">Preencha os dados abaixo com atenção</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 space-y-8">

            {/* Nome + Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nome do produto <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('nome')}
                  className={`w-full px-4 py-3 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none`}
                  placeholder="Ex: Camiseta Nike Infantil"
                />
                {errors.nome && <p className="mt-1.5 text-sm text-red-600">{errors.nome.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (gerado automaticamente)</label>
                <input
                  {...register('slug')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 outline-none bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descrição <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register('descricao')}
                rows={4}
                className={`w-full px-4 py-3 border ${errors.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 outline-none resize-y`}
                placeholder="Camiseta esportiva confortável para crianças..."
              />
              {errors.descricao && <p className="mt-1.5 text-sm text-red-600">{errors.descricao.message}</p>}
            </div>

            {/* Categoria (select predefinido) + Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Categoria <span className="text-red-600">*</span>
                </label>
                <select
                  {...register('categoria_id')}
                  className={`w-full px-4 py-3 border ${errors.categoria_id ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white`}
                >
                  <option value="">Selecione uma categoria...</option>
                  {CATEGORIAS_PREDEFINIDAS.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
                {errors.categoria_id && <p className="mt-1.5 text-sm text-red-600">{errors.categoria_id.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Material <span className="text-red-600">*</span>
                </label>
                <input
                  {...register('material')}
                  className={`w-full px-4 py-3 border ${errors.material ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 outline-none`}
                  placeholder="algodao"
                />
                {errors.material && <p className="mt-1.5 text-sm text-red-600">{errors.material.message}</p>}
              </div>
            </div>

            {/* Preços */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Preço normal <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <input
                    {...register('preco', { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="0.01"
                    className={`w-full pl-10 py-3 border ${errors.preco ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 outline-none`}
                    placeholder="99.90"
                  />
                </div>
                {errors.preco && <p className="mt-1.5 text-sm text-red-600">{errors.preco.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço promocional</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <input
                    {...register('preco_promocional', { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 outline-none"
                    placeholder="79.90"
                  />
                </div>
              </div>
            </div>

            {/* Cores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Cores disponíveis <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {CORES_DISPONIVEIS.map(cor => (
                  <label key={cor} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={cor}
                      {...register('cores')}
                      className="h-5 w-5 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="text-sm capitalize">{cor}</span>
                  </label>
                ))}
              </div>
              {errors.cores && <p className="mt-1.5 text-sm text-red-600">{errors.cores.message}</p>}
            </div>

            {/* Tamanhos / Idades */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tamanhos / Idades disponíveis <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {TAMANHOS_INFANTIS.map(tam => (
                  <label key={tam} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={tam}
                      {...register('tamanhos')}
                      className="h-5 w-5 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="text-sm">{tam}</span>
                  </label>
                ))}
              </div>
              {errors.tamanhos && <p className="mt-1.5 text-sm text-red-600">{errors.tamanhos.message}</p>}
            </div>

            {/* Upload de imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotos do produto (máx. 8)
              </label>

              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition cursor-pointer bg-gray-50">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">Clique ou arraste as imagens aqui</span>
                <input type="file" multiple accept="image/*" onChange={onImagensChange} className="hidden" />
              </label>

              {previews.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img src={src} alt={`preview ${idx + 1}`} className="w-full h-32 object-cover" />
                      <button
                        type="button"
                        onClick={() => removerImagem(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold shadow opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition"
              disabled={enviando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={enviando}
              className={`min-w-[180px] py-3 px-8 rounded-xl font-medium text-white transition flex items-center justify-center gap-2 shadow-md
                ${enviando ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {enviando ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Salvando...
                </>
              ) : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}