import { defineField, defineType } from "sanity";

export const fotoGaleria = defineType({
  name: "fotoGaleria",
  title: "Foto",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imatge",
      type: "image",
      description: "Arrossega la foto o prem per pujar-la",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Descripció",
          type: "string",
          description: "Què es veu a la foto (opcional)",
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Peu de foto",
      type: "string",
      description: "Un títol o descripció breu (opcional)",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      description: "On s'agruparà la foto a la galeria",
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
      title: "Data",
      type: "date",
      description: "Quan es va fer la foto (opcional)",
      initialValue: () => new Date().toISOString().split("T")[0],
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
