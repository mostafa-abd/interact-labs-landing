'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import type { ReactElement } from 'react';

type Locale = 'en' | 'ar';

interface Product {
  // الحقول الثنائية للغات (اختاري أو أضيفي حسب الـ API)
  brand_en?: string;
  brand_ar?: string;
  color_en?: string;
  color_ar?: string;
  material_en?: string;
  material_ar?: string;
  temperature_range_en?: string;
  temperature_range_ar?: string;
  connectivity_en?: string;
  connectivity_ar?: string;
  product_dimensions_en?: string;
  product_dimensions_ar?: string;
  power_supply_voltage_en?: string;
  power_supply_voltage_ar?: string;
  pen_type_en?: string;
  pen_type_ar?: string;
  pen_color_en?: string;
  pen_color_ar?: string;
  pen_length_en?: string;
  pen_length_ar?: string;

  // أي حقول إضافية من الـ API
  [key: string]: unknown;
}

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props): ReactElement | null {
  const langContext = useLanguage();
  const language: Locale = (langContext?.language as Locale) ?? 'en';
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const pathname = usePathname() ?? '';
  const isTACTPanel = pathname.includes('tact-panel');

  if (isTACTPanel) return null;

  const suffix = language === 'ar' ? '_ar' : '_en';

  // مساعد للوصول للحقل الآمن مع fallback نصي فارغ
  const getField = (base: string): string =>
    String(product[`${base}${suffix}`] ?? '');

  return (
    <section className="product-details" dir={dir}>
      <h1>{language === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</h1>

      <div>
        <h3>{language === 'ar' ? 'العلامة التجارية' : 'Brand Name'}</h3>
        <p>{getField('brand')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'اللون' : 'Color'}</h3>
        <p>{getField('color')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'الخامة' : 'Material'}</h3>
        <p>{getField('material')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'نطاق درجة الحرارة' : 'Temperature Range'}</h3>
        <p>{getField('temperature_range')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'الاتصال' : 'Connectivity'}</h3>
        <p>{getField('connectivity')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'أبعاد المنتج' : 'Product Dimensions'}</h3>
        <p>{getField('product_dimensions')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'جهد التشغيل' : 'Power Supply Voltage'}</h3>
        <p>{getField('power_supply_voltage')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'نوع القلم' : 'Pen Type'}</h3>
        <p>{getField('pen_type')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'لون القلم' : 'Pen Color'}</h3>
        <p>{getField('pen_color')}</p>
      </div>

      <div>
        <h3>{language === 'ar' ? 'طول القلم' : 'Pen Length'}</h3>
        <p>{getField('pen_length')}</p>
      </div>
    </section>
  );
}
