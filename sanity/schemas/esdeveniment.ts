import { defineField, defineType } from "sanity";

export const esdeveniment = defineType({
  name: "esdeveniment",
  title: "Esdeveniment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Títol de l'esdeveniment",
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
      name: "date",
      title: "Data de l'esdeveniment",
      type: "date",
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
      name: "description",
      title: "Descripció curta",
      type: "text",
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
