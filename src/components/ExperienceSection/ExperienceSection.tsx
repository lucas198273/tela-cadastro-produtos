"use client";

import { Clock, Home, Car, Building2 } from "lucide-react";

const experiences = [
  {
    title: "Emergências Residenciais",
    description:
      "Portas trancadas, chaves perdidas ou fechaduras danificadas. Atendimento rápido para garantir sua segurança.",
    icon: Home,
  },
  {
    title: "Problemas com Veículos",
    description:
      "Abertura de carros, chaves quebradas no tambor e soluções automotivas com total cuidado.",
    icon: Car,
  },
  {
    title: "Atendimento Comercial",
    description:
      "Empresas, comércios e condomínios atendidos com profissionalismo e sigilo.",
    icon: Building2,
  },
  {
    title: "Socorro 24 Horas",
    description:
      "Situações inesperadas não têm hora. Estamos prontos para agir quando você mais precisa.",
    icon: Clock,
  },
];

export default function ExperienceSection() {
  return (
    <section className="w-full bg-black py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Mais de <span className="text-[#C9A24D]">10 anos de experiência</span>
          </h2>
          <p className="mt-4 text-white opacity-95 max-w-2xl mx-auto">
            Atuando diariamente em situações reais, com foco em rapidez,
            segurança e confiança.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  border border-gray-200
                  rounded-2xl
                  p-8
                  bg-white
                  hover:shadow-lg
                  transition
                "
              >
                <div
                  className="
                    w-14 h-14
                    flex items-center justify-center
                    rounded-xl
                    bg-[#C9A24D]/10
                    text-[#C9A24D]
                    mb-6
                  "
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-bold text-black mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://wa.me/5531992311011"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              bg-[#C9A24D]
              text-white
              px-10 py-4
              rounded-full
              font-bold
              shadow-lg
              hover:brightness-110
              transition
            "
          >
            Falar com um especialista agora
          </a>
        </div>
      </div>
    </section>
  );
}
