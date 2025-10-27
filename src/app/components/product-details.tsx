'use client'

import { useLanguage } from "../context/LanguageContext";

export default function ProductDetails({ product}: { product: any; }) {
  const { language, toggleLanguage } = useLanguage()
  const suffix = language === "ar" ? "_ar" : "_en";
    const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="product-details"  dir={dir}>
      <h1>{language === "ar" ? "تفاصيل المنتج" : "Product Details"}</h1>

      <div>
        <h3>{language === "ar" ? "العلامة التجارية" : "Brand Name"}</h3>
        <p>{product[`brand${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "اللون" : "Color"}</h3>
        <p>{product[`color${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "الخامة" : "Material"}</h3>
        <p>{product[`material${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "مدى الحرارة" : "Temperature Range"}</h3>
        <p>{product[`temperature_range${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "التوصيل" : "Connectivity"}</h3>
        <p>{product[`connectivity${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "أبعاد المنتج" : "Product Dimensions"}</h3>
        <p>{product[`product_dimensions${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "جهد التشغيل" : "Power Supply Voltage"}</h3>
        <p>{product[`power_supply_voltage${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "نوع القلم" : "Pen Type"}</h3>
        <p>{product[`pen_type${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "لون القلم" : "Pen Color"}</h3>
        <p>{product[`pen_color${suffix}`]}</p>
      </div>
      <div>
        <h3>{language === "ar" ? "طول القلم" : "Pen Length"}</h3>
        <p>{product[`pen_length${suffix}`]}</p>
      </div>
    </section>
  );
}
