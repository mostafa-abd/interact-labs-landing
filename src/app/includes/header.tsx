'use client'

import Image from "next/image";
import Logo from '../assets/images/Logo.svg'
import { ShoppingCart } from "lucide-react"
import { useLanguage } from "../context/LanguageContext";
import HeaderClient from "../components/HeaderClient";

export default function Header() {
const { language, toggleLanguage } = useLanguage() as any;


  return (
    <header >
      <div className="logo" style={{ position: "relative", width: 150, height: 50 }}>
        <Image
          src={Logo}
          alt="Interact Labs logo"
          fill
          style={{ objectFit: "contain" }}
          
        />
      </div>

      <HeaderClient />
    </header>
  );
}
