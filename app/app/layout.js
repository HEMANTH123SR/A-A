"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";

import Nav from "@/app/components/Nav";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [hamBurgerState, setHamBurgerState] = useState(false);
  return (
    <html lang="en">
    
      <body className={inter.className}>
        <Nav setHamBurgerState={setHamBurgerState} />
        <div className="relative">
          {children}
          <HamburgerMenu
            hamBurgerState={hamBurgerState}
            setHamBurgerState={setHamBurgerState}
          />
        </div>
        <hr className="h-1 bg-teal-600" />
        <Footer />
      </body>
    </html>
  );
}




