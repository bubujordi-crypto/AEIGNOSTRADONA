import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-scout-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-scout-gold">AEIG Nostra Dona de la Salut</h3>
            <p className="mt-2 text-sm text-white/80">
              AEIG Nostra Dona de la Salut
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-scout-gold">
              Contacte
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:albergueria.nostradonadelasalut@escoltesiguies.cat"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  <Mail size={16} />
                  albergueria.nostradonadelasalut@escoltesiguies.cat
                </a>
              </li>
              <li>
                <Link
                  href="/contacte"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  <MapPin size={16} />
                  Més informació de contacte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-scout-gold">
              Enllaços
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/agrupament" className="text-sm text-white/80 hover:text-white">
                  L&apos;Agrupament
                </Link>
              </li>
              <li>
                <Link href="/unitats" className="text-sm text-white/80 hover:text-white">
                  Unitats
                </Link>
              </li>
              <li>
                <Link href="/lloguer" className="text-sm text-white/80 hover:text-white">
                  Vine a dormir al cau
                </Link>
              </li>
              <li>
                <Link href="/contacte" className="text-sm text-white/80 hover:text-white">
                  Contacte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/70">
            © {new Date().getFullYear()} AEIG Nostra Dona de la Salut. Tots els drets reservats.
          </p>
        </div>
      </div>
    </footer>
  );
}
