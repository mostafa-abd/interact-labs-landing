'use client';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart } from 'lucide-react';

export default function HeaderClient() {
  const langContext = useLanguage();
  const language = langContext?.language ?? 'en';
  const toggleLanguage = langContext?.toggleLanguage ?? (() => {});

  return (
    <div className="header-icons">
      <div onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
        <span>{language === 'ar' ? 'EN' : 'AR'}</span>
      </div>
    </div>
  );
}
