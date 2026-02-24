import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AEIG Nostra Dona de la Salut",
  description: "Lloc web de l'AEIG Nostra Dona de la Salut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={outfit.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
