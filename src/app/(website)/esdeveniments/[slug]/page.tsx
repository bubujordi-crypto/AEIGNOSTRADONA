import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { client } from "../../../../../sanity/lib/client";
import { esdevenimentBySlugQuery } from "../../../../../sanity/lib/queries";
import { urlFor } from "../../../../../sanity/lib/image";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";

interface Esdeveniment {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  mainImage?: SanityImage;
  galeria?: Array<SanityImage & { _key?: string; alt?: string }>;
  description?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EsdevenimentPage({ params }: Props) {
  const { slug } = await params;
  const event: Esdeveniment | null = await client.fetch(esdevenimentBySlugQuery, { slug });

  if (!event) notFound();

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <Link
        href="/esdeveniments"
        className="inline-flex items-center gap-2 text-scout-green hover:text-scout-green-dark mb-8"
      >
        <ArrowLeft size={20} />
        Tornar a Esdeveniments
      </Link>

      <article>
        {event.mainImage && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 mb-8">
            <Image
              src={urlFor(event.mainImage as SanityImage)
                .width(900)
                .height(506)
                .url()}
              alt={
                (event.mainImage as SanityImage & { alt?: string })?.alt ||
                event.title
              }
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}

        <time
          dateTime={event.date}
          className="text-sm text-gray-500 block mb-2"
        >
          {event.date
            ? new Date(event.date).toLocaleDateString("ca-CA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}
        </time>

        <h1 className="text-4xl font-bold text-scout-green">{event.title}</h1>

        {event.description && (
          <div className="mt-6 prose prose-lg max-w-none text-gray-700">
            <div className="whitespace-pre-wrap">{event.description}</div>
          </div>
        )}

        {event.galeria && event.galeria.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-scout-green mb-6">Galeria d&apos;imatges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.galeria.map((img: SanityImage & { _key?: string; alt?: string }) => (
                <figure
                  key={img._key || Math.random().toString()}
                  className="relative aspect-video rounded-xl overflow-hidden border border-gray-200"
                >
                  <Image
                    src={urlFor(img).width(600).height(338).url()}
                    alt={img.alt || event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
