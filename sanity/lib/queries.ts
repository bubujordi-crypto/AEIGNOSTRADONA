export const esdevenimentsQuery = `*[_type == "esdeveniment"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  mainImage,
  description
}`;

export const fotosGaleriaQuery = `*[_type == "fotoGaleria"] | order(date desc) {
  _id,
  title,
  image,
  category,
  date
}`;
