import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 60; // Força revalidació (ISR) cada 60s per a TOTES les pàgines d'aquesta part de la web

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
