import Link from "next/link";
import UnitatsDropdown from "@/components/UnitatsDropdown";
import { BookOpen, Users, Tent, Info, Quote, UserCheck } from "lucide-react";

const SUBPAGES = [
  { href: "/unitats/info-pedagogica", label: "Info Pedagògica", icon: BookOpen },
  { href: "/unitats/edat", label: "Edat", icon: Users },
  { href: "/unitats/campaments", label: "Campaments", icon: Tent },
  { href: "/unitats/info", label: "Info", icon: Info },
  { href: "/unitats/lema", label: "Lema", icon: Quote },
  { href: "/unitats/caps", label: "Caps", icon: UserCheck },
];

export default function UnitatsPage() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold text-scout-green">Unitats</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        CILL (6-8), LLID, Rúnics, Pioners, CLI... Descobreix cada unitat i la seva proposta.
      </p>

      <div className="mt-10">
        <UnitatsDropdown />
      </div>

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
                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-scout-green">{item.label}</h2>
                <p className="text-sm text-gray-500 mt-1">Accedir a la secció →</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
