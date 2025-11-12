"use client";
import { useEffect, useState } from "react";
import "../assets/css/thanks.css";
import Image from "next/image";
import ThanksImg from "../assets/images/thanks.svg";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks",
  description: "thanks",
};



export const runtime = "edge";

export default function Thanks() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (data) {
      const parsedData = JSON.parse(data);
      setOrderData(parsedData);

      fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsedData, paymentStatus: parsedData.paymentStatus === "COD" ? "COD" : "SUCCESS" }),
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
      <p>شكراً لطلبك، {orderData.firstName} {orderData.lastName}!</p>
      <p>تم استلام طلبك وسيتم التواصل معك قريباً.</p>
    </section>
  );
}
