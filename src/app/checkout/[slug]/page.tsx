"use client";

import "../../assets/css/checkout.css";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import Loading from "@/app/loading";

export default function CheckoutPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [isClient, setIsClient] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryPhone, setCountryPhone] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState<"IDLE" | "CREATING" | "ERROR">("IDLE");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setUserCountry(data.country_name))
      .catch(() => setUserCountry("Egypt"));
  }, []);

  const handleCountryChange = (selected: any) => {
    setSelectedCountry(selected);
    const states = State.getStatesOfCountry(selected.value) || [];
    setStateOptions(states.map((s) => ({ label: s.name, value: s.name })));
    const selectedData = countries.find((c) => c.isoCode === selected.value);
    setCountryPhone(selectedData ? `${selectedData.phonecode}` : "");
  };

  const priceMapEGP: Record<string, { current: number; before: number }> = {
    "55-B": { current: 31500, before: 35000 },
    "65-B": { current: 38988, before: 43320 },
    "75-B": { current: 57399, before: 60420 },
    "85-B": { current: 96631, before: 99620 },
    "55-H": { current: 37200, before: 40700 },
    "65-H": { current: 44688, before: 49020 },
    "75-H": { current: 57399, before: 60420 },
    "85-H": { current: 102331, before: 105320 },
    "TACT": { current: 7182, before: 7980 },
  };

  const priceMapSAR: Record<string, { current: number; before: number }> = {
    "TACT": { current: 835, before: 928 },
  };

  let name = "";
  let qty = 1;
  let currentPrice = 0;
  let beforePrice = 0;
  let currency = "EGP";

  if (typeof slug === "string" && slug.includes("TACT-Panel")) {
    const match = slug.match(/(\d+)-Inches-(H|B)-(\d+)/);
    const size = match ? match[1] : "55";
    const model = match ? match[2] : "H";
    qty = match ? Number(match[3]) : 1;
    const key = `${size}-${model}`;
    ({ current: currentPrice, before: beforePrice } = priceMapEGP[key] || {});
    name = `TACT Panel ${size} Inches-${model}`;
  } else if (typeof slug === "string") {
    const parts = slug.split("-");
    qty = Number(parts.pop());
    const baseName = parts.join(" ");
    const key = parts.join("-");
    ({ current: currentPrice, before: beforePrice } = priceMapEGP[key] || {});
    name = baseName;

    if (key === "TACT" && userCountry === "Saudi Arabia") {
      ({ current: currentPrice, before: beforePrice } = priceMapSAR[key]);
      currency = "SAR";
    }
  }

  const totalPrice = Math.round(Number(currentPrice) * Number(qty));

  const product = {
    name,
    qty,
    price: currentPrice,
    beforePrice,
    image: "/assets/images/products/default.jpg",
  };

  const texts = {
    deliveryInfo: isAr ? "معلومات التوصيل" : "Delivery Information",
    name: isAr ? "الاسم" : "Name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    country: isAr ? "الدولة" : "Country",
    state: isAr ? "المحافظة / الولاية" : "State",
    phone: isAr ? "رقم الهاتف" : "Phone number",
    address: isAr ? "العنوان" : "Address",
    continue: isAr ? "المتابعة للدفع" : "Continue to payment",
    orderSummary: isAr ? "ملخص الطلب" : "Order Summary",
    qty: isAr ? "الكمية" : "Qty",
    subtotal: isAr ? "المجموع الفرعي" : "Subtotal",
    shipping: isAr ? "الشحن" : "Shipping",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    total: isAr ? "الإجمالي" : "Total",
    vat: isAr ? "شامل ضريبة القيمة المضافة 14%" : "Including 14% VAT",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert(isAr ? "من فضلك أكمل جميع البيانات" : "Please complete all fields");
      return;
    }

    try {
      setStatus("CREATING");

      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const result = await res.json();

      if (result.error) {
        setStatus("ERROR");
        alert(`${isAr ? "خطأ" : "Error"}: ${result.error}\n${JSON.stringify(result.details || {}, null, 2)}`);
        return;
      }

      if (result.iframeUrl) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = result.iframeUrl;
        }, 150); 
      } else {
        setStatus("ERROR");
        alert(isAr ? "فشل بدأ عملية الدفع" : "Error initializing payment");
      }
    } catch (error) {
      console.error("💥 Client Error:", error);
      setStatus("ERROR");
      alert(isAr ? "حدث خطأ أثناء الاتصال بالسيرفر" : "Error connecting to server");
    }
  };

  return (
    <section className="checkout" dir={dir}>
      {(status === "CREATING" || isRedirecting) && <Loading />}

      <form onSubmit={handleSubmit}>
        <h2>{texts.deliveryInfo}</h2>
        <div>
          <label>{texts.name}</label>
          <input
            type="text"
            placeholder={isAr ? "اسمك" : "Your name"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>{texts.email}</label>
          <input
            type="email"
            placeholder={isAr ? "بريدك الإلكتروني" : "Your email"}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label>{texts.country}</label>
          {isClient && (
            <Select
              placeholder={isAr ? "اختر الدولة" : "Select Country"}
              isSearchable
              options={countries.map((c) => ({ value: c.isoCode, label: c.name }))}
              onChange={handleCountryChange}
              classNamePrefix="select"
            />
          )}
        </div>
        <div>
          <label>{texts.state}</label>
          {isClient && (
            <Select
              placeholder={isAr ? "اختر المحافظة / الولاية" : "Select State"}
              isSearchable
              isDisabled={!selectedCountry}
              options={stateOptions}
              classNamePrefix="select"
            />
          )}
        </div>
        <div className="phone">
          <label>{texts.phone}</label>
          {selectedCountry && <span>+{countryPhone}</span>}
          <input
            type="text"
            placeholder={isAr ? "رقم الهاتف" : "Your phone"}
            value={formData.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9+]/g, "").slice(0, 15);
              setFormData({ ...formData, phone: val });
            }}
          />
        </div>
        <div>
          <label>{texts.address}</label>
          <input
            type="text"
            placeholder={isAr ? "عنوان التوصيل" : "Delivery Address"}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <button type="submit" disabled={status === "CREATING" || isRedirecting}>
          {isAr ? "المتابعة للدفع" : "Continue to payment"}
        </button>
      </form>

      <div className="order-summary">
        <h2>{texts.orderSummary}</h2>
        <div>
          <div className="product-Image">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="product-info">
            <h4>{product.name}</h4>
            <span>
              {texts.qty}: <b>{product.qty}</b>
            </span>
            <p>{product.price.toLocaleString()} {currency}</p>
          </div>
        </div>

        <hr />
        <div>
          <span>{texts.subtotal}</span>
          <span>{totalPrice.toLocaleString()} {currency}</span>
        </div>
        <div>
          <span>{texts.shipping}</span>
          <span>{texts.freeShipping}</span>
        </div>
        <hr />
        <div>
          <span>
            {texts.total} <br /> {texts.vat}
          </span>
          <span>{totalPrice.toLocaleString()} {currency}</span>
        </div>
      </div>
    </section>
  );
}
