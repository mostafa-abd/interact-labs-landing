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

  return (
    <section className="thanks">
      <div>
        <Image src={ThanksImg} alt="Interact Labs Thanks" />
      </div>

      {success ? (
        <>
          <h1>تم تأكيد طلبك</h1>
          <p>
            شكراً لطلبك! تم استلام مبلغ <strong>{amount} {currency}</strong> بنجاح.
            رقم الطلب: <strong>{orderId}</strong>
          </p>
          <p>طلبك بيتعالج دلوقتي، وهيوصلك إيميل فيه تفاصيل التوصيل قريب.</p>
        </>
      ) : (
        <>
          <h1>فيه مشكلة في الدفع</h1>
          <p>
            للأسف العملية ما اكتملتش.
            {errorOccurred && errorMessage ? (
              <>
                <br />
                السبب: <strong>{decodeURIComponent(errorMessage)}</strong>
              </>
            ) : (
              <> يرجى المحاولة مرة تانية أو التواصل مع الدعم الفني.</>
            )}
          </p>
        </>
      )}
    </section>
  );
}
