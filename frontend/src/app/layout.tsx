import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./components/AuthButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MIRAC - Smart Monitoring of Catalan Rivers",
  description: "Monitoratge Intel·ligent de Rius i Aigües Catalanes",
  icons: {
    icon: '/Logo_MIRAC.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <div className="nav-logo">
            <Link href="/">
              <Image 
                src="/Logo.png" 
                alt="MIRAC Logo" 
                width={140} 
                height={35} 
                style={{ objectFit: "contain", width: "auto", height: "35px" }}
              />
            </Link>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/press">Press</Link>
          </div>
          <AuthButton />
        </nav>
        <main className="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}
