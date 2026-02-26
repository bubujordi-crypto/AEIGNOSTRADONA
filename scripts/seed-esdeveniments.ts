/**
 * Script per afegir més esdeveniments d'exemple amb text llarg i imatges.
 * Executa: npx sanity exec scripts/seed-esdeveniments.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, { filename });
    return asset._id;
  } catch (e) {
    console.warn(`  (No s'ha pogut pujar la imatge ${filename})`);
    return null;
  }
}

const ESDVENIMENTS: Array<{
  _id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  imageUrl?: string;
  galeriaUrls?: string[];
}> = [
  {
    _id: "esdeveniment-quinto-2025",
    title: "Quinto de Tardor 2025",
    slug: "quinto-tardor-2025",
    date: "2025-10-25",
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    galeriaUrls: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80"
    ],
    description: `El passat cap de setmana vam viure una de les activitats més esperades de la temporada: el Quinto de Tardor. Gairebé un centenar de nois i noies de totes les unitats es van reunir al bosc per gaudir dels colors de la tardor i de tres dies plens de jocs, cançons i amistat.

El dissabte al matí vam començar amb una gimcana per equips que ens va portar a descobrir els racons més bonics del parc. A la tarda, les Llid van preparar un tall de manualitats amb fulles seques i les Rúnics van organitzar el clàssic joc del captura-bandera que sempre fa les delícies dels més grans. Les CILL van passar la tarda fent castells de fusta i construint cabanes.

El diumenge va ser el dia del gran joc de rol: tot l'agrupament va participar d'una aventura èpica amb pirates, tresors amagats i proves de destresa. Al migdia vam gaudir d'un dinar compartit sota els arbres, i abans de marxar vam fer el cercle final amb les cançons de sempre. Gràcies a totes les families per fer-ho possible i als monitors i monitorèsses per la feina titànica. Fins la propera!`,
  },
  {
    _id: "esdeveniment-buti-2025",
    title: "Buti de Nadal 2025",
    slug: "buti-nadal-2025",
    date: "2025-12-28",
    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a043?w=800&q=80",
    description: `Com cada any, el Buti de Nadal ha estat un dels moments més màgics de la temporada. Durant tres dies, el Cau s'ha omplert de llum, rialles i l'esperit nadalenc que només l'escoltisme sap crear.

El primer dia vam rebre els nois i noies amb una cerimònia d'acollida al pati, amb els caps disfressats de reis d'Orient. Després del sopar, cadascuna de les unitats va presentar la seva actuació: les CILL van cantar nadales tradicionals, les Llid van fer un ball coreografiat, les Rúnics van representar un pessebre vivent molt divertit i els Pioners van tancar amb un número de circ que ens va deixar amb la boca oberta.

El segon dia vam tenir la gran festa de cap d'any escolta: menjar especial, jocs per tot el Cau, i a la mitjanit (les deu per als més petits!) el compte enrere amb cava de most i confetti. Els caps van llegir els propòsits de l'agrupament per al nou any i vam plantar un arbre simbòlic al jardí.

L'últim dia, abans de les families, vam fer l'eucaristia de Nadal i el repartiment de records. Moltes gràcies a tothom: als nois i noies per l'energia i la il·lusió, a les families per la confiança i als monitors per deixar-se la pell. Bon any a tots!`,
  },
  {
    _id: "esdeveniment-campament-estiu-2025",
    title: "Campament d'Estiu 2025 - Vall de Núria",
    slug: "campament-estiu-2025",
    date: "2025-07-15",
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
    description: `El campament d'estiu a la Vall de Núria ha estat, sense dubte, l'aventura de l'any. Quinze dies de muntanya, natura, amistat i descobriments que els nois i noies recordaran tota la vida.

La primera setmana la vam dedicar a conèixer el territori: excursions diàries per diferents senders, des del camí fins a les fonts naturals fins a l'ascensió al Puigmal per als més grans. Cada unitat tenia el seu propi pla d'activitats adaptat a l'edat: les CILL feien jocs curts i descobriments del bosc, les Llid s'iniciaven en l'orientació, els Rúnics feien rutes de mitja muntanya i els Pioners van preparar una pernoctada sota les estrelles en un refugi no custodiat.

La segona setmana vam apostar pels projectes en equip: construcció de cabanes, tallers de cuina de camp, preparació d'una gran gimcana per a tot l'agrupament i la festa final amb representacions de cada unitat. El dijous va ser el dia de la marxa llarga: vuit hores de camí fins a un mirador espectacular on vam fer el dinar i les reflexions de tancament.

Volem agrair a totes les famílies la confiança dipositada en nosaltres, i als monitors i monitorèsses la dedicació absoluta durant dues setmanes. La Vall de Núria ens ha acollit amb generositat i esperem tornar aviat. Fins al proper campament!`,
  },
  {
    _id: "esdeveniment-jornada-portes-obertes-2025",
    title: "Jornada de Portes Obertes 2025",
    slug: "portes-obertes-2025",
    date: "2025-02-08",
    imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
    description: `El diumenge 8 de febrer vam obrir les portes del Cau a tots els que van voler conèixer de primera mà què és l'escoltisme i què fem a l'AEIG Nostra Dona de la Salut. La jornada va ser un èxit rotund: més de setanta famílies van passar pel nostre espai per veure les instal·lacions, parlar amb els monitors i descobrir les activitats que oferim.

Al matí vam començar amb una visita guiada pel Cau: les sales d'activitats, el pati, les zones de joc i els espais on els nois i noies viuen les seves aventures setmanalment. Les unitats van preparar tallers oberts: les CILL van fer manualitats, les Llid van mostrar jocs tradicionals, els Rúnics van fer una demostració d'orientació amb bussola i els Pioners van organitzar un parcurs d'aventura al jardí.

A migdia vam oferir un aperitiu per a tots els assistents i vam tenir temps per respondre preguntes sobre inscripcions, calendari d'activitats i la metodologia escolta. Moltes famílies es van interessar especialment pels campaments i per les sortides de cap de setmana.

A la tarda vam tancar amb una activitat conjunta: un gran joc per equips mixtos on petits i grans van participar junts. L'ambient va ser fantàstic i esperem que molts dels visitants es sumin a la nostra gran família. Gràcies a tots els que heu fet possible aquesta jornada!`,
  },
  {
    _id: "esdeveniment-ruta-sant-jordi-2025",
    title: "Ruta de Sant Jordi pel Collserola 2025",
    slug: "ruta-sant-jordi-2025",
    date: "2025-04-20",
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
    description: `Sant Jordi és una diada especial per a tots els catalans, i nosaltres la vam celebrar amb una ruta conjunta pel parc de Collserola. Un total de vuitanta escoltes van enfilar-se les sabates de muntanya i van disposar-se a recórrer els senders més bonics de la serralada.

La ruta, de dificultat mitjana i adaptada a totes les edats, va començar a les nou del matí des del Turó de la Magarola. Les unitats anaven separades per grups d'edat però amb punts de trobada comuns on tots ens creuàvem i compartíem impressions. El temps va acompanyar: sol, una brisa lleu i temperatures perfectes per caminar.

A mig camí vam fer una parada per menjar i per l'activitat de Sant Jordi: cada unitat havia preparat una llegenda o conte relacionat amb el patró de Catalunya, i les van representar en ple bosc. Va ser molt emotiu veure com els més petits explicaven la història del drac i com els grans la reinterpretaven amb humor.

Arribats al destí final, vam fer el cercle de tancament i vam repartir roses i llibrets a tots els participants, en record d'aquest Sant Jordi tan especial. Moltes gràcies als monitors per la logística i a les famílies per confiar-nos els nois i noies en un dia tan significatiu. Fins la propera ruta!`,
  },
];

async function seedEsdeveniments() {
  console.log("Afegint esdeveniments d'exemple amb text llarg i imatges...\n");

  for (const e of ESDVENIMENTS) {
    let mainImage: { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined;
    if (e.imageUrl) {
      const assetId = await uploadImageFromUrl(e.imageUrl, `${e.slug}.jpg`);
      if (assetId) {
        mainImage = { _type: "image", asset: { _type: "reference", _ref: assetId } };
      }
    }

    let galeria: Array<{ _type: "image"; _key: string; asset: { _type: "reference"; _ref: string } }> = [];
    if (e.galeriaUrls && e.galeriaUrls.length > 0) {
      for (let i = 0; i < e.galeriaUrls.length; i++) {
        const url = e.galeriaUrls[i];
        const assetId = await uploadImageFromUrl(url, `${e.slug}-galeria-${i}.jpg`);
        if (assetId) {
          galeria.push({
            _type: "image",
            _key: `img-${i}-${Date.now()}`,
            asset: { _type: "reference", _ref: assetId }
          });
        }
      }
    }

    await client.createOrReplace({
      _type: "esdeveniment",
      _id: e._id,
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      date: e.date,
      description: e.description,
      ...(mainImage && { mainImage }),
      ...(galeria.length > 0 && { galeria }),
    });
    console.log(`✓ Creat: ${e.title}`);
  }

  console.log("\n✅ Fi! Ara pots veure els esdeveniments a /esdeveniments");
}

seedEsdeveniments().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
