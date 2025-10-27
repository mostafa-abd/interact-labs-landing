"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/Free Shipping.svg";
import Cash from "../assets/images/Cash On Delivery.svg";
import { useLanguage } from "../context/LanguageContext";

export default function MainSection({ product }: { product: any }) {
  const { language, toggleLanguage } = useLanguage();
  const suffix = language === "ar" ? "_ar" : "_en";
  const dir = language === "ar" ? "rtl" : "ltr";
  const isAr = language === "ar";

  const texts = {
    warranty: isAr ? "الضمان" : "Warranty",
    saleSupport: isAr ? "الدعم بعد البيع" : "After sale support",
    installment: isAr ? "أقساط" : "Installment",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    cashOnDelivery: isAr ? "الدفع عند الاستلام" : "Cash On Delivery",
    priceVAT: isAr ? "السعر شامل الضريبة" : "Price include VAT",
    installmentsInfo: isAr
      ? "اشترِ بالتقسيط وادفع 100 جنيه لمدة 12 شهرًا مع طرق الدفع المحددة."
      : "Buy with installments and pay EGP 100 for 12 months with select payment methods.",
    quantity: isAr ? "الكمية" : "Quantity",
    addToCart: isAr ? "أضف إلى السلة" : "Add to Cart",
    buyNow: isAr ? "اشترِ الآن" : "Buy Now",
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
        <h1>{product.product_name}</h1>
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
        <p className="product-info-description">
          {product[`description${suffix}`]}
        </p>
        <div className="product-info-warranty">
          <div>
            <span>
              <Image src={Warranty} alt={texts.warranty} priority />
            </span>
            <span>{texts.warranty}</span>
          </div>
          <div>
            <span>
              <Image src={Sale} alt={texts.saleSupport} priority />
            </span>
            <span>{texts.saleSupport}</span>
          </div>
          <div>
            <span>
              <Image src={Installment} alt={texts.installment} priority />
            </span>
            <span>{texts.installment}</span>
          </div>
          <div>
            <span>
              <Image src={Shipping} alt={texts.freeShipping} priority />
            </span>
            <span>{texts.freeShipping}</span>
          </div>
          <div>
            <span>
              <Image src={Cash} alt={texts.cashOnDelivery} priority />
            </span>
            <span>{texts.cashOnDelivery}</span>
          </div>
        </div>

        <div className="product-info-price">
          <span>EGP</span>
          <span>7999</span>
          <span>
            was <del>9999</del> EGP
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
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
          </div>

          {product[`product_name`] === "TACT ProLine" && (
            <div className="product-options">
              <div className="size-select">
                <label>{isAr ? "الحجم" : "Size"}</label>
                <select>
                  <option value="55">55</option>
                  <option value="65">65</option>
                  <option value="75">75</option>
                  <option value="85">85</option>
                </select>
              </div>

              <div className="model-select" style={{ marginTop: "0.5rem" }}>
                <label>{isAr ? "النموذج" : "Model"}</label>
                <select>
                  <option value="H">H</option>
                  <option value="B">B</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="product-info-btns">
          <button>{texts.buyNow}</button>
        </div>
      </div>
    </section>
  );
}
