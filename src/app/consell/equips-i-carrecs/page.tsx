import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EquipsICarrecsPage() {
  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <Link href="/consell" className="inline-flex items-center gap-2 text-scout-green hover:text-scout-green-dark mb-8">
        <ArrowLeft size={20} /> Tornar al Consell
      </Link>
      <h1 className="text-4xl font-bold text-scout-green">Equips i Càrrecs</h1>
      <div className="mt-8 prose prose-lg text-gray-700 max-w-none">
        <p className="text-gray-600">Aquí anirà la informació sobre equips i càrrecs del consell, incloent l&apos;Equip FAM.</p>
      </div>
    </div>
  );
}
