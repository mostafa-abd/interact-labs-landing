"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/Free Shipping.svg";
import Cash from "../assets/images/Cash On Delivery.svg";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

export default function MainSection({ product }: { product: any }) {
  // @ts-ignore
const language = useLanguage()?.language ?? "en";
  const router = useRouter();
  const suffix = language === "ar" ? "_ar" : "_en";
  const dir = language === "ar" ? "rtl" : "ltr";
  const isAr = language === "ar";

  const [size, setSize] = useState("55");
  const [model, setModel] = useState("B");
  const [quantity, setQuantity] = useState(1);
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

  const priceMap: Record<string, { current: number; before: number; currency: string }> = {
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

  let currentPrice = { current: 0, before: 0, currency: "EGP" };
  if (isTACT) {
    currentPrice = country === "Saudi Arabia" ? priceMap["TACT-SA"] : priceMap["TACT-EG"];
  } else {
    const key = `${size}-${model}`;
    currentPrice = priceMap[key] || { current: 0, before: 0, currency: "EGP" };
  }

  const displayName = isTACTPanel
    ? `${product.product_name} ${size} Inches-${model}`
    : product.product_name;

  const productSlug = product.slug || product.product_name.toLowerCase().replace(/\s+/g, "-");

  const productImageMap: Record<string, string[]> = {
    tact: ["main.webp","1.webp","2.webp","3.webp","4.webp","5.webp","6.webp","7.webp","8.webp"],
    "tact-panel-b": ["2-6.webp","usb.webp","pin-b.webp"],
    "tact-panel-h": ["4-2.webp","face.webp","side.webp","usb.webp","pin.webp"],
  };

  const imageKey =
    isTACTPanel && model
      ? `tact-panel-${model.toLowerCase()}`
      : productSlug.toLowerCase();

  const possibleImages = productImageMap[imageKey] || ["main.jpg"];
  const imageBasePath = isTACTPanel
    ? `/images/${productSlug}-${model.toLowerCase()}`
    : `/images/${productSlug}`;
  const productImages = possibleImages.map((img) => `${imageBasePath}/${img}`);

  const [mainImage, setMainImage] = useState(productImages[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMainImage(productImages[0]);
    setActiveIndex(0);
  }, [model, size]);

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
        <div className="main-product-image" style={{ position: "relative"}}>
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
                onClick={() => { setMainImage(img); setActiveIndex(i); }}
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

        <div className="product-info-review">
          <span>4.5</span>
          <span>{[...Array(5)].map((_, i) => <Star key={i} size={17} />)}</span>
          <span>(100 reviews)</span>
        </div>

        <p className="product-info-description">{product[`description${suffix}`]}</p>

        <div className="product-info-warranty">
          {[Warranty, Sale, Installment, Shipping, Cash].map((icon, i) => (
            <div key={i}>
              <div style={{ position: "relative", width: 60, height: 60 }}>
                <Image src={icon} alt="feature" fill style={{ objectFit: "contain" }} loading="lazy" />
              </div>
              <span>{[texts.warranty, texts.saleSupport, texts.installment, texts.freeShipping, texts.cashOnDelivery][i]}</span>
            </div>
          ))}
        </div>

        <div className="product-info-price">
          <span>{currentPrice.currency}</span>
          <span>{currentPrice.current.toLocaleString()}</span>
          <span><del>{currentPrice.before.toLocaleString()}</del> {currentPrice.currency}</span>
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
                  <option value="B">B</option>
                  <option value="H">H</option>
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
