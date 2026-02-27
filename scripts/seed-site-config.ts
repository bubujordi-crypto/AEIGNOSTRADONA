/**
 * Script per crear documents inicials de configuració del lloc, pàgina d'inici i llista d'unitats.
 * Executa: npx sanity exec scripts/seed-site-config.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function uploadImageFromUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, { filename: url.split("/").pop() || "image.jpg" });
    return asset._id;
  } catch (e) {
    console.warn("  (No s'ha pogut pujar la imatge)");
    return null;
  }
}

async function seedSiteConfig() {
  console.log("Plantant configuració del lloc, pàgina d'inici i llista d'unitats...\n");

  // 1. Configuració del lloc (menú + footer)
  await client.createOrReplace({
    _type: "configuracioLloc",
    _id: "configuracio-lloc",
    navLinks: [
      { _key: "1", href: "/", label: "INICI", children: [] },
      {
        _key: "2",
        href: "/agrupament",
        label: "L'AGRUPAMENT",
        children: [
          { _key: "a1", href: "/agrupament/historia", label: "Història" },
          { _key: "a2", href: "/agrupament/proposta-educativa", label: "Proposta Educativa" },
          { _key: "a3", href: "/agrupament/pea", label: "PEA" },
          { _key: "a4", href: "/agrupament/simbologia", label: "Simbologia" },
          { _key: "a5", href: "/agrupament/mes-info", label: "Més Info" },
        ],
      },
      {
        _key: "3",
        href: "/unitats",
        label: "UNITATS",
        children: [
          { _key: "u1", href: "/unitats/castors", label: "CASTORS (6-7)" },
          { _key: "u2", href: "/unitats/llops", label: "Llops (7-8)" },
          { _key: "u3", href: "/unitats/rangers", label: "RANGERS (11-12)" },
          { _key: "u4", href: "/unitats/pioners", label: "PIONERS (12-13)" },
          { _key: "u5", href: "/unitats/truc-1", label: "TRUC I (15-16)" },
          { _key: "u6", href: "/unitats/truc-2", label: "TRUC II (17-18)" },
        ],
      },
      {
        _key: "4",
        href: "/consell",
        label: "CONSELL",
        children: [
          { _key: "c1", href: "/consell/organitzacio", label: "Organització" },
          { _key: "c2", href: "/consell/caps-i-queles", label: "Caps i Quel·les" },
          { _key: "c3", href: "/consell/equips-i-carrecs", label: "Equips i Càrrecs" },
        ],
      },
      { _key: "5", href: "/esdeveniments", label: "ESDEVENIMENTS", children: [] },
      { _key: "6", href: "/galeria", label: "GALERIA", children: [] },
      { _key: "7", href: "/lloguer", label: "VINE A DORMIR", children: [] },
      { _key: "8", href: "/contacte", label: "CONTACTE", children: [] },
    ],
    footerTitol: "AEIG Nostra Dona de la Salut",
    footerDescripcio: "AEIG Nostra Dona de la Salut",
    footerEmail: "albergueria.nostradonadelasalut@escoltesiguies.cat",
    footerLinks: [
      { _key: "1", href: "/agrupament", label: "L'Agrupament" },
      { _key: "2", href: "/unitats", label: "Unitats" },
      { _key: "3", href: "/lloguer", label: "Vine a dormir" },
      { _key: "4", href: "/contacte", label: "Contacte" },
    ],
  });
  console.log("✓ Configuració del lloc creada");

  // 2. Pàgina d'inici (hero, comptador, targetes)
  const heroUrls = [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80",
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&q=80",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1920&q=80",
  ];
  const heroSlides: Array<{ _key: string; _type: string; asset: { _type: string; _ref: string }; alt?: string }> = [];
  for (let i = 0; i < heroUrls.length; i++) {
    const assetId = await uploadImageFromUrl(heroUrls[i]);
    if (assetId) heroSlides.push({ _key: `h${i}`, _type: "image", asset: { _type: "reference", _ref: assetId }, alt: "Imatge del hero" });
  }

  const navCardsUrls = [
    { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80", href: "/agrupament", title: "AGRUPAMENT", subtitle: "Coneix la nostra història i proposta educativa" },
    { url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&q=80", href: "/esdeveniments", title: "NOTÍCIES / ESDEVENIMENTS", subtitle: "Últimes novetats i esdeveniments" },
    { url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80", href: "/unitats", title: "UNITATS", subtitle: "CILL (6-8), LLID, RÚNICS, PIONERS, CLI..." },
  ];
  const navCards: Array<{ _key: string; href: string; title: string; subtitle: string; image?: { _type: string; asset: { _type: string; _ref: string }; alt?: string } }> = [];
  for (let i = 0; i < navCardsUrls.length; i++) {
    const c = navCardsUrls[i];
    const assetId = await uploadImageFromUrl(c.url);
    const card: (typeof navCards)[0] = { _key: `c${i}`, href: c.href, title: c.title, subtitle: c.subtitle };
    if (assetId) card.image = { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: c.title };
    navCards.push(card);
  }

  await client.createOrReplace({
    _type: "paginaInici",
    _id: "pagina-inici",
    heroTitle: "FOTOS AMB LLEI ESCOLTA QUE VAN RULANDO",
    heroSlides: heroSlides.length > 0 ? heroSlides : undefined,
    counterStats: [
      { _key: "1", value: 120, label: "Nens i nenes" },
      { _key: "2", value: 25, label: "Caps i quel·les" },
      { _key: "3", value: 50, label: "Anys d'història" },
    ],
    navCardsTitol: "Descobreix l'Agrupament",
    navCards,
  });
  console.log("✓ Pàgina d'inici creada");

  // 3. Llista d'unitats
  await client.createOrReplace({
    _type: "llistaUnitats",
    _id: "llista-unitats",
    titol: "Les nostres Unitats",
    descripcio: "A l'agrupament ens dividim per grups d'edat anomenats unitats. Cadascuna té una pedagogia i activitats adaptades al seu moment vital.",
    unitats: [
      { _key: "1", slug: "castors", nom: "Castors", edats: "6-7 anys", color: "bg-orange-500", desc: "Els més petits de l'agrupament. Comparteixen i descobreixen." },
      { _key: "2", slug: "llops", nom: "Llops", edats: "7-8 anys", color: "bg-yellow-500", desc: "S'organitzen en estols per aprendre a ser autònoms." },
      { _key: "3", slug: "rangers", nom: "Ràngers", edats: "11-12 anys", color: "bg-blue-600", desc: "Viuen l'aventura i emprenen projectes en patrulles." },
      { _key: "4", slug: "pioners", nom: "Pioners", edats: "12-13 anys", color: "bg-red-600", desc: "Protagonistes del seu destí, descobreixen i transformen." },
      { _key: "5", slug: "truc-1", nom: "TRUC I", edats: "15-16 anys", color: "bg-green-600", desc: "S'enfoquen en el Servei als altres i la consciència social." },
      { _key: "6", slug: "truc-2", nom: "TRUC II", edats: "17-18 anys", color: "bg-green-800", desc: "L'any de l'animació i la preparació per ser futurs caps." },
    ],
  });
  console.log("✓ Llista d'unitats creada");

  console.log("\n✅ Fi! Ara pots obrir el Studio i editar la configuració, la pàgina d'inici i les unitats.");
}

seedSiteConfig().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
