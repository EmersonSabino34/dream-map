import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive-murais.css";
import "./mural.css";
import "./animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dream Map - Transforme sonhos em metas",
  description: "Crie seu mapa de visualização com fotos dos seus sonhos e objetivos. Transforme sonhos em metas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="app-header">
          <a href="/">
            <img src="/assets/logo/logo1.png" alt="Sonhos - logo" className="app-logo" />
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}