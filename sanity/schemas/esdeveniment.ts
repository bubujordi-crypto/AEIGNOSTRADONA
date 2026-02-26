import { defineField, defineType } from "sanity";

export const esdeveniment = defineType({
  name: "esdeveniment",
  title: "Esdeveniment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Títol",
      type: "string",
      description: "El nom de l'esdeveniment (ex: Buti 2025)",
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
      name: "date",
      title: "Data",
      type: "date",
      description: "Quan té lloc l'esdeveniment",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imatge",
      type: "image",
      description: "Arrossega una foto o prem per pujar-la",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Descripció de la imatge",
          type: "string",
          description: "Breu descripció per a persones amb dificultats visuals",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Descripció",
      type: "text",
      rows: 3,
      description: "Un resum curt que es veurà a la llista d'esdeveniments",
    }),
    defineField({
      name: "galeria",
      title: "Galeria d'imatges",
      type: "array",
      description: "Afegeix més fotos per mostrar-les com a galeria a la pàgina de l'esdeveniment",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Descripció de la imatge",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", date: "date" },
    prepare({ title, date }) {
      return {
        title: title || "Sense títol",
        subtitle: date ? new Date(date).toLocaleDateString("ca-CA") : "",
      };
    },
  },
});
