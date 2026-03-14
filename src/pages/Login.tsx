// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

// Email e senha de teste - PODE MUDAR AQUI SE QUISER
const TEST_EMAIL = "admin@teste.com";
const TEST_PASSWORD = "123456";

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // SIMULA REQUISIÇÃO (igual ao seu layout original)
    setTimeout(() => {
      const emailLower = email.trim().toLowerCase();
      const demoLower = TEST_EMAIL.toLowerCase();

      // TESTE SIMPLES: email = admin@teste.com, senha = 123456
      if (emailLower === demoLower && password === TEST_PASSWORD) {
        onLogin(); // CHAMA O LOGIN DO APP
        navigate("/products", { replace: true }); // REDIRECIONA
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }

      setLoading(false);
    }, 800); // tempo curto pra simular requisição
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="w-full max-w-md space-y-8">
        {/* Logo / Título */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            GP
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestão de Produtos
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Entre com suas credenciais para acessar o painel
          </p>
        </div>

        {/* Aviso de teste - AGORA MOSTRA O EMAIL CERTO */}
        <div className="text-center text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 py-2 px-4 rounded-lg">
          Modo teste: use <strong>{TEST_EMAIL}</strong> / <strong>{TEST_PASSWORD}</strong>
        </div>

        {/* Card do formulário */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Botão de login */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Ainda não tem conta?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Fale com o administrador
          </a>
        </p>
      </div>
    </div>
  );
}