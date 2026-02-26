import { defineField, defineType } from "sanity";

export const entradaHistoria = defineType({
  name: "entradaHistoria",
  title: "Entrada d'història",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Títol",
      type: "string",
      description: "El títol de l'entrada",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: "Prem 'Generate' i es crearà sol. No cal canviar-ho.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imatge principal",
      type: "image",
      description: "La foto destacada de l'entrada",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Descripció",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Data",
      type: "date",
      description: "Quan es va publicar o té lloc",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "excerpt",
      title: "Resum",
      type: "text",
      rows: 3,
      description: "Un resum curt que apareix a la llista",
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      description: "Escriu el contingut aquí. Pots afegir encapçalaments, llistes i fotos.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Descripció", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "galeria",
      title: "Més fotos",
      type: "array",
      description: "Fotos addicionals per a l'entrada",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Descripció", type: "string" },
            { name: "caption", title: "Peu de foto", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", publishedAt: "publishedAt", media: "mainImage" },
    prepare({ title, publishedAt, media }) {
      return {
        title: title || "Sense títol",
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString("ca-CA")
          : "",
        media,
      };
    },
  },
});
