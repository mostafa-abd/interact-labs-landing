'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Inter, Tajawal } from 'next/font/google';

// ✅ استيراد الخطوط
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  isAr: boolean;
  currentFont: string; // ✅ هنا هنحفظ اسم الخط الحالي
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));

  const isAr = language === 'ar';
  const currentFont = isAr ? tajawal.variable : inter.variable;

  // ✅ نحدّث اتجاه الصفحة والخط عند تغيير اللغة
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
