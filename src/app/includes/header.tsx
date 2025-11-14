import Image from 'next/image';
import Logo from '../assets/images/Logo.svg';
import HeaderClient from '../components/HeaderClient';

export default function Header() {
  return (
    <header>
      <div className="logo" style={{ position: 'relative', width: 150, height: 50 }}>
        <Image src={Logo} alt="Interact Labs logo" fill style={{ objectFit: 'contain' }} />
      </div>

      <HeaderClient />
    </header>
  );
}
