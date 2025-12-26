"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full bg-black fixed top-0 left-0 z-50 border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

        {/* LOGO IMAGEM */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Página inicial"
        >
          <img
            src="/assets/imagechave.webp" 
            alt="Logo HP Chaveiro"
            className="
              h-10 md:h-12 float
              w-auto 
              object-contain
              drop-shadow-[0_0_10px_rgba(234,179,8,0.25)]
            "
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-white">
          <a href="#servicos" className="hover:text-yellow-400 transition">
            Serviços
          </a>

          <a href="#atendimento" className="hover:text-yellow-400 transition">
            Atendimento 24h
          </a>

          {/* BOTÃO WHATSAPP */}
          <a
            href="https://wa.me/5531999999999?text=Olá!%20Preciso%20de%20um%20chaveiro%20agora."
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-yellow-500 text-black
              px-5 py-2 rounded-full
              font-bold shadow-md
              hover:bg-yellow-400 transition
              flex items-center gap-2
            "
          >
            <Phone size={18} />
            Chamar no WhatsApp
          </a>
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-yellow-500"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-black border-t border-yellow-600/30 px-6 py-6 flex flex-col gap-6 text-lg font-semibold text-white">
          <a href="#servicos" onClick={closeMenu} className="hover:text-yellow-400 transition">
            Serviços
          </a>

          <a href="#atendimento" onClick={closeMenu} className="hover:text-yellow-400 transition">
            Atendimento 24h
          </a>

          {/* WHATSAPP MOBILE */}
          <a
            href="https://wa.me/5531999999999?text=Olá!%20Preciso%20de%20um%20chaveiro%20agora."
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="
              bg-yellow-500 text-black
              px-6 py-3 rounded-full
              font-bold shadow-md
              hover:bg-yellow-400 transition
              flex items-center justify-center gap-2
            "
          >
            <Phone size={20} />
            Chamar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
