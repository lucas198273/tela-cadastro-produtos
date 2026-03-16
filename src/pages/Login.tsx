// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

// Email e senha de teste
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

    setTimeout(() => {
      const emailLower = email.trim().toLowerCase();
      const demoLower = TEST_EMAIL.toLowerCase();

      if (emailLower === demoLower && password === TEST_PASSWORD) {
        onLogin();
        navigate("/products", { replace: true });
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        {/* Logo / Título */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
            GP
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestão de Produtos
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
            Entre com suas credenciais para acessar o painel
          </p>
        </div>

        {/* Aviso de teste - MOBILE FRIENDLY */}
        <div className="text-center text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 py-3 px-4 rounded-lg mx-2 sm:mx-0 break-words">
          <span className="block sm:inline">Modo teste: </span>
          <strong className="break-all">{TEST_EMAIL}</strong>
          <span className="mx-1">/</span>
          <strong>{TEST_PASSWORD}</strong>
        </div>

        {/* Card do formulário */}
        <div className="bg-white dark:bg-gray-800 shadow-xl sm:shadow-2xl rounded-xl sm:rounded-2xl p-6 sm:p-8 mx-2 sm:mx-0 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-3 sm:p-4 rounded text-xs sm:text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Botão de login */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                    <span>Entrando...</span>
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>

          {/* Links adicionais */}
          <div className="mt-5 sm:mt-6 text-center">
            <a
              href="#"
              className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-4">
          Ainda não tem conta?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition underline-offset-2 hover:underline"
          >
            Fale com o administrador
          </a>
        </p>
      </div>
    </div>
  );
}