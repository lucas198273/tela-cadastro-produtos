"use client";

import { Key, Car, Home, ShieldCheck, Wrench } from "lucide-react";

const services = [
  {
    title: "Chaveiro 24 Horas",
    description:
      "Atendimento imediato para emergências 24h, com deslocamento rápido e solução no local, residencial ou automotivo.",
    icon: ShieldCheck,
  },
  {
    title: "Abertura de Portas",
    description:
      "Abertura de portas residenciais, comerciais e automotivas sem danos à fechadura.",
    icon: Home,
  },
  {
    title: "Abertura de Veículos",
    description:
      "Carros trancados? Realizamos abertura automotiva com técnicas seguras e profissionais.",
    icon: Car,
  },
  {
    title: "Chave Quebrada na Fechadura",
    description:
      "Remoção de chave quebrada em portas, cilindros e tambor automotivo com total cuidado.",
    icon: Key,
  },
  {
    title: "Troca e Manutenção de Fechaduras",
    description:
      "Troca de segredos, cilindros e fechaduras para reforçar a segurança do seu imóvel ou veículo.",
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
            Serviços especializados em chaveiro, com atendimento rápido,
            seguro e profissional para emergências e manutenções.
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
