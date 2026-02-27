import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "../../../sanity/lib/client";
import { configuracioLlocQuery } from "../../../sanity/lib/queries";

export const revalidate = 60;

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await client.fetch(configuracioLlocQuery);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navLinks={config?.navLinks} />
      <main className="flex-1">{children}</main>
      <Footer
        titol={config?.footerTitol}
        descripcio={config?.footerDescripcio}
        email={config?.footerEmail}
        enllaços={config?.footerLinks}
      />
    </div>
  );
}
