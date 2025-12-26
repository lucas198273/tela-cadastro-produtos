"use client";

import {
  Clock,
  ShieldCheck,
  MapPin,
  ThumbsUp,
} from "lucide-react";

const differentials = [
  {
    title: "Atendimento 24 Horas",
    description:
      "Emergências não têm hora. Estamos disponíveis todos os dias, a qualquer momento.",
    icon: Clock,
  },
  {
    title: "Profissionalismo e Segurança",
    description:
      "Serviços executados com responsabilidade, cuidado e total sigilo.",
    icon: ShieldCheck,
  },
  {
    title: "Atendimento em Betim e Região",
    description:
      "Chegamos rápido até você, reduzindo tempo de espera em situações urgentes.",
    icon: MapPin,
  },
  {
    title: "Experiência e Confiança",
    description:
      "Trabalho sério, transparente e focado na satisfação do cliente.",
    icon: ThumbsUp,
  },
];

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="w-full bg-gradient-to-t from-white to-black  py-20 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white opacity-890">
            Por que escolher a{" "}
            <span className="text-[#C9A24D]">HP Chaveiro</span>
          </h2>
          <p className="mt-4 text-white opacity-80 max-w-2xl mx-auto">
            Compromisso com qualidade, rapidez e segurança em cada atendimento.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex items-start gap-6
                  border border-gray-200
                  rounded-2xl
                  p-8
                  bg-white
                  hover:shadow-lg
                  transition
                "
              >
                {/* ICON */}
                <div
                  className="
                    min-w-[56px] min-h-[56px]
                    flex items-center justify-center
                    rounded-xl
                    bg-[#C9A24D]/10
                    text-[#C9A24D]
                  "
                >
                  <Icon size={28} />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA FINAL */}
        <div className="mt-16 text-center">
          <a
            href="#contato"
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
            Solicitar Atendimento Agora
          </a>
        </div>
      </div>
    </section>
  );
}
