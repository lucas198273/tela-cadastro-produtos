"use client";

import { Key, Car, Home, ShieldCheck, Wrench } from "lucide-react";

const services = [
  {
    title: "Chaveiro 24 Horas",
    description:
      "Atendimento imediato para emergências, dia e noite, com rapidez e segurança.",
    icon: ShieldCheck,
  },
  {
    title: "Cópia de Chaves",
    description:
      "Cópias de chaves comuns, residenciais e comerciais com precisão.",
    icon: Key,
  },
  {
    title: "Chaves Automotivas",
    description:
      "Cópia e programação de chaves automotivas, nacionais e importadas.",
    icon: Car,
  },
  {
    title: "Troca de Fechaduras",
    description:
      "Substituição e manutenção de fechaduras para maior segurança.",
    icon: Home,
  },
  {
    title: "Amolamento de Alicates",
    description:
      "Serviço profissional de amolamento para ferramentas de precisão.",
    icon: Wrench,
  },
];

export default function Services() {
  return (
    <section
      id="servicos"
      className="w-full bg-white py-20 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Nossos <span className="text-[#C9A24D]">Serviços</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Soluções completas em chaveiro, com atendimento rápido,
            profissional e de confiança.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group
                  border border-gray-200
                  rounded-2xl
                  p-8
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  transition
                "
              >
                {/* ICON */}
                <div
                  className="
                    w-14 h-14
                    flex items-center justify-center
                    rounded-xl
                    bg-[#C9A24D]/10
                    text-[#C9A24D]
                    mb-6
                    group-hover:bg-[#C9A24D]
                    group-hover:text-white
                    transition
                  "
                >
                  <Icon size={28} />
                </div>

                {/* CONTENT */}
                <h3 className="text-xl font-bold text-black mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <a
                  href="#contato"
                  className="
                    inline-block
                    text-sm font-bold
                    text-[#C9A24D]
                    hover:text-black
                    transition
                  "
                >
                  Solicitar serviço →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
