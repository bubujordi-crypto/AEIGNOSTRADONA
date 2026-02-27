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

const PAGINES = [
  { 
    title: "Proposta Educativa", 
    slug: "proposta-educativa",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    text: "La nostra proposta educativa es basa en el mètode escolta. Fomentem el creixement personal, l'esperit crític i el compromís amb la societat i la natura mitjançant el joc, la vida en petits grups i l'assumpció de responsabilitats adaptades a cada edat."
  },
  { 
    title: "PEA", 
    slug: "pea",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    text: "El Projecte Educatiu d'Agrupament (PEA) és el document que defineix la nostra línia pedagògica i d'actuació. S'actualitza periòdicament per adaptar-nos a les noves realitats i necessitats dels infants i joves, establint objectius clars per a cada curs."
  },
  { 
    title: "Simbologia", 
    slug: "simbologia",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    text: "Els símbols són una part fonamental de la nostra identitat. El fulard, que duem al coll, representa el nostre compromís. La camisa, amb els colors de cada unitat, ens identifica. El logotip de l'agrupament és el nostre emblema comú."
  },
  { 
    title: "Més Info", 
    slug: "mes-info",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    text: "L'AEIG Nostra Dona de la Salut forma part de Minyons Escoltes i Guies de Catalunya (MEG). Ens trobem tots els dissabtes a la tarda al nostre local per fer el Cau. Realitzem sortides de cap de setmana cada trimestre i un gran campament a l'estiu."
  },
  { 
    title: "CASTORS (6-7)", 
    slug: "castors",
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80",
    text: "Els Castors i Llúdrigues (6-7 anys) són els més petits de l'agrupament. La seva pedagogia es basa en compartir i descobrir l'entorn. Treballen junts per construir la 'Presa', aprenent a conviure i a respectar la natura jugant."
  },
  { 
    title: "Llops (7-8)", 
    slug: "llops",
    imageUrl: "https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?w=800&q=80",
    text: "Els Llops i Daines (8-11 anys) s'organitzen en petits grups anomenats estols o esbarts. La seva història motivadora és 'El Llibre de la Selva'. Aprenen a ser autònoms, a prendre petites decisions i a fer sempre 'el millor possible'."
  },
  { 
    title: "RANGERS (11-12)", 
    slug: "rangers",
    imageUrl: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80",
    text: "Els Ràngers i Noies Guia (11-14 anys) viuen la gran aventura. S'organitzen en patrulles on cadascú té un càrrec (secretari, tresorer, material...). Emprenen projectes i expedicions on la responsabilitat individual és clau per l'èxit de l'equip."
  },
  { 
    title: "PIONERS (12-13)", 
    slug: "pioners",
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
    text: "Els Pioners i Caravel·les (14-17 anys) són els protagonistes del seu propi destí. A través dels 'Empreses' (projectes escollits, preparats i avaluats per ells mateixos), descobreixen el món, es qüestionen la societat i aprenen a transformar-la."
  },
  { 
    title: "TRUC I (15-16)", 
    slug: "truc-1",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    text: "La branca TRUC (17-19 anys) és l'etapa final com a educands. S'enfoquen en el Servei als altres. El TRUC 1 està pensat per començar a prendre consciència social, descobrir realitats externes a l'agrupament i dissenyar rutes solidàries."
  },
  { 
    title: "TRUC II (17-18)", 
    slug: "truc-2",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    text: "El TRUC 2 és l'any de l'animació. Els joves es preparen per fer el pas a ser caps (monitors). Realitzen el seu projecte personal de servei dins o fora del cau i assumeixen responsabilitats importants dins de l'estructura de l'agrupament."
  },
  { 
    title: "Organització", 
    slug: "organitzacio",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    text: "El Consell d'Agrupament és l'òrgan de decisió on participen tots els caps, quel·les i equip d'agrupament. Ens reunim periòdicament per coordinar les activitats generals, tractar temes pedagògics i assegurar el bon funcionament de l'entitat."
  },
  { 
    title: "Caps i Quel·les", 
    slug: "caps-i-queles",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    text: "L'equip de caps i quel·les (monitors) està format per joves voluntaris compromesos que dediquen el seu temps lliure a educar. Estan formats en l'escoltisme i disposen de la titulació de directors o monitors de lleure."
  },
  { 
    title: "Equips i Càrrecs", 
    slug: "equips-i-carrecs",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    text: "L'Equip d'Agrupament és l'encarregat de la gestió global. Està format pels Caps d'Agrupament, Secretaria, Tresoreria i Material. Treballen per facilitar la feina als caps d'unitat i representar el Cau externament."
  },
  { 
    title: "Contacte", 
    slug: "contacte",
    imageUrl: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80",
    text: "Pots trobar-nos cada dissabte de 16:00 a 18:30 al nostre local. També ens pots escriure a través del formulari o seguir-nos a les nostres xarxes socials per veure què anem fent cap de setmana rere cap de setmana."
  }
];

async function seedPagines() {
  console.log("Repoblant pàgines de contingut amb informació i imatges...\n");

  for (const pagina of PAGINES) {
    let mainImageObj = undefined;
    
    // Upload image if URL is provided
    if (pagina.imageUrl) {
      console.log(`Pujant imatge per a ${pagina.title}...`);
      const assetId = await uploadImageFromUrl(pagina.imageUrl, `${pagina.slug}-cover.jpg`);
      if (assetId) {
        mainImageObj = {
          _key: `img-${Date.now()}`,
          _type: "image",
          asset: { _type: "reference", _ref: assetId }
        };
      }
    }

    // Prepare body content
    const bodyContent: any[] = [
      {
        _key: `block-${Date.now()}`,
        _type: "block",
        style: "normal",
        children: [
          {
            _key: `span-${Date.now()}`,
            _type: "span",
            marks: [],
            text: pagina.text,
          },
        ],
      }
    ];

    // Add image to body if successfully uploaded
    if (mainImageObj) {
      bodyContent.push(mainImageObj);
    }

    // Force replace the document to update it
    const id = `paginaContingut-${pagina.slug}`;
    await client.createOrReplace({
      _type: "paginaContingut",
      _id: id,
      title: pagina.title,
      slug: pagina.slug,
      body: bodyContent,
    });
    
    console.log(`✓ Actualitzada: ${pagina.title}\n`);
  }

  console.log("✅ Fi! Totes les pàgines han estat repoblades amb text i imatges d'alta qualitat.");
}

seedPagines().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
