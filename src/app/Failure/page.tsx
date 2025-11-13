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

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) return;

    const parsedData = JSON.parse(data);
    setOrderData(parsedData);

    // إرسال الإيميل
    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsedData, paymentStatus: "Unpaid" }),
    });

    // Push لحدث GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase_failed",
        item: parsedData.productName || "",
        item_id: parsedData.productName || "",
        quantity: parsedData.quantity || 1,
        price: parsedData.price || 0,
        currency: "EGP",
        payment_status: "Unpaid",
      });
    }
  }, []);

  return (
    <section className="thanks">
      <div>
        <Image src={FailureImg} alt="Interact Labs Failure" priority />
      </div>
      <h1>حدث خطأ في الدفع</h1>
      <p>عذرًا، لم يتم الدفع بنجاح لطلبك </p>
      <p>ولكن تم استلام طلبك وسيتم التواصل معك قريباً</p>
      <p>
        إذا كانت لديك أي أسئلة، تواصل معنا على{" "}
        <a href="mailto:info@interact-labs.com">info@interact-labs.com</a>
      </p>
    </section>
  );
}
