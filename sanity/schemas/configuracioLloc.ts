import { defineField, defineType } from "sanity";

export const configuracioLloc = defineType({
  name: "configuracioLloc",
  title: "Configuració del lloc",
  type: "document",
  fields: [
    defineField({
      name: "navLinks",
      title: "Menú de navegació",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "href", title: "Enllaç (ex: /unitats)", type: "string", validation: (Rule) => Rule.required() },
            { name: "label", title: "Text (ex: UNITATS)", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "children",
              title: "Submenú",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "href", title: "Enllaç", type: "string", validation: (Rule) => Rule.required() },
                    { name: "label", title: "Text", type: "string", validation: (Rule) => Rule.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({ name: "footerTitol", title: "Peu - Títol", type: "string" }),
    defineField({ name: "footerDescripcio", title: "Peu - Descripció", type: "text", rows: 2 }),
    defineField({ name: "footerEmail", title: "Email contacte", type: "string" }),
    defineField({
      name: "footerLinks",
      title: "Enllaços del peu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "href", title: "Enllaç", type: "string", validation: (Rule) => Rule.required() },
            { name: "label", title: "Text", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Configuració del lloc" }) },
});
