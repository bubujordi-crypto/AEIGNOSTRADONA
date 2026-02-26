import { client } from "../../../../sanity/lib/client";
import { fotosGaleriaQuery } from "../../../../sanity/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";

interface FotoGaleria {
  _id: string;
  title?: string;
  image?: SanityImage;
  category?: string;
  date?: string;
}

export default async function GaleriaPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const fotos: FotoGaleria[] = projectId
    ? await client.fetch(fotosGaleriaQuery)
    : [];

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-scout-green">Galeria</h1>
      <p className="mt-4 text-gray-600 mb-12">
        Fotos dels moments del nostre agrupament
      </p>

      {fotos.length === 0 ? (
        <p className="text-gray-500 italic">
          Encara no hi ha fotos. Afegeix-ne des del{" "}
          <a href="/studio" className="text-scout-green underline">
            panell d&apos;administració
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-full">
          {fotos.map((foto) => (
            <figure
              key={foto._id}
              className="group relative aspect-square w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
            >
              {foto.image ? (
                <Image
                  src={urlFor(foto.image).width(400).height(400).fit("max").url()}
                  alt={
                    (foto.image as SanityImage & { alt?: string })?.alt ||
                    foto.title ||
                    "Foto de la galeria"
                  }
                  fill
                  className="object-cover transition-transform group-hover:scale-105 w-full h-full"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Sense imatge
                </div>
              )}
              {(foto.title || foto.category) && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-medium">{foto.title || "Sense títol"}</span>
                  {foto.category && (
                    <span className="block text-white/80 text-xs mt-0.5">
                      {foto.category}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
