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

  // 🔥 Create unique transaction ID
  const generateTransactionId = () => {
    return "TX-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) return;

    const parsed = JSON.parse(data);
    setOrderData(parsed);

    const transactionId = generateTransactionId();

    // لو Online → يبقى الدفع ناجح
    const finalPaymentStatus =
      parsed.paymentStatus === "COD" ? "COD" : "SUCCESS";

    // 📩 إرسال الإيميل
    fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed,
        transactionId,
        paymentStatus: finalPaymentStatus,
      }),
    });

    // ================================
    // 📊 FIRE payment_success EVENT
    // ================================
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "payment_success",
        transaction_id: transactionId,
        currency: parsed.currency || "EGP",
        totalPrice: parsed.totalPrice,
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
          name: parsed.product.name,
          qty: parsed.product.qty,
          price: parsed.product.price,
        },
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
