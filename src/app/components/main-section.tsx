'use client'

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Warranty from "../assets/images/Warranty.svg";
import Sale from "../assets/images/After sale support.svg";
import Installment from "../assets/images/Installment.svg";
import Shipping from "../assets/images/Free Shipping.svg";
import Cash from "../assets/images/Cash On Delivery.svg";
import { useLanguage } from "../context/LanguageContext";

export default function MainSection({ product }: { product: any }) {
  const { language, toggleLanguage } = useLanguage()
  const suffix = language === "ar" ? "_ar" : "_en";
  const dir = language === "ar" ? "rtl" : "ltr";

  
  return (
    <section className="main-section"  dir={dir}>
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
              <Image src={Warranty} alt="Interact Labs Warranty" priority />
            </span>
            <span>Warranty</span>
          </div>
          <div>
            <span>
              <Image src={Sale} alt="Interact Labs sale support" priority />
            </span>
            <span>After sale support</span>
          </div>
          <div>
            <span>
              <Image
                src={Installment}
                alt="Interact Labs Installment"
                priority
              />
            </span>
            <span>Installment</span>
          </div>
          <div>
            <span>
              <Image src={Shipping} alt="Interact Labs Shipping" priority />
            </span>
            <span>Free Shipping</span>
          </div>
          <div>
            <span>
              <Image src={Cash} alt="Interact Labs Cash On Delivery" priority />
            </span>
            <span>Cash On Delivery</span>
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
          <span>Price include VAT</span>
          <span>
            Buy with installments and pay EGP 100 for 12 months with select
            payment methods.
          </span>
        </p>
        <div className="product-info-Quantity">
          <div className="Quantity">
            <span>Quantity</span>
            <div>
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
          </div>
        </div>
        <div className="product-info-btns">
          <button>
            <ShoppingCart />
            Add to Cart
          </button>
          <button>Buy Now</button>
        </div>
      </div>
    </section>
  );
}
