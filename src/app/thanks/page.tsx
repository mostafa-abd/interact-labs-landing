"use client";
import { useEffect, useState } from "react";
import "../assets/css/thanks.css";
import Image from "next/image";
import ThanksImg from "../assets/images/thanks.svg";

export const runtime = "edge";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Thanks() {
  const [orderData, setOrderData] = useState<any>(null);

  const generateTransactionId = () => {
    return "TX-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) return;

    const parsed = JSON.parse(data);
    setOrderData(parsed);

    const transactionId = generateTransactionId();

    const finalPaymentStatus =
      parsed.paymentStatus === "COD" ? "COD" : "SUCCESS";

    // إرسال الإيميل
    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
        city: parsed.city,
        state: parsed.state,
        productName: parsed.product?.item || "Unknown Product",
        quantity: parsed.product?.qty || 1,
        price: parsed.product?.price || 0,
        paymentStatus: finalPaymentStatus,
        transactionId,
      }),
    });

    // تسجيل حدث في dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "payment_success",
      transaction_id: transactionId,
      currency: parsed.currency || "EGP",
      totalPrice: parsed.totalPrice || 0,
      payment_method:
        parsed.paymentStatus === "COD" ? "Cash on Delivery" : "Online",
      customer: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
        city: parsed.city,
        state: parsed.state,
      },
      product: {
        name: parsed.product?.name || "Unknown Product",
        qty: parsed.product?.qty || 1,
        price: parsed.product?.price || 0,
      },
    });
  }, []);

  if (!orderData) return <p>Loading ...</p>;

  return (
    <section className="thanks">
      <div>
        <Image src={ThanksImg} alt="Interact Labs Thanks" />
      </div>

      <h1>تم تأكيد طلبك</h1>
      <p>
        شكراً لطلبك، {orderData.firstName} {orderData.lastName}!
      </p>
      <p>تم استلام طلبك وسيتم التواصل معك قريباً.</p>
    </section>
  );
}
