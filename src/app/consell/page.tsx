import Link from "next/link";
import ConsellDropdown from "@/components/ConsellDropdown";
import { Network, Users, Briefcase } from "lucide-react";

const SUBPAGES = [
  { href: "/consell/organitzacio", label: "Organització", icon: Network },
  { href: "/consell/caps-i-queles", label: "Caps i Quel·les", icon: Users },
  { href: "/consell/equips-i-carrecs", label: "Equips i Càrrecs", icon: Briefcase },
];

export default function ConsellPage() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold text-scout-green">Consell</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        L&apos;organització del consell, caps, quel·les i equips.
      </p>

      <div className="mt-10">
        <ConsellDropdown />
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
