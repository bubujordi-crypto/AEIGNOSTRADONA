import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

const UNITATS = [
  { slug: "castors", nom: "Castors", edats: "6-7 anys", colorBg: "bg-orange-500", colorText: "text-orange-500", desc: "Els més petits de l'agrupament. Comparteixen i descobreixen." },
  { slug: "llops", nom: "Llops", edats: "7-8 anys", colorBg: "bg-yellow-500", colorText: "text-yellow-500", desc: "S'organitzen en estols per aprendre a ser autònoms." },
  { slug: "rangers", nom: "Ràngers", edats: "11-12 anys", colorBg: "bg-blue-600", colorText: "text-blue-600", desc: "Viuen l'aventura i emprenen projectes en patrulles." },
  { slug: "pioners", nom: "Pioners", edats: "12-13 anys", colorBg: "bg-red-600", colorText: "text-red-600", desc: "Protagonistes del seu destí, descobreixen i transformen." },
  { slug: "truc-1", nom: "TRUC I", edats: "15-16 anys", colorBg: "bg-green-600", colorText: "text-green-600", desc: "S'enfoquen en el Servei als altres i la consciència social." },
  { slug: "truc-2", nom: "TRUC II", edats: "17-18 anys", colorBg: "bg-green-800", colorText: "text-green-800", desc: "L'any de l'animació i la preparació per ser futurs caps." },
];

export const revalidate = 60;

export default function UnitatsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-scout-green sm:text-5xl">Les nostres Unitats</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          A l&apos;agrupament ens dividim per grups d&apos;edat anomenats unitats. 
          Cadascuna té una pedagogia i activitats adaptades al seu moment vital.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {UNITATS.map((unitat) => (
          <Link
            key={unitat.slug}
            href={`/unitats/${unitat.slug}`}
            className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`h-3 w-full ${unitat.colorBg}`} />
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-scout-green transition-colors">
                  {unitat.nom}
                </h2>
                <div className={`p-2 rounded-full ${unitat.colorBg} bg-opacity-10 ${unitat.colorText}`}>
                  <Users size={24} />
                </div>
              </div>
              
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4 w-fit">
                {unitat.edats}
              </div>
              
              <p className="text-gray-600 flex-1">
                {unitat.desc}
              </p>

              <div className="mt-6 flex items-center text-scout-green font-medium">
                Saber-ne més
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
