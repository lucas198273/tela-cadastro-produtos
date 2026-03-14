// src/services/produtos.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

// ===========================================
// TIPOS
// ===========================================
export interface ProdutoPayload {
  nome: string;
  slug?: string;
  descricao: string;
  categoria_id: string;
  material?: string;
  preco: number;
  preco_promocional?: number;
  cores?: string[];
  tamanhos?: string[];
  imagens?: string[];
  ativo?: boolean;
  estoque?: number;
}

export interface ProdutoResponse {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  categoria_id: string;
  categoria_nome?: string;
  material: string;
  preco: number;
  preco_promocional?: number;
  cores: string[];
  tamanhos: string[];
  imagens: string[];
  ativo: boolean;
  estoque: number;
  created_at?: string;
  updated_at?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// ===========================================
// FUNÇÕES AUXILIARES
// ===========================================
const getHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Erro ${response.status}: ${response.statusText}`;
    let errorData: ApiError = { message: errorMessage, status: response.status };

    try {
      const data = await response.json();
      errorData = {
        message: data.message || data.error || errorMessage,
        status: response.status,
        errors: data.errors,
      };
    } catch {
      // corpo não é JSON
    }

    throw errorData;
  }

  return await response.json() as T;
};

// ===========================================
// CRUD COMPLETO
// ===========================================

/**
 * LISTAR todos os produtos
 * GET /api/produtos
 */
export async function listarProdutos(params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoria?: string;
  ativo?: boolean;
}): Promise<{ data: ProdutoResponse[]; total: number; page: number }> {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.categoria) queryParams.append('categoria', params.categoria);
  if (params?.ativo !== undefined) queryParams.append('ativo', params.ativo.toString());

  const url = `${API_URL}/api/produtos${queryParams.toString() ? `?${queryParams}` : ''}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse<{ data: ProdutoResponse[]; total: number; page: number }>(response);
}

/**
 * BUSCAR um produto por ID
 * GET /api/produtos/:id
 */
export async function buscarProduto(id: string): Promise<ProdutoResponse> {
  if (!id) throw new Error('ID do produto é obrigatório');

  const response = await fetch(`${API_URL}/api/produtos/${id}`, {
    method: 'GET',
    headers: getHeaders(true),
  });

  return handleResponse<ProdutoResponse>(response);
}

/**
 * CRIAR novo produto
 * POST /api/produtos
 */
export async function criarProduto(payload: ProdutoPayload): Promise<ProdutoResponse> {
  // Validações básicas
  if (!payload.nome?.trim()) throw new Error('Nome é obrigatório');
  if (!payload.descricao?.trim()) throw new Error('Descrição é obrigatória');
  if (!payload.categoria_id) throw new Error('Categoria é obrigatória');
  if (payload.preco <= 0) throw new Error('Preço deve ser maior que zero');
  if (payload.estoque !== undefined && payload.estoque < 0) throw new Error('Estoque não pode ser negativo');

  const response = await fetch(`${API_URL}/api/produtos`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<ProdutoResponse>(response);
}

/**
 * ATUALIZAR produto existente
 * PUT /api/produtos/:id
 */
export async function atualizarProduto(id: string, payload: Partial<ProdutoPayload>): Promise<ProdutoResponse> {
  if (!id) throw new Error('ID do produto é obrigatório');

  const response = await fetch(`${API_URL}/api/produtos/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  });

  return handleResponse<ProdutoResponse>(response);
}

/**
 * DELETAR produto
 * DELETE /api/produtos/:id
 */
export async function deletarProduto(id: string): Promise<{ message: string }> {
  if (!id) throw new Error('ID do produto é obrigatório');

  const response = await fetch(`${API_URL}/api/produtos/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });

  return handleResponse<{ message: string }>(response);
}

/**
 * ATIVAR/DESATIVAR produto
 * PATCH /api/produtos/:id/status
 */
export async function alterarStatusProduto(id: string, ativo: boolean): Promise<ProdutoResponse> {
  if (!id) throw new Error('ID do produto é obrigatório');

  const response = await fetch(`${API_URL}/api/produtos/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify({ ativo }),
  });

  return handleResponse<ProdutoResponse>(response);
}

/**
 * UPLOAD de imagens (multipart/form-data)
 * POST /api/produtos/:id/imagens
 */
export async function uploadImagens(id: string, imagens: File[]): Promise<{ imagens: string[] }> {
  if (!id) throw new Error('ID do produto é obrigatório');
  if (!imagens.length) throw new Error('Selecione pelo menos uma imagem');

  const formData = new FormData();
  imagens.forEach(file => formData.append('imagens', file));

  const response = await fetch(`${API_URL}/api/produtos/${id}/imagens`, {
    method: 'POST',
    headers: {
      // Não incluir Content-Type, o browser vai setar com boundary automaticamente
      'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`,
    },
    body: formData,
  });

  return handleResponse<{ imagens: string[] }>(response);
}

/**
 * DELETAR imagem específica
 * DELETE /api/produtos/:id/imagens/:imagemId
 */
export async function deletarImagem(produtoId: string, imagemId: string): Promise<{ message: string }> {
  if (!produtoId) throw new Error('ID do produto é obrigatório');
  if (!imagemId) throw new Error('ID da imagem é obrigatório');

  const response = await fetch(`${API_URL}/api/produtos/${produtoId}/imagens/${imagemId}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });

  return handleResponse<{ message: string }>(response);
}