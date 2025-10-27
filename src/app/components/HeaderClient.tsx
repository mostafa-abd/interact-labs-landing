'use client'
import { useLanguage } from '../context/LanguageContext'
import { ShoppingCart } from 'lucide-react'

export default function HeaderClient() {
  const { language, toggleLanguage } = useLanguage()
  return (
    <div className="header-icons">
      <ShoppingCart />
      <div onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
        <span>{language === 'ar' ? 'Ar' : 'En'}</span>
      </div>
    </div>
  )
}
