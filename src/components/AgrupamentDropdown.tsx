"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, BookOpen, GraduationCap, FileText, Sparkles, Info } from "lucide-react";

const SUBPAGES = [
  { href: "/agrupament/historia", label: "Història", icon: BookOpen },
  { href: "/agrupament/proposta-educativa", label: "Proposta Educativa", icon: GraduationCap },
  { href: "/agrupament/pea", label: "PEA", icon: FileText },
  { href: "/agrupament/simbologia", label: "Simbologia", icon: Sparkles },
  { href: "/agrupament/mes-info", label: "Més Info", icon: Info },
];

export default function AgrupamentDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-auto px-6 py-4 rounded-xl bg-white border-2 border-scout-green/30 hover:border-scout-green text-left font-semibold text-scout-green shadow-md hover:shadow-lg transition-all"
      >
        Explorar seccions
        <ChevronDown
          size={24}
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 sm:right-auto sm:min-w-[320px] top-full mt-2 z-50 rounded-xl border border-gray-200 bg-white py-3 shadow-xl">
            {SUBPAGES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-scout-green/5 text-gray-700 hover:text-scout-green transition-colors"
                >
                  <Icon size={22} className="text-scout-green flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
