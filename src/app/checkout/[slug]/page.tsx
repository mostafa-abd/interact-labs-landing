"use client";
export const runtime = "edge";

import "../../assets/css/checkout.css";
import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function CheckoutPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { language } = useLanguage() as any;
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loadingCOD, setLoadingCOD] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const country = "EG";

  const priceMapEGP: Record<string, { current: number; before: number }> = {
    "55-B": { current: 32335, before: 43320 },
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
    TACT: "/images/tact/main.webp",
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

  const saveSessionData = (paymentStatus: string) => {
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        city,
        state,
        productName: product.name,
        quantity: product.qty,
        price: product.price,
        paymentStatus,
      })
    );
  };

  const handleCOD = async () => {
    if (!firstName || !lastName || !email || !phone || !city || !state) {
      alert(isAr ? "من فضلك املأ كل الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    if (emailSent) return;
    setLoadingCOD(true);
    try {
      saveSessionData("COD");
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSON.parse(sessionStorage.getItem("checkoutData")!)),
      });
      setEmailSent(true);
      router.push("/thanks");
    } catch (err) {
      console.error(err);
      alert(isAr ? "حدث خطأ أثناء تسجيل الطلب" : "Error processing order");
    } finally {
      setLoadingCOD(false);
    }
  };

  const handlePayment = async () => {
    if (!firstName || !lastName || !email || !phone || !city || !state) {
      alert(isAr ? "من فضلك املأ كل الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    if (emailSent) return;
    setLoadingPayment(true);
    try {
      saveSessionData("PENDING");
      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency,
          product_name: product.name,
          quantity: qty,
          billing_data: {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phone,
            city,
            state,
            country,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.iframeUrl) {
        window.location.href = data.iframeUrl; // توجيه المستخدم للـ iframe
      } else {
        saveSessionData("Unpaid");
        await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.parse(sessionStorage.getItem("checkoutData")!)),
        });
        setEmailSent(true);
        router.push("/Failure");
      }
    } catch (err) {
      console.error(err);
      saveSessionData("Unpaid");
      if (!emailSent) {
        await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.parse(sessionStorage.getItem("checkoutData")!)),
        });
        setEmailSent(true);
      }
      router.push("/Failure");
    } finally {
      setLoadingPayment(false);
    }
  };

  const texts = {
    deliveryInfo: isAr ? "معلومات التوصيل" : "Delivery Information",
    firstName: isAr ? "الاسم الأول" : "First name",
    lastName: isAr ? "الاسم الأخير" : "Last name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    phone: isAr ? "رقم الهاتف" : "Phone number",
    city: isAr ? "المدينة" : "City",
    state: isAr ? "العنوان" : "Address",
    continue: isAr ? "المتابعة للدفع" : "Continue to payment",
    cod: isAr ? "الدفع عند الاستلام" : "Cash on delivery",
    orderSummary: isAr ? "ملخص الطلب" : "Order Summary",
    qty: isAr ? "الكمية" : "Qty",
    subtotal: isAr ? "المجموع الفرعي" : "Subtotal",
    shipping: isAr ? "الشحن" : "Shipping",
    freeShipping: isAr ? "شحن مجاني" : "Free Shipping",
    total: isAr ? "الإجمالي" : "Total",
  };

  return (
    <section className="checkout" dir={dir}>
      <form>
        <h2>{texts.deliveryInfo}</h2>
        <div><label>{texts.firstName}</label><input value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></div>
        <div><label>{texts.lastName}</label><input value={lastName} onChange={(e) => setLastName(e.target.value)} required /></div>
        <div><label>{texts.email}</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label>{texts.phone}</label><input value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
        <div><label>{texts.city}</label><input value={city} onChange={(e) => setCity(e.target.value)} required /></div>
        <div><label>{texts.state}</label><input value={state} onChange={(e) => setState(e.target.value)} required /></div>

        <button type="button" onClick={handlePayment} disabled={loadingPayment}>
          {loadingPayment ? "Processing.." : texts.continue}
        </button>
        <button type="button" onClick={handleCOD} disabled={loadingCOD}>
          {loadingCOD ? "Processing.." : texts.cod}
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
        <div><span>{texts.subtotal}</span><span>{totalPrice.toLocaleString()} {currency}</span></div>
        <hr />
        <div><span>{texts.total}</span><span>{totalPrice.toLocaleString()} {currency}</span></div>
      </div>
    </section>
  );
}
