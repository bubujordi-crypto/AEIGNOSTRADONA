import { defineField, defineType } from "sanity";

export const paginaInici = defineType({
  name: "paginaInici",
  title: "Pàgina d'inici",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Títol del hero", type: "string" }),
    defineField({
      name: "heroSlides",
      title: "Imatges del carrusel",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Descripció de la imatge", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "counterStats",
      title: "Estadístiques del comptador",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Valor numèric", type: "number", validation: (Rule) => Rule.required() },
            { name: "label", title: "Etiqueta", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({ name: "navCardsTitol", title: "Títol de la secció de targetes", type: "string" }),
    defineField({
      name: "navCards",
      title: "Targetes de navegació",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "href", title: "Enllaç (ex: /unitats)", type: "string", validation: (Rule) => Rule.required() },
            { name: "title", title: "Títol", type: "string", validation: (Rule) => Rule.required() },
            { name: "subtitle", title: "Subtítol", type: "string" },
            {
              name: "image",
              title: "Imatge",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Descripció de la imatge", type: "string" }],
            },
          ],
        },
      ],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Pàgina d'inici" }) },
});
