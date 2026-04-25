import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MIRAC - Smart Monitoring of Catalan Rivers",
  description: "Monitorització Intel·ligent de Rius i Aigües Catalanes",
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
                src="/mirac_logo.png" 
                alt="MIRAC Logo" 
                width={40} 
                height={40} 
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/press">Press</Link>
          </div>
          <Link href="/login" className="btn-primary">
            Login
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </nav>
        <main className="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}
