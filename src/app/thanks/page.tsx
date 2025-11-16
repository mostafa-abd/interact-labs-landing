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
  const [emailStatus, setEmailStatus] = useState<string>("pending");

  // 🔥 Create unique transaction ID
  const generateTransactionId = () => {
    return "TX-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (!data) {
      console.error("No checkout data found in sessionStorage");
      setEmailStatus("no-data");
      return;
    }

    const parsed = JSON.parse(data);
    setOrderData(parsed);

    const transactionId = generateTransactionId();

    const finalPaymentStatus =
      parsed.paymentStatus === "COD" ? "COD" : "SUCCESS";

    // 🔹 DEBUG: طباعة البيانات قبل الإرسال
    console.log("Sending email with payload:", {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      productName: parsed.product?.name,
      quantity: parsed.product?.qty,
      price: parsed.product?.price,
      paymentStatus: finalPaymentStatus,
      transactionId,
    });

    // 📩 إرسال الإيميل
    const sendEmail = async () => {
      try {
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: parsed.firstName,
            lastName: parsed.lastName,
            email: parsed.email,
            phone: parsed.phone,
            city: parsed.city,
            state: parsed.state,
            productName: parsed.product?.name,
            quantity: parsed.product?.qty,
            price: parsed.product?.price,
            paymentStatus: finalPaymentStatus,
            transactionId,
          }),
        });

        const result = await res.json();
        console.log("Email send response:", result);

        if (res.ok) {
          setEmailStatus("sent");
        } else {
          setEmailStatus("error");
          console.error("Email API returned error:", result);
        }
      } catch (err) {
        setEmailStatus("error");
        console.error("Email sending failed:", err);
      }
    };

    sendEmail();

    // ================================
    // 📊 FIRE payment_success EVENT
    // ================================
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
        name: parsed.product?.name,
        qty: parsed.product?.qty,
        price: parsed.product?.price,
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

      {emailStatus === "pending" && <p>جارٍ إرسال البريد الإلكتروني...</p>}
      {emailStatus === "sent" && <p>تم إرسال البريد الإلكتروني بنجاح ✅</p>}
      {emailStatus === "error" && <p>فشل إرسال البريد الإلكتروني ❌ تحقق من الكونصول</p>}
      {emailStatus === "no-data" && <p>لا توجد بيانات لإرسال البريد الإلكتروني</p>}
    </section>
  );
}
