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
      S.listItem()
        .title("Història de l'agrupament")
        .schemaType("entradaHistoria")
        .id("entradaHistoria")
        .child(
          S.documentTypeList("entradaHistoria")
            .title("Entrades d'història")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Pàgines de contingut")
        .schemaType("paginaContingut")
        .id("paginaContingut")
        .child(
          S.documentTypeList("paginaContingut")
            .title("Pàgines")
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
    ]);
