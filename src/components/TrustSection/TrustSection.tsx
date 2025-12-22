"use client";

import {
  ShieldCheck,
  Clock,
  Wrench,
  ThumbsUp,
} from "lucide-react";

const trustItems = [
  {
    title: "Atendimento Confiável",
    description:
      "Trabalhamos com ética, transparência e total respeito ao cliente.",
    icon: ShieldCheck,
  },
  {
    title: "Disponibilidade 24 Horas",
    description:
      "Emergências não têm hora. Estamos prontos para atender a qualquer momento.",
    icon: Clock,
  },
  {
    title: "Profissional Qualificado",
    description:
      "Experiência técnica em serviços residenciais, automotivos e comerciais.",
    icon: Wrench,
  },
  {
    title: "Serviço Garantido",
    description:
      "Qualidade assegurada com foco em segurança e satisfação.",
    icon: ThumbsUp,
  },
];

export default function TrustSection() {
  return (
    <section
      id="confianca"
      className="w-full bg-white py-20 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Segurança e{" "}
            <span className="text-[#C9A24D]">confiança</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Seu patrimônio e sua tranquilidade tratados com máxima responsabilidade.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  p-8
                  text-center
                  hover:shadow-lg
                  transition
                "
              >
                <div
                  className="
                    w-14 h-14
                    mx-auto
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
      </div>
    </section>
  );
}
