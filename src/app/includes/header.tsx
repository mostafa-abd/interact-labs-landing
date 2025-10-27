'use client'

import Image from "next/image";
import Logo from '../assets/images/Logo.svg'
import {ShoppingCart} from "lucide-react"
import { useLanguage } from "../context/LanguageContext";
import HeaderClient from "../components/HeaderClient";
export default function Header() {
  const { language, toggleLanguage } = useLanguage()

  return (
   <header>
    <div className="logo">
        <Image
        src={Logo}
        alt="Interact Labs logo"
        priority
        />
        </div>
        <HeaderClient />

   </header>
  );
}
