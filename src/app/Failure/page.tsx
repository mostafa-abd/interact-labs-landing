"use client";
import { useEffect, useState } from "react";
import "../assets/css/thanks.css";
import Image from "next/image";
import FailureImg from "../assets/images/Failure.svg";

export const runtime = "edge";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Failure() {
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

    // إرسال الإيميل
    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: parsed.firstName || "Unknown",
        lastName: parsed.lastName || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        city: parsed.city || "",
        state: parsed.state || "",
        productName: parsed.product?.item || "Unknown Product",
        quantity: parsed.product?.quantity || 1,
        price: parsed.product?.price || 0,
        totalPrice: parsed.product?.totalPrice || 0,
        paymentStatus: "Unpaid",
        transactionId,
      }),
    });

    // تسجيل حدث في dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "payment_failed",
      transaction_id: transactionId,
      currency: parsed.currency || "EGP",
      totalPrice: parsed.totalPrice || 0,
      payment_method: "Unpaid",
      customer: {
        firstName: parsed.firstName || "Unknown",
        lastName: parsed.lastName || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        city: parsed.city || "",
        state: parsed.state || "",
      },
      product: {
        name: parsed.product?.item || "Unknown Product",
        qty: parsed.product?.quantity || 1,
        price: parsed.product?.price || 0,
      },
    });
  }, []);

  if (!orderData) return <p>Loading ...</p>;

  return (
    <section className="thanks">
      <div>
        <Image src={FailureImg} alt="Interact Labs Failure" priority />
      </div>

      <h1>حدث خطأ في الدفع ولكن تم استلام طلبك</h1>
      <p>
        عذرًا، لم يتم الدفع بنجاح لطلبك، {orderData.firstName} {orderData.lastName}!
      </p>
      <p>ولكن تم استلام طلبك وسيتم التواصل معك قريباً.</p>
      <p>
        إذا كانت لديك أي أسئلة، تواصل معنا على{" "}
        <a href="mailto:info@interact-labs.com">info@interact-labs.com</a>
      </p>
    </section>
  );
}
