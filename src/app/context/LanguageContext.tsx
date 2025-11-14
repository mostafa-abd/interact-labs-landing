'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Inter, Almarai } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
    display: "swap",

});

const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
    display: "swap",

});

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  isAr: boolean;
  currentFont: string; 
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));

  const isAr = language === 'ar';
  const currentFont = isAr ? almarai.variable : inter.variable;

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.body.className = `${currentFont} antialiased`;
  }, [isAr, currentFont]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isAr, currentFont }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
