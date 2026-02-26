"use client";

import Link from "next/link";
import Image from "next/image";
import { TreePine, Calendar, Users } from "lucide-react";

const CARDS = [
  {
    href: "/agrupament",
    title: "AGRUPAMENT",
    subtitle: "Coneix la nostra història i proposta educativa",
    icon: TreePine,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
  },
  {
    href: "/esdeveniments",
    title: "NOTÍCIES / ESDEVENIMENTS",
    subtitle: "Últimes novetats i esdeveniments",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&q=80",
  },
  {
    href: "/unitats",
    title: "UNITATS",
    subtitle: "CILL (6-8), LLID, RÚNICS, PIONERS, CLI...",
    icon: Users,
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80",
  },
];

export default function NavCards() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-scout-green text-center mb-12">
          Descobreix l&apos;Agrupament
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 hover:ring-scout-green/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="w-8 h-8 text-scout-gold" strokeWidth={2} />
                      <h3 className="text-xl font-bold">{card.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 group-hover:text-scout-green transition-colors">
                    {card.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
