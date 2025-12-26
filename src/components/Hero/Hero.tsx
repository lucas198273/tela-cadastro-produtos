"use client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out" });
  }, []);

  return (
    <>
      <Helmet>
        <title>HP Chaveiro 24h | Socorro Imediato em Betim</title>
        <meta
          name="description"
          content="HP Chaveiro 24h em Betim. Atendimento imediato para residências, veículos e empresas. Cópia de chaves, troca de fechaduras e emergência."
        />
        <meta property="og:title" content="HP Chaveiro 24h" />
        <meta
          property="og:description"
          content="Chaveiro profissional 24 horas. Atendimento rápido, seguro e de confiança."
        />
        <meta property="og:image" content="/assets/imgs/logo-chave.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section
        id="home"
        className="
          relative w-full flex items-center justify-center
          px-6 py-20 md:py-32
          bg-gradient-to-b from-black to-white
          overflow-hidden
        "
      >
        <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl items-center gap-16">

          {/* TEXTO + LOGO */}
          <div
            className=" w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
            data-aos="fade-up"
          >
            {/* LOGO */}
            <img
              loading="lazy"
              src="/assets/selo3.webp"
              alt="HP Chaveiro - Logo"
              className=" float w-32 md:w-48 drop-shadow-lg"
            />

            {/* TÍTULO */}
            <h2 className="text-lg md:text-2xl font-semibold text-black md:text-white">
              Chaveiro <span className=" text-amber-300">24 Horas</span> em Betim e Região
            </h2>

            {/* DESCRIÇÃO */}
            <p className="text-gray-900 md:text-gray-100 text-base md:text-lg max-w-md leading-relaxed">
              Atendimento rápido e profissional para residências, veículos e empresas.
              Soluções seguras em chaves, fechaduras e emergências 24h.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="#contato"
                className="bg-[#C9A24D] text-white px-7 py-3 rounded-full font-bold shadow-lg hover:brightness-110 transition"
              >
                Solicitar Atendimento
              </a>

              <a
                href="https://wa.me/5531992311011"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black text-black md:text-black px-7 py-3 rounded-full font-bold hover:bg-black hover:text-white transition"
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </div>

          {/* IMAGEM HERO */}
          <div
            className="w-full md:w-1/2 flex justify-center"
            data-aos="fade-left"
          >
            <img
              src="/assets/flys/flyhero.webp"
              alt="HP Chaveiro 24h em Betim"
              className="w-2/3 sm:w-3/5 md:w-3/5 max-w-md rounded-2xl shadow-xl shadow-[#C9A24D]/30 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </>
  );
}
