/**
 * Script per crear documents d'exemple al Studio.
 * Executa: npx sanity exec scripts/seed.ts --with-user-token
 * Usa la teva sessió de Sanity (has d'estar logat amb sanity login)
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function seed() {
  console.log("Plantant documents d'exemple...\n");

  // 1. Esdeveniment d'exemple
  const esdeveniment = await client.createOrReplace({
    _type: "esdeveniment",
    _id: "esdeveniment-beniure-2025",
    title: "Beniure 2025",
    slug: { _type: "slug", current: "beniure-2025" },
    date: "2025-03-15",
    description:
      "El campament de Pasqua a Beniure. Dies de convivència, jocs i natura amb tot l'agrupament.",
  });
  console.log("✓ Esdeveniment creat: Beniure 2025");

  // 2. Entrada d'història d'exemple
  const entradaHistoria = await client.createOrReplace({
    _type: "entradaHistoria",
    _id: "historia-origens",
    title: "Els orígens del nostre agrupament",
    slug: { _type: "slug", current: "origen-agrupament" },
    publishedAt: "2024-01-15",
    excerpt:
      "Com va néixer l'AEIG Nostra Dona de la Salut i qui van ser les primeres persones que van fer-ho possible.",
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "L'agrupament va començar l'any 1985 amb un grup de monitors i monitorèsses que van voler portar l'escoltisme al nostre barri. Des d'aleshores hem crescut molt, però mantenim els mateixos valors de sempre.",
            marks: [],
          },
        ],
      },
    ],
  });
  console.log("✓ Entrada d'història creada: Els orígens del nostre agrupament");

  // 3. Foto de galeria (sense imatge - l'usuari la pot afegir al Studio)
  const fotoGaleria = await client.createOrReplace({
    _type: "fotoGaleria",
    _id: "foto-exemple-1",
    title: "Pujada al Tibidabo",
    category: "Rutes",
    date: "2024-10-20",
  });
  console.log("✓ Foto de galeria creada: Pujada al Tibidabo (afegeix la imatge al Studio)");

  console.log("\n✅ Fi! Ara pots obrir el Studio i veure els documents.");
}

seed().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
