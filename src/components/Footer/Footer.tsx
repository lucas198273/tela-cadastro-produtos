// src/components/Footer/Footer.tsx
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-16 px-6 border-t border-indigo-900/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* SOBRE O SISTEMA / MARCA */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-2xl font-bold text-indigo-400" translate="no">
            Gestão de Produtos
          </h3>

          <p className="text-sm leading-relaxed opacity-90">
            Plataforma simples e eficiente para cadastro, gerenciamento e 
            atualização do seu catálogo de produtos. Feito para lojistas que 
            querem controle total do estoque e das informações.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="https://instagram.com/sualoja" // ← ajuste para o real
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-indigo-700/30 text-indigo-300 hover:bg-indigo-700/50 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://wa.me/5531999999999" // ← ajuste o número real
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-indigo-700/30 text-indigo-300 hover:bg-indigo-700/50 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* LINKS ÚTEIS */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-xl font-semibold text-indigo-400">
            Links Úteis
          </h3>

          <a
            href="/"
            className="text-gray-300 hover:text-indigo-400 transition text-sm flex items-center gap-2"
          >
            <FaGlobe size={16} />
            Ver loja pública
          </a>

          <a
            href="/politica-privacidade"
            className="text-gray-300 hover:text-indigo-400 transition text-sm flex items-center gap-2"
          >
            <FaShieldAlt size={16} />
            Política de Privacidade
          </a>

          <a
            href="/termos-uso"
            className="text-gray-300 hover:text-indigo-400 transition text-sm flex items-center gap-2"
          >
            Termos de Uso
          </a>

          <a
            href="/suporte"
            className="text-gray-300 hover:text-indigo-400 transition text-sm flex items-center gap-2"
          >
            Suporte Técnico
          </a>
        </div>

        {/* CONTATO / SUPORTE */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-xl font-semibold text-indigo-400">
            Suporte
          </h3>

          <div className="flex items-center gap-3 text-sm justify-center md:justify-start">
            <FaEnvelope className="text-indigo-400" />
            <span>suporte@sualoja.com.br</span> {/* ← ajuste o email real */}
          </div>

          <div className="flex items-center gap-3 text-sm justify-center md:justify-start">
            <FaWhatsapp className="text-indigo-400" />
            <span>(31) 9 9231-1011</span> {/* ← ajuste o número real */}
          </div>

          <a
            href="https://wa.me/5531992311011?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20sistema%20de%20produtos."
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4 inline-block
              bg-indigo-600 text-white
              px-6 py-3 rounded-lg
              font-medium text-sm
              hover:bg-indigo-700 transition
              shadow-sm
            "
          >
            Falar com Suporte
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full border-t border-indigo-900/30 mt-12 pt-8 text-center text-sm text-gray-500">
        © {currentYear} Sistema de Gestão de Produtos — Todos os direitos reservados.
        <br className="md:hidden" />
        <span className="mt-2 block md:inline md:mt-0">
          Desenvolvido com carinho em Betim, MG
        </span>
      </div>
    </footer>
  );
}