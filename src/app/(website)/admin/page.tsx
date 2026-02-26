import Link from "next/link";
import { Calendar, Images, BookOpen, FileText, ArrowRight } from "lucide-react";

const ADMIN_SECTIONS = [
  {
    id: "esdeveniment",
    title: "Esdeveniments i notícies",
    description: "Afegir o editar activitats (Buti, Quinto, Passos...)",
    href: "/studio/structure/esdeveniment",
    icon: Calendar,
  },
  {
    id: "fotoGaleria",
    title: "Galeria de fotos",
    description: "Pujar fotos i assignar-les a una categoria",
    href: "/studio/structure/fotoGaleria",
    icon: Images,
  },
  {
    id: "entradaHistoria",
    title: "Història de l'agrupament",
    description: "Escriure o modificar les entrades de la història",
    href: "/studio/structure/entradaHistoria",
    icon: BookOpen,
  },
  {
    id: "paginaContingut",
    title: "Pàgines de contingut",
    description: "Proposta Educativa, PEA, Simbologia, Unitats, Consell, Contacte...",
    href: "/studio/structure/paginaContingut",
    icon: FileText,
  },
] as const;

export default function AdminPage() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-scout-green">
        Editor de contingut
      </h1>
      <p className="mt-1 text-gray-600">
        Tria què vols editar. Hauràs d&apos;iniciar sessió si encara no ho has fet.
      </p>

      <div className="mt-8 space-y-3">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-scout-green/50 hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-lg bg-scout-green/10">
                <Icon className="size-6 text-scout-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 group-hover:text-scout-green">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <ArrowRight className="size-5 text-gray-400 group-hover:text-scout-green shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
