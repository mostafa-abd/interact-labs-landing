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

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) return;

    const parsedData = JSON.parse(data);
    setOrderData(parsedData);

    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsedData,
        paymentStatus: parsedData.paymentStatus === "COD" ? "COD" : "SUCCESS",
      }),
    });

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        item: parsedData.productName || "",
        item_id: parsedData.productName || "",
        quantity: parsedData.quantity || 1,
        price: parsedData.price || 0,
        currency: "EGP", 
        payment_status: parsedData.paymentStatus || "SUCCESS",
      });
    }
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
