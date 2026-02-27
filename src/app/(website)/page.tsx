import HeroCarousel from "@/components/HeroCarousel";
import CounterSection from "@/components/CounterSection";
import NavCards from "@/components/NavCards";
import { client } from "../../../sanity/lib/client";
import { paginaIniciQuery } from "../../../sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const data = await client.fetch(paginaIniciQuery);
  return (
    <div>
      <HeroCarousel heroTitle={data?.heroTitle} heroSlides={data?.heroSlides} />
      <CounterSection stats={data?.counterStats} />
      <NavCards titol={data?.navCardsTitol} cards={data?.navCards} />
    </div>
  );
}
