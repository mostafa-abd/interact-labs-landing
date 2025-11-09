"use client";

import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/visa.svg";
import Cash from "../assets/images/Cash On Delivery.svg";

type Model = "B" | "H";

interface Product {
  product_name: string;
  slug?: string;
  description_en: string;
  description_ar: string;
}

interface PriceInfo {
  current: number;
  before: number;
  currency: string;
}

type ImageSource = string | StaticImageData;

export default function MainSection({ product }: { product: Product }) {

    useEffect(() => {
    const applyPadding = () => {
      if (window.innerWidth <= 500) {
        document.body.style.paddingBottom = "200px";
      } else {
        document.body.style.paddingBottom = "";
      }
    };

    applyPadding(); 

    window.addEventListener("resize", applyPadding); 

    return () => {
      document.body.style.paddingBottom = ""; 
      window.removeEventListener("resize", applyPadding);
    };
  }, []);
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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [showFloatingBox, setShowFloatingBox] = useState(false);



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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowFloatingBox(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const priceMap: Record<string, PriceInfo> = {
    "TACT-EG": { current: 7200, before: 10000, currency: "EGP" },
    "TACT-SA": { current: 565, before: 975, currency: "SAR" },
    "55-B": { current: 32335, before: 37620, currency: "EGP" },
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
    tact: ["main.webp", "5.webp", "6.webp", "7.webp", "8.webp", "1.webp", "2.webp", "3.webp", "4.webp"],
    "tact-panel-b": ["2-6.webp", "usb.webp", "pin-b.webp", "pin-b-2.webp"],
    "tact-panel-h": ["4-2.webp", "face.webp", "side.webp", "usb.webp", "pin.webp"],
  };

  const imageKey = isTACTPanel ? `tact-panel-${model.toLowerCase()}` : productSlug.toLowerCase();
  const possibleImages = productImageMap[imageKey] || ["main.jpg"];
  const imageBasePath = isTACTPanel
    ? `/images/${productSlug}-${model.toLowerCase()}`
    : `/images/${productSlug}`;

  type SlideItem = string | { type: "video"; url: string };

  let productImages: SlideItem[] = possibleImages.map(
    (img) => `${imageBasePath}/${img}`
  );

if (isTACTPanel) {
  productImages = [
    { type: "video", url: "https://www.youtube.com/embed/4oytDp2Sdsw" },
    ...productImages,
  ];
}
  const [mainImage, setMainImage] = useState<SlideItem>(productImages[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setMainImage(productImages[0]);
    setActiveIndex(0);
  }, [model, size, productSlug]);

  const texts = {
    warranty: isAr ? "ضمان" : "Warranty",
    saleSupport: isAr ? "خدمة عملاء" : "After sale support",
    installment: isAr ? "أنظمة تقسيط مختلفة" : "Installment",
    freeShipping: isAr ? "الدفع اونلاين" : "Online payment",
    cashOnDelivery: isAr ? "الدفع عند الاستلام" : "Cash On Delivery",
    priceVAT: isAr ? "السعر شامل الضريبة" : "Price include VAT",
    installmentsInfo: isAr ? "اشترِ بالتقسيط وادفع شهريًا." : "Buy with installments and pay monthly.",
    quantity: isAr ? "الكمية" : "Quantity",
    buyNow: isAr ? "اشترِ الآن" : "Buy Now",
    size: isAr ? "الحجم" : "Size",
    model: isAr ? "الموديل" : "Model",
    reviews: isAr ? "تقييم" : "reviews"
  };

  const handleBuyNow = () => {
    const slug = isTACTPanel
      ? `${product.product_name.replace(/\s+/g, "-")}-${size}-Inches-${model}-${quantity}`
      : `${product.product_name.replace(/\s+/g, "-")}-${quantity}`;
    router.push(`/checkout/${slug}`);
  };

const FloatingBox = () => (
  <div
    className="float-box"
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#fff",
      boxShadow: "0 -3px 10px rgba(0,0,0,0.1)",
      padding: "15px 7%",
      display: "flex",
      flexWrap: "wrap",
      gap: 15,
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 999,
    }}
    dir={dir}
  >
    <div
      className="float-left"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 15,
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
          {isAr
            ? isTACTPanel
              ? `تاكت بانل ${size} بوصة - ${model === "B" ? "الإصدار الأول" : "الإصدار الثاني"}`
              : isTACT
              ? "تاكت"
              : displayName
            : displayName}
        </h1>

        <a
          href="https://wa.me/201013707879"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-mobile"
          style={{
            display: "none", 
            background: "#25D366",
            borderRadius: "50%",
            width: 46,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
            alt="WhatsApp"
            width={22}
            height={22}
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1)", 
            }}
          />
        </a>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          style={{
            width: 35,
            height: 35,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 18,
          }}
        >
          -
        </button>
        <p style={{ minWidth: 30, textAlign: "center" }}>{quantity}</p>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          style={{
            width: 35,
            height: 35,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 18,
          }}
        >
          +
        </button>
      </div>

      <div style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
        {currentPrice.current.toLocaleString()}{" "}
        {isAr
          ? currentPrice.currency === "EGP"
            ? "جنيه"
            : currentPrice.currency
          : currentPrice.currency}
      </div>
    </div>

    <div
      className="float-right"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={handleBuyNow}
        style={{
          background: "#6064bf",
          color: "#fff",
          padding: "10px 25px",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
          fontWeight: 500,
          border: "none",
        }}
      >
        {texts.buyNow}
      </button>

      <a
        href="https://wa.me/201013707879"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-web"
        style={{
          background: "#25D366",
          borderRadius: "50%",
          width: 45,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
      >
        <Image
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
          alt="WhatsApp"
          width={25}
          height={25}
          style={{
            objectFit: "contain",
            filter: "brightness(0) invert(1)", 
          }}
        />
      </a>
    </div>
  </div>
);


  return (
    <>
      <section ref={sectionRef} className="main-section" dir={dir}>
        <div className="product-images">
        <div className="main-product-image" style={{ position: "relative" }}> {typeof mainImage === "object" && mainImage.type === "video" ? ( <iframe width="100%" height="450" src={mainImage.url} title="Product Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: 12, width: "100%", height: "100%" }} ></iframe> ) : ( <Image src={mainImage as string} alt="Main Product" fill priority style={{ objectFit: "contain" }} sizes="100%" fetchPriority="high" /> )} </div>


          <Swiper
            dir="ltr"
            slidesPerView={4.3}
            grabCursor
            style={{ width: "100%", padding: "10px 0" }}
            breakpoints={{
              0: { slidesPerView: 2.5 },
              640: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.3 },
            }}
          >
            {productImages.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className={`sub-image cursor-pointer ${i === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    setMainImage(item);
                    setActiveIndex(i);
                  }}
                  style={{ position: "relative" }}
                >
                  {typeof item === "object" && item.type === "video" ? (
                    <>
                      <Image
                        src="https://img.youtube.com/vi/4oytDp2Sdsw/hqdefault.jpg"
                        alt="Video Thumbnail"
                        fill
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        loading="lazy"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          background: "rgba(0,0,0,0.6)",
                          borderRadius: "50%",
                          width: 50,
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderLeft: "15px solid white",
                          }}
                        ></span>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item as string}
                      alt={`Sub ${i + 1}`}
                      fill
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      loading="lazy"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="product-info">
          <h1>
            {isAr
              ? isTACTPanel
                ? `تاكت بانل ${size} بوصة - ${model === "B" ? "الإصدار الأول" : "الإصدار الثاني"}`
                : isTACT
                ? "تاكت"
                : displayName
              : displayName}
          </h1>

          <div className="product-info-review">
            <span>4.8</span>
            <span>{[...Array(5)].map((_, i) => <Star key={i} size={17} />)}</span>
            <span>(37 {texts.reviews})</span>
          </div>

      <p className="product-info-description">
  {(() => {
    if (isTACTPanel && model === "H") {
      return isAr
        ? "أول شاشة تفاعلية مصرية، مقاومة للكسر والصدمات، نظام تشغيل ويندوز ١٠ وأندرويد ١٣، رامات ٨ جيجا، مساحة تخزين ٢٥٦ جيجا SSD، حتى ٤٠ نقاط لمس في نفس اللحظة"
        : "The first Egyptian interactive screen, with Break resistant technology, operating system Window 10, Ram 8 G, HD 256 SSD, up to 40 multi-touch points.";
    } else {
      return language === "ar"
        ? product.description_ar
        : product.description_en;
    }
  })()}
</p>

          <div className="product-info-warranty" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            {[Warranty, Sale, Installment, Shipping, Cash].map((icon, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ position: "relative", width: 60, height: 60 }}>
                  <Image src={icon as StaticImageData} alt="feature" fill style={{ objectFit: "contain" }} loading="lazy" />
                </div>
                <span>
                  {[texts.warranty, texts.saleSupport, texts.installment, texts.freeShipping, texts.cashOnDelivery][i]}
                </span>
              </div>
            ))}
          </div>

          <div className="product-info-price">
            <span>
              {isAr
                ? currentPrice.currency === "EGP"
                  ? "جنيه"
                  : currentPrice.currency
                : currentPrice.currency}
            </span>

            <span>{currentPrice.current.toLocaleString()}</span>

            <span>
              <del>{currentPrice.before.toLocaleString()}</del>{" "}
              {isAr
                ? currentPrice.currency === "EGP"
                  ? "جنيه"
                  : currentPrice.currency
                : currentPrice.currency}
            </span>
          </div>

          <p className="product-info-vat">
            <span>{texts.priceVAT}</span>
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
              </>
            )}
          </div>

          <div className="product-info-btns">
            <button onClick={handleBuyNow}>{texts.buyNow}</button>
          </div>
        </div>
      </section>

      {showFloatingBox && <FloatingBox />}
    </>
  );
}
