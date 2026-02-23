"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const AGRUPAMENT_SUBPAGES = [
  { href: "/agrupament/historia", label: "Història" },
  { href: "/agrupament/proposta-educativa", label: "Proposta Educativa" },
  { href: "/agrupament/pea", label: "PEA" },
  { href: "/agrupament/simbologia", label: "Simbologia" },
  { href: "/agrupament/mes-info", label: "Més Info" },
];

const UNITATS_SUBPAGES = [
  { href: "/unitats/info-pedagogica", label: "Info Pedagògica" },
  { href: "/unitats/edat", label: "Edat" },
  { href: "/unitats/campaments", label: "Campaments" },
  { href: "/unitats/info", label: "Info" },
  { href: "/unitats/lema", label: "Lema" },
  { href: "/unitats/caps", label: "Caps" },
];

const CONSELL_SUBPAGES = [
  { href: "/consell/organitzacio", label: "Organització" },
  { href: "/consell/caps-i-queles", label: "Caps i Quel·les" },
  { href: "/consell/equips-i-carrecs", label: "Equips i Càrrecs" },
];

const NAV_LINKS = [
  { href: "/", label: "INICI" },
  { href: "/agrupament", label: "L'AGRUPAMENT", children: AGRUPAMENT_SUBPAGES },
  { href: "/unitats", label: "UNITATS", children: UNITATS_SUBPAGES },
  { href: "/consell", label: "CONSELL", children: CONSELL_SUBPAGES },
  { href: "/esdeveniments", label: "ESDEVENIMENTS" },
  { href: "/calendari", label: "CALENDARI" },
  { href: "/galeria", label: "GALERIA" },
  { href: "/lloguer", label: "VINE A DORMIR AL CAU" },
  { href: "/contacte", label: "CONTACTE" },
];

function isSectionActive(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDesktopDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileExpanded = (key: string) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-scout-green/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-3" aria-label="AEIG Nostra Dona de la Salut - Inici">
          <Image
            src="/logo.png"
            alt="AEIG Nostra Dona de la Salut"
            width={48}
            height={48}
            className="rounded-full object-contain"
            priority
          />
          <span className="hidden sm:inline font-bold text-scout-green text-lg">
            AEIG Nostra Dona de la Salut
          </span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-1" ref={dropdownRef}>
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDesktopDropdown(link.href)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isSectionActive(pathname, link.href)
                      ? "bg-scout-green text-white"
                      : "text-gray-700 hover:bg-scout-green/10 hover:text-scout-green"
                  }`}
                >
                  {link.label}
                  <ChevronDown size={16} className={`transition-transform ${openDropdown === link.href ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === link.href && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    <Link
                      href={link.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-2 text-sm ${
                        pathname === link.href ? "bg-scout-green/10 text-scout-green font-medium" : "text-gray-700 hover:bg-scout-green/5"
                      }`}
                    >
                      Vista general
                    </Link>
                    {link.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-2 text-sm ${
                          pathname === sub.href ? "bg-scout-green/10 text-scout-green font-medium" : "text-gray-700 hover:bg-scout-green/5"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-scout-green text-white"
                    : "text-gray-700 hover:bg-scout-green/10 hover:text-scout-green"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-scout-green hover:bg-scout-green/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Tancar menú" : "Obrir menú"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-scout-green/10 bg-white">
          <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    type="button"
                    onClick={() => toggleMobileExpanded(link.href)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isSectionActive(pathname, link.href) ? "bg-scout-green text-white" : "text-gray-700 hover:bg-scout-green/10"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform ${mobileExpanded === link.href ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === link.href && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-scout-green/20 ml-2">
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileExpanded(null);
                        }}
                        className={`block px-3 py-2 rounded-lg text-sm ${pathname === link.href ? "text-scout-green font-medium" : "text-gray-600"}`}
                      >
                        Vista general
                      </Link>
                      {link.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                          className={`block px-3 py-2 rounded-lg text-sm ${pathname === sub.href ? "text-scout-green font-medium" : "text-gray-600"}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href ? "bg-scout-green text-white" : "text-gray-700 hover:bg-scout-green/10"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
