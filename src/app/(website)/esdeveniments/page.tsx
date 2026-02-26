import Link from "next/link";
import { client } from "../../../../sanity/lib/client";
import { esdevenimentsQuery } from "../../../../sanity/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";

interface Esdeveniment {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  mainImage?: SanityImage;
  galeria?: Array<SanityImage & { alt?: string }>;
  description?: string;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EsdevenimentsPage() {
  const esdeveniments: Esdeveniment[] = await client.fetch(esdevenimentsQuery);

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-scout-green">Esdeveniments</h1>
      <p className="mt-4 text-gray-600 mb-12">
        Blog/feed de notícies: Buti, Quinto, Passos...
      </p>

      {esdeveniments.length === 0 ? (
        <p className="text-gray-500 italic">
          Encara no hi ha esdeveniments. Afegeix-ne des del{" "}
          <a href="/studio" className="text-scout-green underline">
            panell d&apos;administració
          </a>
          .
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {esdeveniments.map((event) => (
            <Link
              key={event._id}
              href={`/esdeveniments/${event.slug?.current || event._id}`}
              className="block group"
            >
              <article
                className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm group-hover:shadow-md group-hover:border-scout-green/30 transition-all"
              >
              {event.mainImage && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={urlFor(event.mainImage as SanityImage).width(600).height(340).url()}
                    alt={
                      (event.mainImage as SanityImage & { alt?: string })?.alt ||
                      event.title
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <time
                  dateTime={event.date}
                  className="text-sm text-gray-500 block mb-1"
                >
                  {event.date
                    ? new Date(event.date).toLocaleDateString("ca-CA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </time>
                <h2 className="text-xl font-semibold text-scout-green">
                  {event.title}
                </h2>
                {event.description && (
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {event.description}
                  </p>
                )}
              </div>
            </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
