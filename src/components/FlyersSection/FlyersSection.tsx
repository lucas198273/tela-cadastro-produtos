"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Flyer {
  id: number;
  image: string;
}

const flyers: Flyer[] = [
  { id: 1, image: "/assets/flys/image1.webp" },
  { id: 2, image: "/assets/flys/image2.webp" },
  { id: 3, image: "/assets/flys/image3.webp" },
  { id: 4, image: "/assets/flys/image4.webp" },
  { id: 5, image: "/assets/flys/image6.webp" },
  { id: 6, image: "/assets/flys/image7.webp" },
  { id: 7, image: "/assets/flys/image8.webp" },
];

export default function FlyersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -360,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  return (
    <section id="flyers" className="w-full bg-white py-20">
      <div className="relative max-w-7xl mx-auto px-6" data-aos="fade-up">
        
        {/* BOTÃO ESQUERDA */}
        <button
          onClick={scrollLeft}
          className="
            hidden md:flex
            absolute left-6
            top-[45%]
            -translate-y-1/2
            z-20
            h-14 w-14
            items-center justify-center
            rounded-full
            bg-black
            shadow-2xl
            transition
            hover:scale-105
          "
          aria-label="Anterior"
        >
          <ChevronLeft className="w-7 h-7 text-[#D4AF37]" />
        </button>

        {/* BOTÃO DIREITA */}
        <button
          onClick={scrollRight}
          className="
            hidden md:flex
            absolute right-6
            top-[45%]
            -translate-y-1/2
            z-20
            h-14 w-14
            items-center justify-center
            rounded-full
            bg-black
            shadow-2xl
            transition
            hover:scale-105
          "
          aria-label="Próximo"
        >
          <ChevronRight className="w-7 h-7 text-[#D4AF37]" />
        </button>

        {/* CONTAINER DE SCROLL */}
        <div
          ref={scrollRef}
          className="
            flex gap-8
            overflow-x-auto
            scroll-smooth
            scrollbar-hide
            snap-x snap-mandatory
            px-10
          "
        >
          {flyers.map((flyer) => (
            <div
              key={flyer.id}
              className="
                flex-shrink-0
                snap-center
                rounded-3xl
                shadow-xl
                border
                bg-white
              "
            >
              <img
                src={flyer.image}
                alt="Flyer promocional"
                className="
                  w-auto
                  h-auto
                  max-h-[440px]
                  object-contain
                  rounded-3xl
                "
              />
            </div>
          ))}
        </div>

        {/* BOTÕES MOBILE */}
        <div className="flex md:hidden justify-center gap-10 mt-8">
          <button
            onClick={scrollLeft}
            className="
              h-14 w-14
              flex items-center justify-center
              rounded-full
              bg-black
              shadow-xl
              active:scale-95
            "
            aria-label="Anterior"
          >
            <ChevronLeft className="w-7 h-7 text-[#D4AF37]" />
          </button>

          <button
            onClick={scrollRight}
            className="
              h-14 w-14
              flex items-center justify-center
              rounded-full
              bg-black
              shadow-xl
              active:scale-95
            "
            aria-label="Próximo"
          >
            <ChevronRight className="w-7 h-7 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </section>
  );
}
