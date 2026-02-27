export const esdevenimentsQuery = `*[_type == "esdeveniment"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  mainImage,
  description
}`;

export const esdevenimentBySlugQuery = `*[_type == "esdeveniment" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  mainImage,
  galeria,
  description
}`;

export const fotosGaleriaQuery = `*[_type == "fotoGaleria"] | order(date desc) {
  _id,
  title,
  image,
  category,
  date
}`;

export const entradesHistoriaQuery = `*[_type == "entradaHistoria"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  body,
  galeria
}`;

export const paginaContingutQuery = `*[_type == "paginaContingut" && slug == $slug][0] {
  _id,
  title,
  slug,
  body
}`;

export const configuracioLlocQuery = `*[_type == "configuracioLloc"][0] {
  navLinks,
  footerTitol,
  footerDescripcio,
  footerEmail,
  footerLinks
}`;

export const paginaIniciQuery = `*[_type == "paginaInici"][0] {
  heroTitle,
  heroSlides,
  counterStats,
  navCardsTitol,
  navCards
}`;

export const llistaUnitatsQuery = `*[_type == "llistaUnitats"][0] {
  titol,
  descripcio,
  unitats
}`;
