import { getCliClient } from "sanity/cli";

const client = getCliClient();

const PAGINES = [
  { title: "Inici", slug: "inici" },
  { title: "Proposta Educativa", slug: "proposta-educativa" },
  { title: "PEA", slug: "pea" },
  { title: "Simbologia", slug: "simbologia" },
  { title: "Més Info", slug: "mes-info" },
  { title: "CASTORS (6-7)", slug: "castors" },
  { title: "Llops (7-8)", slug: "llops" },
  { title: "RANGERS (11-12)", slug: "rangers" },
  { title: "PIONERS (12-13)", slug: "pioners" },
  { title: "TRUC I (15-16)", slug: "truc-1" },
  { title: "TRUC II (17-18)", slug: "truc-2" },
  { title: "Organització", slug: "organitzacio" },
  { title: "Caps i Quel·les", slug: "caps-i-queles" },
  { title: "Equips i Càrrecs", slug: "equips-i-carrecs" },
  { title: "Contacte", slug: "contacte" },
  { title: "Vine a dormir", slug: "lloguer" },
];

async function seedPagines() {
  console.log("Creant pàgines de contingut buides (si no existeixen)...\n");

  for (const pagina of PAGINES) {
    const existing = await client.fetch(`*[_type == "paginaContingut" && slug == $slug][0]`, { slug: pagina.slug });
    
    if (!existing) {
      await client.create({
        _type: "paginaContingut",
        title: pagina.title,
        slug: pagina.slug,
        body: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                marks: [],
                text: "Benvinguts a la pàgina de " + pagina.title + ". Pots editar aquest text des del panell de Sanity.",
              },
            ],
          },
        ],
      });
      console.log(`✓ Creada: ${pagina.title}`);
    } else {
      console.log(`- Ja existeix: ${pagina.title}`);
    }
  }

  console.log("\n✅ Fi! Ara pots veure i editar totes les pàgines a l'Studio.");
}

seedPagines().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
