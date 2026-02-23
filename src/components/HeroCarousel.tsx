"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80",
    alt: "Acampada en la natura",
  },
  {
    src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&q=80",
    alt: "Jocs a l'aire lliure",
  },
  {
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1920&q=80",
    alt: "Foc de camp",
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
    alt: "Caminada a la muntanya",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="embla__slide relative min-w-0 flex-[0_0_100%] h-[70vh] min-h-[400px] sm:h-[80vh] md:h-[85vh]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 drop-shadow-lg">
                  FOTOS AMB LLEI ESCOLTA QUE VAN RULANDO
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
        aria-label="Diapositiva anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
        aria-label="Diapositiva següent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
