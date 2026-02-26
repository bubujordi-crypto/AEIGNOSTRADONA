import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "../../../../../sanity/lib/client";
import { entradesHistoriaQuery } from "../../../../../sanity/lib/queries";
import { urlFor } from "../../../../../sanity/lib/image";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";

interface BlockChild {
  _type: string;
  text?: string;
  marks?: string[];
}

interface Block {
  _type: string;
  style?: string;
  children?: BlockChild[];
}

interface EntradaHistoria {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  publishedAt?: string;
  excerpt?: string;
  body?: Block[];
  galeria?: Array<
    (SanityImage & { caption?: string }) | { _type: "image"; asset?: { _ref: string }; alt?: string; caption?: string }
  >;
}

function BlockContent({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="prose prose-lg max-w-none text-gray-700">
      {blocks.map((block, i) => {
        if (block._type !== "block" || !block.children?.length) {
          if (block._type === "image" && "asset" in block) return null;
          return null;
        }
        const text = block.children.map((c) => c?.text ?? "").join("");
        if (!text) return null;
        const style = block.style || "normal";
        if (style === "h1")
          return (
            <h1 key={i} className="text-3xl font-bold text-scout-green mt-8 mb-4">
              {text}
            </h1>
          );
        if (style === "h2")
          return (
            <h2 key={i} className="text-2xl font-semibold text-scout-green mt-6 mb-3">
              {text}
            </h2>
          );
        if (style === "h3")
          return (
            <h3 key={i} className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              {text}
            </h3>
          );
        return (
          <p key={i} className="mb-4">
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default async function HistoriaPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const entrades: EntradaHistoria[] = projectId
    ? await client.fetch(entradesHistoriaQuery)
    : [];

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <Link
        href="/agrupament"
        className="inline-flex items-center gap-2 text-scout-green hover:text-scout-green-dark mb-8"
      >
        <ArrowLeft size={20} />
        Tornar a L&apos;Agrupament
      </Link>
      <h1 className="text-4xl font-bold text-scout-green">Història</h1>
      <p className="mt-2 text-gray-600">
        Els orígens, els moments més importants i les persones que han fet
        possible el nostre agrupament.
      </p>

      {entrades.length === 0 ? (
        <div className="mt-8 prose prose-lg text-gray-700 max-w-none">
          <p className="text-gray-600">
            Aquí anirà el contingut de la història de l&apos;agrupament. Afegeix
            entrades des del{" "}
            <a href="/studio" className="text-scout-green underline">
              panell d&apos;administració (Studio)
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-16">
          {entrades.map((entrada) => (
            <article
              key={entrada._id}
              className="border-b border-gray-200 pb-16 last:border-0"
            >
              {entrada.publishedAt && (
                <time
                  dateTime={entrada.publishedAt}
                  className="text-sm text-gray-500 block mb-2"
                >
                  {new Date(entrada.publishedAt).toLocaleDateString("ca-CA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
              <h2 className="text-3xl font-bold text-scout-green">
                {entrada.title}
              </h2>
              {entrada.mainImage && (
                <div className="relative aspect-video w-full mt-6 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={urlFor(entrada.mainImage as SanityImage)
                      .width(900)
                      .height(506)
                      .url()}
                    alt={
                      (entrada.mainImage as SanityImage & { alt?: string })
                        ?.alt || entrada.title
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                </div>
              )}
              {entrada.excerpt && (
                <p className="mt-4 text-lg text-gray-600 italic">
                  {entrada.excerpt}
                </p>
              )}
              <div className="mt-6">
                <BlockContent blocks={entrada.body || []} />
              </div>
              {entrada.galeria && entrada.galeria.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-scout-green mb-4">
                    Galeria
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {entrada.galeria.map((img, idx) => {
                      const image = img && "asset" in img && img.asset ? img : null;
                      if (!image) return null;
                      return (
                        <figure
                          key={idx}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={urlFor(image as SanityImage)
                              .width(500)
                              .height(375)
                              .url()}
                            alt={String(("alt" in image && image.alt) || entrada.title)}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                          {"caption" in image && image.caption && (
                            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
                              {image.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
