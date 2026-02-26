import { defineField, defineType } from "sanity";

export const paginaContingut = defineType({
  name: "paginaContingut",
  title: "Pàgina de contingut",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Títol de la pàgina",
      type: "string",
      description: "Ex: Proposta Educativa, PEA, Simbologia...",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador",
      type: "string",
      description:
        "Identificador únic per enllaçar amb la web (ex: proposta-educativa, pea, simbologia)",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Inici", value: "inici" },
          { title: "Proposta Educativa", value: "proposta-educativa" },
          { title: "PEA", value: "pea" },
          { title: "Simbologia", value: "simbologia" },
          { title: "Més Info (Agrupament)", value: "mes-info" },
          { title: "CASTORS (6-7)", value: "castors" },
          { title: "Llops (7-8)", value: "llops" },
          { title: "RANGERS (11-12)", value: "rangers" },
          { title: "PIONERS (12-13)", value: "pioners" },
          { title: "TRUC I (15-16)", value: "truc-1" },
          { title: "TRUC II (17-18)", value: "truc-2" },
          { title: "Organització (Consell)", value: "organitzacio" },
          { title: "Caps i Quel·les", value: "caps-i-queles" },
          { title: "Equips i Càrrecs", value: "equips-i-carrecs" },
          { title: "Contacte", value: "contacte" },
          { title: "Vine a dormir (Lloguer)", value: "lloguer" },
        ],
      },
    }),
    defineField({
      name: "body",
      title: "Contingut",
      type: "array",
      description: "El text i les imatges de la pàgina",
      of: [
        { type: "block" },
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
    select: { title: "title", slug: "slug" },
    prepare({ title, slug }) {
      return {
        title: title || "Sense títol",
        subtitle: slug ? `/${slug}` : "",
      };
    },
  },
});
