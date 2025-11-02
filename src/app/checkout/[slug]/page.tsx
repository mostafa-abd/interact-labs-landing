"use client";

import "../../assets/css/checkout.css";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import Loading from "@/app/loading";

export default function CheckoutPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  // @ts-ignore
const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [isClient, setIsClient] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [countryPhone, setCountryPhone] = useState<string>("20"); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  
    address: "",
    state: "",
  });

  const [status, setStatus] = useState<"IDLE" | "CREATING" | "ERROR">("IDLE");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    const orderId = searchParams.get('order_id');
    if (success === 'true' && orderId) {
      alert(isAr ? `الدفع نجح! رقم الطلب: ${orderId}` : `Payment succeeded! Order ID: ${orderId}`);
    } else if (success === 'false') {
      alert(isAr ? "الدفع فشل. جرب تاني." : "Payment failed. Try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    setIsClient(true);
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
    const egypt = allCountries.find((c) => c.name === "Egypt");
    if (egypt) {
      setSelectedCountry({ value: egypt.isoCode, label: egypt.name });
      handleCountryChange({ value: egypt.isoCode });
    }
  }, []);

  const handleCountryChange = (selected: any) => {
    setSelectedCountry(selected);
    const states = State.getStatesOfCountry(selected.value) || [];
    setStateOptions(states.map((s) => ({ label: s.name, value: s.name })));
    const selectedData = countries.find((c) => c.isoCode === selected.value);
    setCountryPhone(selectedData ? `${selectedData.phonecode}` : "20");
  };

  const priceMapEGP: Record<string, { current: number; before: number }> = {
    "55-B": { current: 10, before: 37620 },
    "65-B": { current: 38988, before: 43320 },
    "75-B": { current: 55555, before: 60420 },
    "85-B": { current: 94639, before: 99620 },
    "55-H": { current: 38053, before: 43320 },
    "65-H": { current: 44688, before: 49020 },
    "75-H": { current: 61255, before: 66120 },
    "85-H": { current: 100339, before: 105320 },
    "TACT": { current: 7200, before: 10000 },
  };

  const productImages: Record<string, string> = {
    "TACT": "/images/tact/main.webp",
    "TACT-Panel-H": "/images/tact-panel-h/4-2.webp",
    "TACT-Panel-B": "/images/tact-panel-b/2-6.webp",
  };

  let name = "";
  let qty = 1;
  let currentPrice = 0;
  let beforePrice = 0;
  let currency = "EGP";
  let image = "/images/default.jpg";

  if (typeof slug === "string" && slug.match(/(\d+)-Inches-(H|B)-\d+/)) {  
    const match = slug.match(/(\d+)-Inches-(H|B)-(\d+)/);
    if (match) {
      const size = match[1];
      const model = match[2];
      qty = Number(match[3]);
      const key = `${size}-${model}`;
      ({ current: currentPrice, before: beforePrice } = priceMapEGP[key] || {});
      name = `TACT Panel ${size} Inches-${model}`;
      image = model === "H" ? productImages["TACT-Panel-H"] : productImages["TACT-Panel-B"];
    }
  } else if (typeof slug === "string") {
    const parts = slug.split("-");
    if (parts.length > 1) {
      qty = Number(parts.pop()); 
      const baseName = parts.join("-");
      name = baseName;
      const key = baseName;
      ({ current: currentPrice, before: beforePrice } = priceMapEGP[key] || {});

      image = productImages["TACT"] || "/images/default.jpg";
    }
  }

  const totalPrice = Math.round(Number(currentPrice) * Number(qty));  

  const product = { name, qty, price: currentPrice, beforePrice, image };

  const texts = {
    deliveryInfo: isAr ? "معلومات التوصيل" : "Delivery Information",
    name: isAr ? "الاسم" : "Name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    country: isAr ? "الدولة" : "Country",
    state: isAr ? "المحافظة / الولاية" : "State",
    phone: isAr ? "رقم الهاتف" : "Phone number",
    address: isAr ? "العنوان" : "Address",
    continue: isAr ? "المتابعة للدفع" : "Continue to payment",
    cod: isAr ? "الدفع عند الاستلام" : "Payment upon receipt",
    orderSummary: isAr ? "ملخص الطلب" : "Order Summary",
    qty: isAr ? "الكمية" : "Qty",
    subtotal: isAr ? "المجموع الفرعي" : "Subtotal",
    shipping: isAr ? "الشحن" : "Shipping",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    total: isAr ? "الإجمالي" : "Total",
  };

  const handlePaymob = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.state) {
      alert(isAr ? "من فضلك أكمل جميع البيانات" : "Please complete all fields");
      return;
    }
    if (totalPrice <= 0) { 
      alert(isAr ? "سعر المنتج غير صحيح" : "Invalid product price");
      return;
    }

    const phoneIntl = selectedCountry 
      ? `+${countryPhone}${formData.phone.replace(/\D/g, "")}` 
      : `+20${formData.phone.replace(/\D/g, "")}`;

    try {
      setStatus("CREATING");
      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: totalPrice, 
          ...formData,
          phone: phoneIntl,
          country: selectedCountry ? selectedCountry.value : "EG",
          product: {  
            name: product.name,
            qty: product.qty,
            price: currentPrice,  
            currency,
          }
        }),
      });

      const result = await res.json();

      if (result.iframeUrl) {
        setIsRedirecting(true);
        setTimeout(() => (window.location.href = result.iframeUrl), 150);
      } else {
        setStatus("ERROR");
        alert(isAr ? `فشل بدأ عملية الدفع: ${result.error || 'خطأ غير معروف'}` : `Error: ${result.error || 'Unknown'}`);
      }
    } catch (error) {
      setStatus("ERROR");
      alert(isAr ? "حدث خطأ أثناء الاتصال بالسيرفر" : "Error connecting to server");
    }
  };

  const handleCOD = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.state) {
      alert(isAr ? "من فضلك أكمل جميع البيانات" : "Please complete all fields");
      return;
    }

    const phoneIntl = selectedCountry 
      ? `+${countryPhone}${formData.phone.replace(/\D/g, "")}` 
      : `+20${formData.phone.replace(/\D/g, "")}`;

    try {
      await fetch("/api/send-cod-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "mostafa.for.work2@gmail.com",
          subject: `طلب الدفع عند الاستلام - ${product.name}`,
          body: `
اسم العميل: ${formData.name}
المحافظة: ${formData.state}
البريد: ${formData.email}
الهاتف: ${phoneIntl}
العنوان: ${formData.address}
المنتج: ${product.name}
الكمية: ${product.qty}
السعر: ${totalPrice} ${currency}
          `,
        }),
      });
      alert(isAr ? "تم إرسال تفاصيل الطلب بنجاح" : "Order details sent successfully");
    } catch (err) {
      alert(isAr ? "حدث خطأ أثناء إرسال الإيميل" : "Error sending email");
    }
  };

  return (
    <section className="checkout" dir={dir}>
      {(status === "CREATING" || isRedirecting) && <Loading />}

      <form>
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
              onChange={(selected) => {
                setSelectedState(selected);
                setFormData({ ...formData, state: selected ? selected.label : "" });
              }}
              classNamePrefix="select"
            />
          )}
        </div>

        <div className="phone">
          <label>{texts.phone}</label>
          {selectedCountry && <span>+{countryPhone}</span>}
          <input
            type="text"
            placeholder={isAr ? "رقم الهاتف المحلي (مثل 0123456789)" : "Local phone number (e.g., 0123456789)"}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ 
                ...formData, 
                phone: e.target.value.replace(/\D/g, "").slice(0, 10)
              })
            }
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

        <button type="button" onClick={handlePaymob} disabled={status === "CREATING" || isRedirecting}>
          {texts.continue}
        </button>
        <button type="button" onClick={handleCOD}>
          {texts.cod}
        </button>
      </form>

      <div className="order-summary">
        <h2>{texts.orderSummary}</h2>
        <div>
          <div className="product-Image">
            <Image src={product.image} alt={product.name} width={200} height={200} priority />
          </div>
          <div className="product-info">
            <h4>{product.name}</h4>
            <span>{texts.qty}: <b>{product.qty}</b></span>
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
          <span>{texts.total}</span>
          <span>{totalPrice.toLocaleString()} {currency}</span>  
        </div>
      </div>
    </section>
  );
}