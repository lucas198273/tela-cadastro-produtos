// src/hooks/useProdutosApi.ts
import { useState, useEffect } from 'react';
import { 
  consultarProdutos, 
  listarCores, 
  listarCategorias, 
  incluirProduto,
  type Produto,
  type Cor,
  type Categoria,
  type ProdutoPayload
} from '../api/Produtos';

export function useProdutosApi() {
  const [cores, setCores] = useState<Cor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    try {
      setLoading(true);
      const [coresData, categoriasData, produtosData] = await Promise.all([
        listarCores(),
        listarCategorias(),
        consultarProdutos()
      ]);
      
      console.log('✅ Cores carregadas:', coresData);
      console.log('✅ Categorias carregadas:', categoriasData);
      console.log('✅ Produtos carregados:', produtosData);
      
      setCores(coresData);
      setCategorias(categoriasData);
      setProdutos(produtosData);
      
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const carregarProdutos = async () => {
    try {
      const data = await consultarProdutos();
      setProdutos(data);
      return data;
    } catch (err: any) {
      console.error('❌ Erro ao carregar produtos:', err);
      throw err;
    }
  };

  const salvarProduto = async (payload: ProdutoPayload) => {
    try {
      const resultado = await incluirProduto(payload);
      await carregarProdutos();
      return { sucesso: true, dados: resultado };
    } catch (err: any) {
      return { sucesso: false, erro: err.message };
    }
  };

  return {
    cores,
    categorias,
    produtos,
    loading,
    error,
    salvarProduto,
    carregarProdutos,
    recarregar: carregarDadosIniciais
  };
}