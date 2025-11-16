"use client";
import { useEffect, useState } from "react";
import "../assets/css/thanks.css";
import Image from "../assets/images/Failure.svg";

export const runtime = "edge";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Failure() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) return;

    const parsedData = JSON.parse(data);
    setOrderData(parsedData);

    // Push event GTM مع كل البيانات من السيشن + transaction_id
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase_failed",
        transaction_id: parsedData.transaction_id || null,
        product: parsedData.product || {},
        customer: {
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          email: parsedData.email,
          phone: parsedData.phone,
          city: parsedData.city,
          state: parsedData.state,
        },
        payment_status: "Unpaid",
        totalPrice: parsedData.totalPrice,
        currency: parsedData.currency || "EGP",
      });
    }

    // إرسال الإيميل
    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsedData, paymentStatus: "Unpaid" }),
    });
  }, []);

  return (
    <section className="thanks">
      <div>
        <Image src={FailureImg} alt="Interact Labs Failure" priority />
      </div>
      <h1>حدث خطأ في الدفع ولكن تم استلام طلبك</h1>
      <p>عذرًا، لم يتم الدفع بنجاح لطلبك </p>
      <p>ولكن تم استلام طلبك وسيتم التواصل معك قريباً</p>
      <p>
        إذا كانت لديك أي أسئلة، تواصل معنا على{" "}
        <a href="mailto:info@interact-labs.com">info@interact-labs.com</a>
      </p>
    </section>
  );
}
