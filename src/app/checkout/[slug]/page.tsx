"use client";
export const runtime = "edge";
import CheckoutMeta from "./CheckoutMeta";

import "../../assets/css/checkout.css";
import { useState, useEffect, useRef } from "react";
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
  const [phoneError, setPhoneError] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [loadingCOD, setLoadingCOD] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const beginCheckoutFired = useRef(false);
  const userStartedFormFired = useRef(false);
  const checkoutInitiatedFired = useRef(false);
  const purchaseFired = useRef(false);

  const country = "EG";

  // ================================
  //          PRODUCT LOGIC
  // ================================
  const priceMapEGP: Record<string, { current: number; before: number }> = {
    "55-B": { current: 32335, before: 43320 },
    "65-B": { current: 38988, before: 43320 },
    "75-B": { current: 55555, before: 60420 },
    "85-B": { current: 94639, before: 99620 },
    "55-H": { current: 38053, before: 43320 },
    "65-H": { current: 44688, before: 49020 },
    "75-H": { current: 61255, before: 66120 },
    "85-H": { current: 100339, before: 105320 },
    TACT: { current: 7182, before: 10000 },
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
  let image = "";

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
      image = productImages["TACT"] || "";
    }
  }

  const totalPrice = Math.round(Number(currentPrice) * Number(qty));
  // product object kept as full internal object, but we'll send cleaned product data to GTM (no image)
  const product = { name, qty, price: currentPrice, beforePrice, image };

  // Helper: create clean product payload (no image, consistent keys)
  const getProductPayload = () => {
    const itemName = product.name || "";
    const itemId = itemName ? itemName.replace(/\s+/g, "_") : ""; // fallback id from name
    return {
      item: itemName,
      item_id: itemId,
      price: Number(product.price) || 0,
      quantity: Number(product.qty) || 1,
      totalPrice: Number(totalPrice) || 0,
      currency,
    };
  };

  // Helper: unique transaction id generator (no backend)
  const generateTransactionId = () =>
    `${Date.now().toString()}-${Math.floor(100000 + Math.random() * 900000).toString()}`;

  // ================================
  //      BEGIN CHECKOUT — once (no image)
  // ================================
  useEffect(() => {
    // Fire only when product name exists (avoid firing with empty/partial product)
    if (!beginCheckoutFired.current && product.name) {
      beginCheckoutFired.current = true;

      const payload = getProductPayload();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "begin_checkout",
        product: payload, // cleaned product (no image)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.name]); // re-run only if product.name changes (but ref prevents duplicates)

  // ================================
  //    USER STARTED FILLING FORM — once
  // ================================
  const fireUserStartForm = () => {
    if (!userStartedFormFired.current) {
      // mark early to avoid race conditions
      userStartedFormFired.current = true;

      const payload = getProductPayload();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "user_started_filling_form",
        product: payload,
        timestamp: Date.now(),
      });
    }
  };

  // ================================
  //          PHONE LOGIC
  // ================================
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(onlyDigits);

    if (onlyDigits && !/^01\d{0,9}$/.test(onlyDigits)) {
      setPhoneError(isAr ? "الرقم لازم يبدأ بـ 01" : "Phone must start with 01");
    } else if (onlyDigits.length === 11 && !/^01\d{9}$/.test(onlyDigits)) {
      setPhoneError(isAr ? "رقم الهاتف غير صالح" : "Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const validatePhone = () => /^01\d{9}$/.test(phone);

  // ================================
  //     SAVE SESSION (includes transaction_id)
  // ================================
  const saveSessionData = (paymentStatus: string, transaction_id?: string) => {
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      product: getProductPayload(),
      totalPrice,
      currency,
      paymentStatus,
      transaction_id: transaction_id || null,
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(payload));
  };

  // ================================
  //     FIRE CHECKOUT INITIATED — once (includes transaction_id)
  // ================================
  const fireCheckoutInitiated = (paymentMethod: string, transaction_id?: string) => {
    if (!checkoutInitiatedFired.current) {
      checkoutInitiatedFired.current = true;

      const payload = getProductPayload();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "checkoutInitiated",
        paymentMethod,
        transaction_id: transaction_id || null,
        product: payload,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          city,
          state,
        },
        totalPrice,
        currency,
      });
    }
  };

  // ================================
  //             COD
  // ================================
  const handleCOD = async () => {
    // generate transaction id for this order (even for COD)
    const transaction_id = generateTransactionId();

    fireCheckoutInitiated("COD", transaction_id);

    if (!firstName || !lastName || !email || !phone || !city || !state) {
      alert(isAr ? "من فضلك املأ كل الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    if (!validatePhone()) {
      alert(isAr ? "رقم الهاتف غير صالح" : "Invalid phone number");
      return;
    }

    if (emailSent) return;
    setLoadingCOD(true);

    try {
      saveSessionData("COD", transaction_id);

      // PURCHASE (for COD) — include transaction id and ensure product data valid
      if (!purchaseFired.current) {
        purchaseFired.current = true;

        const payload = getProductPayload();
        window.dataLayer.push({
          event: "purchase",
          transaction_id,
          product: payload,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            city,
            state,
          },
          payment: { method: "COD", status: "PAID" },
          totalPrice,
          currency,
        });
      }

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(JSON.parse(sessionStorage.getItem("checkoutData")!)),
      });

      setEmailSent(true);
      router.push("/thanks");
    } catch {
      alert(isAr ? "حدث خطأ أثناء تسجيل الطلب" : "Error processing order");
    } finally {
      setLoadingCOD(false);
    }
  };

  // ================================
  //       ONLINE PAYMENT
  // ================================
  const handlePayment = async () => {
    // generate transaction id for this attempt
    const transaction_id = generateTransactionId();

    fireCheckoutInitiated("Online Payment", transaction_id);

    if (!firstName || !lastName || !email || !phone || !city || !state) {
      alert(isAr ? "من فضلك املأ كل الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    if (!validatePhone()) {
      alert(isAr ? "رقم الهاتف غير صالح" : "Invalid phone number");
      return;
    }

    if (emailSent) return;
    setLoadingPayment(true);

    try {
      // save pending session with transaction_id
      saveSessionData("PENDING", transaction_id);

      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency,
          product_name: product.name,
          quantity: qty,
          transaction_id, // include so you can reconcile later
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
        // redirect to payment iframe/provider — purchase should be fired on return/confirmation page
        // we stored transaction_id in sessionStorage so the return page can fire the final purchase once.
        window.location.href = data.iframeUrl;
      } else {
        // Payment initiation failed — mark purchase as FAILED and push event once
        if (!purchaseFired.current) {
          purchaseFired.current = true;
          const payload = getProductPayload();
          window.dataLayer.push({
            event: "purchase",
            transaction_id,
            product: payload,
            customer: {
              firstName,
              lastName,
              email,
              phone,
              city,
              state,
            },
            payment: { method: "Online", status: "FAILED" },
            totalPrice,
            currency,
          });
        }

        saveSessionData("Unpaid", transaction_id);
        await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.parse(sessionStorage.getItem("checkoutData")!)),
        });

        setEmailSent(true);
        router.push("/Failure");
      }
    } catch {
      // network or server error — fire purchase FAILED once
      if (!purchaseFired.current) {
        purchaseFired.current = true;
        const payload = getProductPayload();
        window.dataLayer.push({
          event: "purchase",
          transaction_id,
          product: payload,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            city,
            state,
          },
          payment: { method: "Online", status: "FAILED" },
          totalPrice,
          currency,
        });
      }

      saveSessionData("Unpaid", transaction_id);

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

  // ================================
  //            UI
  // ================================
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
    total: isAr ? "الإجمالي" : "Total",
  };

  return (
    <section className="checkout" dir={dir}>
            <CheckoutMeta />

      <form>
        <h2>{texts.deliveryInfo}</h2>

        <div>
          <label>{texts.firstName}</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={fireUserStartForm}
            required
          />
        </div>

        <div>
          <label>{texts.lastName}</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={fireUserStartForm}
            required
          />
        </div>

        <div>
          <label>{texts.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={fireUserStartForm}
            required
          />
        </div>

        <div>
          <label>{texts.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={fireUserStartForm}
            required
            pattern="^01\d{9}$"
            inputMode="numeric"
            placeholder="01xxxxxxxxx"
            className={phoneError ? "error-input" : ""}
          />
          {phoneError && <p className="error-text">{phoneError}</p>}
        </div>

        <div>
          <label>{texts.city}</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={fireUserStartForm}
            required
          />
        </div>

        <div>
          <label>{texts.state}</label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            onFocus={fireUserStartForm}
            required
          />
        </div>

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
            <span>
              {texts.qty}: <b>{product.qty}</b>
            </span>
            <p>
              {product.price.toLocaleString()} {currency}
            </p>
          </div>
        </div>

        <hr />
        <div>
          <span>{texts.subtotal}</span>
          <span>
            {totalPrice.toLocaleString()} {currency}
          </span>
        </div>

        <hr />
        <div>
          <span>{texts.total}</span>
          <span>
            {totalPrice.toLocaleString()} {currency}
          </span>
        </div>
      </div>
    </section>
  );
}
