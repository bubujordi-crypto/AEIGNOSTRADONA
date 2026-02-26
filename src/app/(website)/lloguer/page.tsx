import { client } from "../../sanity/lib/client";
import { paginaContingutQuery } from "../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import LloguerForm from "@/components/LloguerForm";
import type { PortableTextBlock } from "sanity";

export const revalidate = 60;

export default async function LloguerPage() {
  const pagina = await client.fetch(paginaContingutQuery, { slug: "lloguer" });

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold text-scout-green">
        {pagina?.title || "Vine a dormir"}
      </h1>

      {pagina?.body ? (
        <div className="mt-8 prose prose-lg max-w-none text-gray-700">
          <PortableText value={pagina.body as PortableTextBlock[]} />
        </div>
      ) : (
        <p className="mt-4 text-gray-600">
          Contacta&apos;ns per reservar o consultar disponibilitat per al lloguer del nostre espai.
        </p>
      )}

      <LloguerForm />
    </div>
  );
}
