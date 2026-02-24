import { defineField, defineType } from "sanity";

export const fotoGaleria = defineType({
  name: "fotoGaleria",
  title: "Foto Galeria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Títol o peu de foto",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Imatge",
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
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Campaments", value: "Campaments" },
          { title: "Rutes", value: "Rutes" },
          { title: "Cau", value: "Cau" },
          { title: "Altres", value: "Altres" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Data de la foto",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return {
        title: title || "Sense títol",
        media,
      };
    },
  },
});
