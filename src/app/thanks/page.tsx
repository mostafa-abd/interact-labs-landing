"use client";
import { useSearchParams } from "next/navigation";
import "../assets/css/thanks.css";
import Image from "next/image";
import ThanksImg from "../assets/images/thanks.svg";

export default function Thanks() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success") === "true";
  const errorOccurred = searchParams.get("error_occured") === "true";
  const errorMessage = searchParams.get("data.message");
  const amount = Number(searchParams.get("amount_cents") || "0") / 100;
  const currency = searchParams.get("currency") || "EGP";
  const orderId = searchParams.get("order");
  const txnCode = searchParams.get("txn_response_code");
  const cardType = searchParams.get("source_data.sub_type");
  const cardLast4 = searchParams.get("source_data.pan");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");

  return (
    <section className="thanks">
      <div>
        <Image src={ThanksImg} alt="Interact Labs Thanks" />
      </div>

      <h1>{success ? "✅ العملية نجحت" : "❌ العملية فشلت"}</h1>
      <ul>
        <li><strong>الاسم:</strong> {name}</li>
        <li><strong>الإيميل:</strong> {email}</li>
        <li><strong>رقم الموبايل:</strong> {phone}</li>
        <li><strong>العنوان:</strong> {address}</li>
        <li><strong>رقم الطلب:</strong> {orderId}</li>
        <li><strong>المبلغ:</strong> {amount} {currency}</li>
        <li><strong>نوع الكارت:</strong> {cardType}</li>
        <li><strong>آخر ٤ أرقام:</strong> {cardLast4}</li>
        <li><strong>كود العملية:</strong> {txnCode}</li>
        {errorOccurred && errorMessage && (
          <li><strong>سبب الفشل:</strong> {decodeURIComponent(errorMessage)}</li>
        )}
      </ul>

      {!success && <p>يرجى مراجعة البيانات أو المحاولة مرة تانية.</p>}
    </section>
  );
}
