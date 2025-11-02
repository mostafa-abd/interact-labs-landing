"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/Free Shipping.svg";
import Cash from "../assets/images/Cash On Delivery.svg";

type Model = "B" | "H";

interface Product {
  product_name: string;
  slug?: string;
  description_en: string;
  description_ar: string;
  // أي خصائص إضافية من الـ API يمكن إضافتها هنا
}

interface PriceInfo {
  current: number;
  before: number;
  currency: string;
}

type ImageSource = string | StaticImageData;

export default function MainSection({ product }: { product: Product }) {
  const langContext = useLanguage();
  const language = langContext?.language ?? "en";
  const router = useRouter();

  const suffix = language === "ar" ? "_ar" : "_en";
  const dir = language === "ar" ? "rtl" : "ltr";
  const isAr = language === "ar";

  const [size, setSize] = useState<string>("55");
  const [model, setModel] = useState<Model>("B");
  const [quantity, setQuantity] = useState<number>(1);
  const [country, setCountry] = useState<string>("");

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

  const priceMap: Record<string, PriceInfo> = {
    "TACT-EG": { current: 7200, before: 10000, currency: "EGP" },
    "TACT-SA": { current: 565, before: 975, currency: "SAR" },
    "55-B": { current: 1, before: 37620, currency: "EGP" },
    "65-B": { current: 38988, before: 43320, currency: "EGP" },
    "75-B": { current: 55555, before: 60420, currency: "EGP" },
    "85-B": { current: 94639, before: 99620, currency: "EGP" },
    "55-H": { current: 38053, before: 43320, currency: "EGP" },
    "65-H": { current: 44688, before: 49020, currency: "EGP" },
    "75-H": { current: 61255, before: 66120, currency: "EGP" },
    "85-H": { current: 100339, before: 105320, currency: "EGP" },
  };

  const isTACTPanel = product.product_name === "TACT Panel";
  const isTACT = product.product_name === "TACT";

  if (isTACTPanel && country && country !== "Egypt") {
    return (
      <section className="main-section" dir={dir}>
        <p style={{ textAlign: "center", margin: "2rem 0" }}>
          {isAr ? "هذا المنتج متاح فقط داخل مصر." : "This product is available only in Egypt."}
        </p>
      </section>
    );
  }

  let currentPrice: PriceInfo = { current: 0, before: 0, currency: "EGP" };
  if (isTACT) {
    currentPrice = country === "Saudi Arabia" ? priceMap["TACT-SA"] : priceMap["TACT-EG"];
  } else {
    const key = `${size}-${model}`;
    currentPrice = priceMap[key] || currentPrice;
  }

  const displayName = isTACTPanel
    ? `${product.product_name} ${size} Inches-${model}`
    : product.product_name;

  const productSlug = product.slug || product.product_name.toLowerCase().replace(/\s+/g, "-");

  const productImageMap: Record<string, string[]> = {
    tact: ["main.webp", "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
    "tact-panel-b": ["2-6.webp", "usb.webp", "pin-b.webp"],
    "tact-panel-h": ["4-2.webp", "face.webp", "side.webp", "usb.webp", "pin.webp"],
  };

  const imageKey = isTACTPanel ? `tact-panel-${model.toLowerCase()}` : productSlug.toLowerCase();
  const possibleImages = productImageMap[imageKey] || ["main.jpg"];
  const imageBasePath = isTACTPanel
    ? `/images/${productSlug}-${model.toLowerCase()}`
    : `/images/${productSlug}`;
  const productImages: string[] = possibleImages.map((img) => `${imageBasePath}/${img}`);

  const [mainImage, setMainImage] = useState<ImageSource>(productImages[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setMainImage(productImages[0]);
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, size, productSlug]); // تحديث عند تغيير النموذج، الحجم أو المنتج

  const texts = {
    warranty: isAr ? "الضمان" : "Warranty",
    saleSupport: isAr ? "الدعم بعد البيع" : "After sale support",
    installment: isAr ? "أقساط" : "Installment",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    cashOnDelivery: isAr ? "الدفع عند الاستلام" : "Cash On Delivery",
    priceVAT: isAr ? "السعر شامل الضريبة" : "Price include VAT",
    installmentsInfo: isAr ? "اشترِ بالتقسيط وادفع شهريًا." : "Buy with installments and pay monthly.",
    quantity: isAr ? "الكمية" : "Quantity",
    buyNow: isAr ? "اشترِ الآن" : "Buy Now",
    size: isAr ? "الحجم" : "Size",
    model: isAr ? "النموذج" : "Model",
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
        <div className="main-product-image" style={{ position: "relative" }}>
          <Image
            src={mainImage}
            alt="Main Product"
            fill
            priority
            style={{ objectFit: "contain" }}
            sizes="100%"
            fetchPriority="high"
          />
        </div>

        <Swiper spaceBetween={10} slidesPerView={4.5} grabCursor style={{ width: "100%", padding: "10px 0" }}>
          {productImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className={`sub-image cursor-pointer ${i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setMainImage(img);
                  setActiveIndex(i);
                }}
                style={{ position: "relative", width: 106, height: 86 }}
              >
                <Image
                  src={img}
                  alt={`Sub ${i + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  sizes="100%"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="product-info">
        <h1>{displayName}</h1>

        <div className="product-info-review" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>4.5</span>
          <span style={{ display: "flex", gap: 4 }}>{[...Array(5)].map((_, i) => <Star key={i} size={17} />)}</span>
          <span>(100 reviews)</span>
        </div>

        <p className="product-info-description">
          {language === "ar" ? product.description_ar : product.description_en}
        </p>

        <div className="product-info-warranty" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          {[Warranty, Sale, Installment, Shipping, Cash].map((icon, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ position: "relative", width: 60, height: 60 }}>
                <Image src={icon as StaticImageData} alt="feature" fill style={{ objectFit: "contain" }} loading="lazy" />
              </div>
              <span style={{ fontSize: 12 }}>
                {[
                  texts.warranty,
                  texts.saleSupport,
                  texts.installment,
                  texts.freeShipping,
                  texts.cashOnDelivery,
                ][i]}
              </span>
            </div>
          ))}
        </div>

        <div className="product-info-price" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{ fontWeight: 600 }}>{currentPrice.currency}</span>
          <span style={{ fontSize: 24, fontWeight: 700 }}>{currentPrice.current.toLocaleString()}</span>
          <span style={{ color: "#777" }}>
            <del>{currentPrice.before.toLocaleString()}</del> {currentPrice.currency}
          </span>
        </div>

        <p className="product-info-vat" style={{ marginTop: 8, color: "#555" }}>
          <span>{texts.priceVAT}</span> • <span>{texts.installmentsInfo}</span>
        </p>

        <div className="product-info-Quantity" style={{ marginTop: 12 }}>
          <div className="Quantity" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span>{texts.quantity}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <p style={{ margin: 0 }}>{quantity}</p>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {isTACTPanel && (
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div className="size-select">
                <span>{texts.size}</span>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="55">55</option>
                  <option value="65">65</option>
                  <option value="75">75</option>
                  <option value="85">85</option>
                </select>
              </div>

              <div className="model-select" style={{ marginTop: 0 }}>
                <span>{texts.model}</span>
                <select value={model} onChange={(e) => setModel(e.target.value as Model)}>
                  <option value="B">B</option>
                  <option value="H">H</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="product-info-btns" style={{ marginTop: 18 }}>
          <button onClick={handleBuyNow}>{texts.buyNow}</button>
        </div>
      </div>
    </section>
  );
}
