import Link from "next/link";
import AgrupamentDropdown from "@/components/AgrupamentDropdown";
import { BookOpen, GraduationCap, FileText, Sparkles, Info } from "lucide-react";

const SUBPAGES = [
  { href: "/agrupament/historia", label: "Història", icon: BookOpen },
  { href: "/agrupament/proposta-educativa", label: "Proposta Educativa", icon: GraduationCap },
  { href: "/agrupament/pea", label: "PEA", icon: FileText },
  { href: "/agrupament/simbologia", label: "Simbologia", icon: Sparkles },
  { href: "/agrupament/mes-info", label: "Més Info", icon: Info },
];

export default function AgrupamentPage() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold text-scout-green">L&apos;Agrupament</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Descobreix la història, la proposta educativa i tot el que ens defineix com
        agrupament escolta.
      </p>

      {/* Dropdown principal */}
      <div className="mt-10">
        <AgrupamentDropdown />
      </div>

      {/* Tarjetas como alternativa visual */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBPAGES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:border-scout-green/40 hover:shadow-lg transition-all"
            >
              <div className="p-3 rounded-lg bg-scout-green/10 group-hover:bg-scout-green/20 transition-colors">
                <Icon size={28} className="text-scout-green" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-scout-green">
                  {item.label}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Accedir a la secció →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
