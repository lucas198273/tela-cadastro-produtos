// src/api/Produtos.ts
const API_URL = import.meta.env.VITE_API_URL || 'https://ecomercce-ecomercce-app.q3o3kd.easypanel.host';

// ===========================================
// TIPOS
// ===========================================
export interface Cor {
  id: string;
  nome: string;
  codigo_hex: string;
}

export interface Categoria {
  id: string;
  nome: string;
  tipo_tamanho: 'unico' | 'calcado' | 'calcado_infantil' | 'vestuario' | 'vestuario_infantil';
}

export interface ProdutoPayload {
  nome: string;
  slug?: string;
  descricao: string;
  categoria_id: string;
  material: string;
  preco: number;
  preco_promocional?: number;
  cores: string[];
  imagens?: string[];
}

export interface Produto {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  categoria_id: string;
  material: string;
  preco: number;
  preco_promocional?: number;
  cores: string[];
  imagens?: string[];
}

// ===========================================
// FUNÇÕES DE CONSULTA (GET)
// ===========================================

// SEM PARÂMETROS - como a API espera

export async function consultarProdutos(): Promise<Produto[]> {
  const response = await fetch(`${API_URL}/api/v1/produtos/consultar`, {
    method: 'GET',
    mode: 'cors', // Explicitamente define CORS
    headers: {
      'Content-Type': 'application/json',
      // Alguns servidores precisam disso
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao consultar produtos: ${response.status}`);
  }

  return response.json();
}
// Se precisar de filtros, crie uma função separada
export async function consultarProdutosComFiltros(params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoria?: string;
}): Promise<Produto[]> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.categoria) queryParams.append('categoria', params.categoria);

  const url = `${API_URL}/api/v1/produtos/consultar${queryParams.toString() ? `?${queryParams}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erro ao consultar produtos: ${response.status}`);
  }

  return response.json();
}

export async function listarCores(): Promise<Cor[]> {
  const response = await fetch(`${API_URL}/api/v1/cores`);
  
  if (!response.ok) {
    throw new Error(`Erro ao carregar cores: ${response.status}`);
  }

  return response.json();
}

export async function listarCategorias(): Promise<Categoria[]> {
  const response = await fetch(`${API_URL}/api/v1/categorias`);
  
  if (!response.ok) {
    throw new Error(`Erro ao carregar categorias: ${response.status}`);
  }

  return response.json();
}

// ===========================================
// INCLUSÃO DE PRODUTO (POST)
// ===========================================

export async function incluirProduto(payload: ProdutoPayload): Promise<any> {
  const token = localStorage.getItem('adminToken');
  
  console.log('📦 Enviando payload:', JSON.stringify(payload, null, 2));
  
  const response = await fetch(`${API_URL}/api/v1/produtos/incluirNovo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText || response.statusText}`);
  }

  return response.json().catch(() => ({ success: true }));
}