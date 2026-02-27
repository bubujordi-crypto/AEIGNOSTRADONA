import { defineField, defineType } from "sanity";

export const llistaUnitats = defineType({
  name: "llistaUnitats",
  title: "Llista d'unitats",
  type: "document",
  fields: [
    defineField({ name: "titol", title: "Títol de la secció", type: "string" }),
    defineField({ name: "descripcio", title: "Descripció", type: "text", rows: 2 }),
    defineField({
      name: "unitats",
      title: "Unitats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "slug", title: "URL (ex: castors)", type: "string", validation: (Rule) => Rule.required() },
            { name: "nom", title: "Nom (ex: Castors)", type: "string", validation: (Rule) => Rule.required() },
            { name: "edats", title: "Franja d'edats (ex: 6-7 anys)", type: "string" },
            {
              name: "color",
              title: "Color (classe Tailwind, ex: bg-orange-500)",
              type: "string",
              description: "bg-{color}-{ton} per fons, text-{color}-{ton} per text",
            },
            { name: "desc", title: "Descripció", type: "text", rows: 2 },
          ],
        },
      ],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Llista d'unitats" }) },
});
