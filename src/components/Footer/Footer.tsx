"use client";

import {
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 opacity-95 text-center md:text-left">

        {/* SOBRE */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-3xl font-bold text-[#C9A24D]" translate="no">
            HP Chaveiro
          </h3>

          <p className="text-sm leading-relaxed text-gray-300">
            Mais de 10 anos de experiência em serviços de chaveiro.
            Atendimento rápido e seguro para residências, veículos
            e empresas em Betim e região.
          </p>

          <a
            href="/politicas"
            className="text-[#C9A24D] hover:brightness-110 transition text-sm"
          >
            Política de Privacidade
          </a>

          {/* REDES */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#C9A24D] text-black hover:brightness-110 transition"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://wa.me/5531992311011"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#C9A24D] text-black hover:brightness-110 transition"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* CONTATO */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-xl font-semibold text-[#C9A24D]">
            Contato
          </h3>

          <div className="flex items-center gap-3 text-gray-300 text-sm justify-center md:justify-start">
            <FaMapMarkerAlt className="text-[#C9A24D]" />
            <span>Atendimento em Betim e região</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 text-sm justify-center md:justify-start">
            <FaEnvelope className="text-[#C9A24D]" />
            <span>contato@hpchaveiro.com.br</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 text-sm justify-center md:justify-start">
            <FaWhatsapp className="text-[#C9A24D]" />
            <span>(31) 9 9231-1011</span>
          </div>
        </div>

        {/* ATENDIMENTO */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-xl font-semibold text-[#C9A24D]">
            Atendimento
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            Disponibilidade 24 horas para emergências.
            Abertura de portas, chaves automotivas,
            cópias codificadas e troca de fechaduras.
          </p>

          <a
            href="https://wa.me/5531992311011"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              mt-2
              bg-[#C9A24D]
              text-black
              px-6 py-3
              rounded-full
              font-bold
              text-sm
              hover:brightness-110
              transition
            "
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        translate="no"
        className="
          w-full
          border-t border-[#C9A24D]/30
          mt-12 pt-6
          text-center
          text-sm
          text-gray-400
        "
      >
        © {new Date().getFullYear()} HP Chaveiro — Todos os direitos reservados.
      </div>
    </footer>
  );
}
