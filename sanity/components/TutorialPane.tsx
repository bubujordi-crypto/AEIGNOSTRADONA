"use client";

import { Card, Heading, Text, Box, Flex, Stack } from "@sanity/ui";
import React from "react";

const sections = [
  {
    title: "1. Tria què vols editar",
    text: "A la barra lateral esquerra veuràs les seccions: Esdeveniments, Galeria, Història, etc. Fes clic a la que vulguis modificar.",
  },
  {
    title: "2. Crea un document nou o edita un existent",
    text: "Dins de cada secció hi ha una llista de documents. Per crear un de nou, prem el botó «Crear» (o el +). Per editar un existent, fes-hi clic.",
  },
  {
    title: "3. Omple els camps",
    text: "Cada camp té un títol i sovint una descripció que t’ajuda. Els camps amb un * són obligatoris. Per les imatges, arrossega una foto o prem per pujar-la.",
  },
  {
    title: "4. Camp URL (Slug)",
    text: "Quan escrius el títol, prem el botó «Generate» al camp URL per crear-lo automàticament. No cal que el canviïs.",
  },
  {
    title: "5. Desa els canvis",
    text: "Sanity desa automàticament quan escrius. Per publicar els canvis a la web, prem «Publish» (Publicar) quan hagis acabat. Si tanques sense publicar, els canvis queden com a esborrany.",
  },
  {
    title: "6. Necessites ajuda?",
    text: "Si tens dubtes, contacta amb l’administrador del projecte. Pots tornar a aquest tutorial en qualsevol moment des del menú lateral.",
  },
];

export default function TutorialPane() {
  return (
    <Box padding={4} style={{ maxWidth: 600 }}>
      <Stack space={5}>
        <Heading size={2}>Tutorial: Com editar el contingut</Heading>
        <Text size={2} muted>
          Aquest editor et permet modificar el contingut de la web sense necessitat de coneixements tècnics. Segueix aquests passos bàsics:
        </Text>

        {sections.map((section, i) => (
          <Card key={i} padding={4} radius={2} shadow={1} tone="transparent">
            <Stack space={2}>
              <Heading size={1}>{section.title}</Heading>
              <Text size={1}>{section.text}</Text>
            </Stack>
          </Card>
        ))}

        <Card padding={4} radius={2} tone="primary">
          <Text size={1} weight="semibold">
            Consell: Desa sovint i publica quan tinguis el contingut llest. Els visitants de la web només veuran el que hagis publicat.
          </Text>
        </Card>
      </Stack>
    </Box>
  );
}
