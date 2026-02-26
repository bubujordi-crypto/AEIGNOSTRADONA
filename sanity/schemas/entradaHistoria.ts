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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
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
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Text alternatiu (per accessibilitat)",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicació",
      type: "date",
    }),
    defineField({
      name: "excerpt",
      title: "Resum (per a la llista)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Cos de l'entrada",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Text alternatiu",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "galeria",
      title: "Galeria de fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Text alternatiu",
              type: "string",
            },
            {
              name: "caption",
              title: "Peu de foto",
              type: "string",
            },
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
