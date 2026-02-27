import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

type FooterLink = { href: string; label: string };

export default function Footer({
  titol = "AEIG Nostra Dona de la Salut",
  descripcio = "AEIG Nostra Dona de la Salut",
  email = "albergueria.nostradonadelasalut@escoltesiguies.cat",
  enllaços = [
    { href: "/agrupament", label: "L'Agrupament" },
    { href: "/unitats", label: "Unitats" },
    { href: "/lloguer", label: "Vine a dormir" },
    { href: "/contacte", label: "Contacte" },
  ],
}: {
  titol?: string | null;
  descripcio?: string | null;
  email?: string | null;
  enllaços?: FooterLink[] | null;
}) {
  const links = enllaços && enllaços.length > 0 ? enllaços : [
    { href: "/agrupament", label: "L'Agrupament" },
    { href: "/unitats", label: "Unitats" },
    { href: "/lloguer", label: "Vine a dormir" },
    { href: "/contacte", label: "Contacte" },
  ];

  return (
    <footer className="mt-auto bg-scout-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-scout-gold">{titol || "AEIG Nostra Dona de la Salut"}</h3>
            <p className="mt-2 text-sm text-white/80">{descripcio || ""}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-scout-gold">Contacte</h3>
            <ul className="mt-4 space-y-2">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                    <Mail size={16} />
                    {email}
                  </a>
                </li>
              )}
              <li>
                <Link href="/contacte" className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  <MapPin size={16} />
                  Més informació de contacte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-scout-gold">Enllaços</h3>
            <ul className="mt-4 space-y-2">
              {links.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-white/80 hover:text-white">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/70">
            © {new Date().getFullYear()} {titol || "AEIG Nostra Dona de la Salut"}. Tots els drets reservats.
          </p>
        </div>
      </div>
    </footer>
  );
}
