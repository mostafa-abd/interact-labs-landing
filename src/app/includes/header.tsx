import Image from "next/image";
import Logo from '../assets/images/Logo.svg'
import {} from "lucide-react"
export default function Header() {
  return (
   <header>
    <div className="logo">
        <Image
        src={Logo}
        alt="Interact Labs logo"
        priority
        />
        </div>
    <div className="header-icons">
        <ShoppingCart />
    </div>
   </header>
  );
}
