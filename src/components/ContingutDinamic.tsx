import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "../../sanity/lib/client";
import { paginaContingutQuery } from "../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import { urlFor } from "../../sanity/lib/image";
import Image from "next/image";
import type { PortableTextBlock, Image as SanityImage } from "sanity";

interface ContingutDinamicProps {
  slug: string;
  backHref: string;
  backLabel: string;
  sectionTitle?: string;
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
            <Image
              src={urlFor(value as SanityImage).width(800).height(450).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function ContingutDinamic({
  slug,
  backHref,
  backLabel,
  sectionTitle,
}: ContingutDinamicProps) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const pagina = projectId
    ? await client.fetch(paginaContingutQuery, { slug })
    : null;

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-scout-green hover:text-scout-green-dark mb-8"
      >
        <ArrowLeft size={20} />
        {backLabel}
      </Link>

      {!pagina ? (
        <div>
          <h1 className="text-4xl font-bold text-scout-green">
            {sectionTitle || "Contingut"}
          </h1>
          <p className="mt-8 text-gray-600">
            Encara no hi ha contingut. Afegeix-lo des del{" "}
            <a href="/admin" className="text-scout-green underline">
              panell d&apos;administració
            </a>{" "}
            → Pàgines de contingut.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-scout-green">{pagina.title}</h1>
          {pagina.body && pagina.body.length > 0 ? (
            <div className="mt-8 prose prose-lg max-w-none text-gray-700">
              <PortableText
                value={pagina.body as PortableTextBlock[]}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p className="mt-8 text-gray-600 italic">
              Afegeix contingut a aquesta pàgina des del panell d&apos;administració.
            </p>
          )}
        </>
      )}
    </div>
  );
}
