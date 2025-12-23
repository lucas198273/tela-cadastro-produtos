"use client";

import {
  PhoneCall,
  Search,
  MapPin,
  Key,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    title: "Contato imediato",
    description:
      "Fale conosco pelo WhatsApp ou ligação para informar sua necessidade.",
    icon: PhoneCall,
  },
  {
    title: "Análise rápida do problema",
    description:
      "Entendemos a situação e definimos a melhor solução de forma objetiva.",
    icon: Search,
  },
  {
    title: "Deslocamento até o local",
    description:
      "Nos dirigimos até você com agilidade em Betim e região.",
    icon: MapPin,
  },
  {
    title: "Solução no local, com segurança",
    description:
      "Serviço executado com cuidado, técnica e total responsabilidade.",
    icon: Key,
  },
  {
    title: "Finalização clara e transparente",
    description:
      "Trabalho finalizado com explicação clara e sem surpresas.",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="atendimento"
      className="w-full bg-white py-20 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Como funciona nosso{" "}
            <span className="text-[#C9A24D]">atendimento</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Um processo simples, direto e pensado para resolver seu problema
            com rapidez e segurança.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="
                  border border-gray-200
                  rounded-2xl
                  p-6
                  text-center
                  bg-white
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

                <h3 className="text-base font-bold text-black mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
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
              border-2 border-black
              text-black
              px-10 py-4
              rounded-full
              font-bold
              hover:bg-black hover:text-white
              transition
            "
          >
            Iniciar atendimento agora
          </a>
        </div>
      </div>
    </section>
  );
}
