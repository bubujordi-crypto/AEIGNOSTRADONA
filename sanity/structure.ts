import type { StructureResolver } from "sanity/structure";
import TutorialPane from "./components/TutorialPane";

// Estructura per al panell: Tutorial + totes les seccions editables
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contingut")
    .items([
      // Tutorial - primer per ajudar usuaris nous
      S.listItem()
        .title("📖 Tutorial")
        .id("tutorial")
        .child(
          S.component(TutorialPane).title("Com editar el contingut").id("tutorial-pane")
        ),
      
      S.divider(),

      // Configuració global i pàgina d'inici
      S.listItem()
        .title("⚙️ Configuració del lloc")
        .id("configuracio-lloc")
        .child(
          S.document()
            .schemaType("configuracioLloc")
            .documentId("configuracio-lloc")
            .title("Menú i footer")
        ),
      S.listItem()
        .title("🏠 Pàgina d'inici (hero, comptador, targetes)")
        .id("pagina-inici")
        .child(
          S.document()
            .schemaType("paginaInici")
            .documentId("pagina-inici")
            .title("Pàgina d'inici")
        ),
      S.listItem()
        .title("📋 Llista d'unitats")
        .id("llista-unitats")
        .child(
          S.document()
            .schemaType("llistaUnitats")
            .documentId("llista-unitats")
            .title("Targetes d'unitats")
        ),

      S.divider(),

      // Seccions principals
      S.listItem()
        .title("Pàgina d'Inici (contingut)")
        .id("inici")
        .child(
          S.document()
            .schemaType("paginaContingut")
            .documentId("paginaContingut-inici")
            .title("Inici")
        ),
        
      S.listItem()
        .title("Esdeveniments i notícies")
        .schemaType("esdeveniment")
        .id("esdeveniment")
        .child(
          S.documentTypeList("esdeveniment")
            .title("Esdeveniments")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
        
      S.listItem()
        .title("Galeria de fotos")
        .schemaType("fotoGaleria")
        .id("fotoGaleria")
        .child(
          S.documentTypeList("fotoGaleria")
            .title("Fotos")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),

      S.divider(),

      // Menú: L'Agrupament
      S.listItem()
        .title("L'Agrupament")
        .id("agrupament-menu")
        .child(
          S.list()
            .title("L'Agrupament")
            .items([
              S.listItem()
                .title("Història de l'agrupament")
                .schemaType("entradaHistoria")
                .child(
                  S.documentTypeList("entradaHistoria")
                    .title("Entrades d'història")
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Proposta Educativa")
                .child(S.document().schemaType("paginaContingut").documentId("paginaContingut-proposta-educativa").title("Proposta Educativa")),
              S.listItem()
                .title("PEA")
                .child(S.document().schemaType("paginaContingut").documentId("paginaContingut-pea").title("PEA")),
              S.listItem()
                .title("Simbologia")
                .child(S.document().schemaType("paginaContingut").documentId("paginaContingut-simbologia").title("Simbologia")),
              S.listItem()
                .title("Més Info")
                .child(S.document().schemaType("paginaContingut").documentId("paginaContingut-mes-info").title("Més Info")),
            ])
        ),

      // Menú: Unitats
      S.listItem()
        .title("Unitats")
        .id("unitats-menu")
        .child(
          S.list()
            .title("Unitats")
            .items([
              S.listItem().title("CASTORS (6-7)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-castors").title("Castors")),
              S.listItem().title("Llops (7-8)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-llops").title("Llops")),
              S.listItem().title("RANGERS (11-12)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-rangers").title("Rangers")),
              S.listItem().title("PIONERS (12-13)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-pioners").title("Pioners")),
              S.listItem().title("TRUC I (15-16)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-truc-1").title("Truc I")),
              S.listItem().title("TRUC II (17-18)").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-truc-2").title("Truc II")),
            ])
        ),

      // Menú: Consell
      S.listItem()
        .title("Consell")
        .id("consell-menu")
        .child(
          S.list()
            .title("Consell")
            .items([
              S.listItem().title("Organització").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-organitzacio").title("Organització")),
              S.listItem().title("Caps i Quel·les").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-caps-i-queles").title("Caps i Quel·les")),
              S.listItem().title("Equips i Càrrecs").child(S.document().schemaType("paginaContingut").documentId("paginaContingut-equips-i-carrecs").title("Equips i Càrrecs")),
            ])
        ),

      S.divider(),

      // Altres pàgines
      S.listItem()
        .title("Contacte")
        .id("contacte")
        .child(
          S.document()
            .schemaType("paginaContingut")
            .documentId("paginaContingut-contacte")
            .title("Contacte")
        ),
        
      S.listItem()
        .title("Vine a dormir (Lloguer)")
        .id("lloguer")
        .child(
          S.document()
            .schemaType("paginaContingut")
            .documentId("paginaContingut-lloguer")
            .title("Vine a dormir")
        ),
        
      // Deixem un llistat genèric amagat al final per si es creen pàgines noves no llistades adalt
      S.divider(),
      S.listItem()
        .title("Totes les pàgines (Avançat)")
        .schemaType("paginaContingut")
        .id("paginaContingut-all")
        .child(
          S.documentTypeList("paginaContingut")
            .title("Totes les Pàgines")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
    ]);
