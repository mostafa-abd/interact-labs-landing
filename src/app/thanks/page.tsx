"use client";
import { useSearchParams } from "next/navigation";
import "../assets/css/thanks.css";
import Image from "next/image";
import ThanksImg from "../assets/images/thanks.svg";

export default function Thanks() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const errorMessage = searchParams.get("data.message");

  return (
    <section className="thanks">
      <div>
        <Image src={ThanksImg} alt="Interact Labs Thanks" />
      </div>
      {success ? (
        <>
          <h1>تم تأكيد طلبك</h1>
          <p>طلبك بيتعالج دلوقتي، وهيوصلك إيميل فيه تفاصيل التوصيل قريب.</p>
        </>
      ) : (
        <>
          <h1>فيه مشكلة في الدفع</h1>
          <p>
            للأسف العملية ما اكتملتش. {errorMessage ? `السبب: ${decodeURIComponent(errorMessage)}` : "يرجى المحاولة مرة تانية أو التواصل مع الدعم."}
          </p>
        </>
      )}
    </section>
  );
}
