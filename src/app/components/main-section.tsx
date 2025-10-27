"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/Free Shipping.svg";
import Cash from "../assets/images/Cash On Delivery.svg";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

export default function MainSection({ product }: { product: any }) {
  const { language } = useLanguage();
  const router = useRouter();

  const suffix = language === "ar" ? "_ar" : "_en";
  const dir = language === "ar" ? "rtl" : "ltr";
  const isAr = language === "ar";

  const [size, setSize] = useState("55");
  const [model, setModel] = useState("H");
  const [quantity, setQuantity] = useState(1);
  const [country, setCountry] = useState<string>("");

  // تحديد الدولة من IP
  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCountry(data.country_name || "Egypt");
      } catch {
        setCountry("Egypt");
      }
    }
    detectCountry();
  }, []);

  // خريطة الأسعار
  const priceMap: Record<string, { current: number; before: number; currency: string }> = {
    "TACT-EG": { current: 7182, before: 7980, currency: "EGP" },
    "TACT-SA": { current: 620, before: 975, currency: "SAR" },
    "55-B": { current: 31500, before: 35000, currency: "EGP" },
    "65-B": { current: 38988, before: 43320, currency: "EGP" },
    "75-B": { current: 57399, before: 60420, currency: "EGP" },
    "85-B": { current: 96631, before: 99620, currency: "EGP" },
    "55-H": { current: 37200, before: 40700, currency: "EGP" },
    "65-H": { current: 44688, before: 49020, currency: "EGP" },
    "75-H": { current: 57399, before: 60420, currency: "EGP" },
    "85-H": { current: 102331, before: 105320, currency: "EGP" },
  };

  const isTACTPanel = product.product_name === "TACT Panel";
  const isTACT = product.product_name === "TACT";

  // منع ظهور TACT Panel خارج مصر
  if (isTACTPanel && country && country !== "Egypt") {
    return (
      <section className="main-section" dir={dir}>
        <p style={{ textAlign: "center", margin: "2rem 0" }}>
          {isAr ? "هذا المنتج متاح فقط داخل مصر." : "This product is available only in Egypt."}
        </p>
      </section>
    );
  }

  // تحديد السعر بناء على الدولة
  let currentPrice = { current: 0, before: 0, currency: "EGP" };

  if (isTACT) {
    if (country === "Saudi Arabia") currentPrice = priceMap["TACT-SA"];
    else currentPrice = priceMap["TACT-EG"];
  } else {
    const key = `${size}-${model}`;
    currentPrice = priceMap[key] || { current: 0, before: 0, currency: "EGP" };
  }

  const displayName = isTACTPanel
    ? `${product.product_name} ${size} Inches-${model}`
    : product.product_name;

  const texts = {
    warranty: isAr ? "الضمان" : "Warranty",
    saleSupport: isAr ? "الدعم بعد البيع" : "After sale support",
    installment: isAr ? "أقساط" : "Installment",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    cashOnDelivery: isAr ? "الدفع عند الاستلام" : "Cash On Delivery",
    priceVAT: isAr ? "السعر شامل الضريبة" : "Price include VAT",
    installmentsInfo: isAr
      ? "اشترِ بالتقسيط وادفع شهريًا."
      : "Buy with installments and pay monthly.",
    quantity: isAr ? "الكمية" : "Quantity",
    buyNow: isAr ? "اشترِ الآن" : "Buy Now",
  };

  const handleBuyNow = () => {
    const slug = isTACTPanel
      ? `${product.product_name.replace(/\s+/g, "-")}-${size}-Inches-${model}-${quantity}`
      : `${product.product_name.replace(/\s+/g, "-")}-${quantity}`;
    router.push(`/checkout/${slug}`);
  };

  return (
    <section className="main-section" dir={dir}>
      <div className="product-images">
        <div className="main-product-image"></div>
        <div className="sub-product-images">
          <div className="sub-image"></div>
          <div className="sub-image"></div>
          <div className="sub-image"></div>
        </div>
      </div>

      <div className="product-info">
        <h1>{displayName}</h1>

        <div className="product-info-review">
          <span>4.5</span>
          <span>
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
          </span>
          <span>(100 reviews)</span>
        </div>

        <p className="product-info-description">{product[`description${suffix}`]}</p>

        <div className="product-info-warranty">
          {[Warranty, Sale, Installment, Shipping, Cash].map((icon, i) => (
            <div key={i}>
              <div>
                <Image src={icon} alt="feature" priority />
              </div>
              <span>
                {
                  [
                    texts.warranty,
                    texts.saleSupport,
                    texts.installment,
                    texts.freeShipping,
                    texts.cashOnDelivery,
                  ][i]
                }
              </span>
            </div>
          ))}
        </div>

        <div className="product-info-price">
          <span>{currentPrice.currency}</span>
          <span>{currentPrice.current.toLocaleString()}</span>
          <span>
            <del>{currentPrice.before.toLocaleString()}</del> {currentPrice.currency}
          </span>
        </div>

        <p className="product-info-vat">
          <span>{texts.priceVAT}</span>
          <span>{texts.installmentsInfo}</span>
        </p>

        <div className="product-info-Quantity">
          <div className="Quantity">
            <span>{texts.quantity}</span>
            <div>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {isTACTPanel && (
            <>
              <div className="size-select">
                <span>{isAr ? "الحجم" : "Size"}</span>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="55">55</option>
                  <option value="65">65</option>
                  <option value="75">75</option>
                  <option value="85">85</option>
                </select>
              </div>

              <div className="model-select" style={{ marginTop: "0.5rem" }}>
                <span>{isAr ? "النموذج" : "Model"}</span>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="H">H</option>
                  <option value="B">B</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="product-info-btns">
          <button onClick={handleBuyNow}>{texts.buyNow}</button>
        </div>
      </div>
    </section>
  );
}
