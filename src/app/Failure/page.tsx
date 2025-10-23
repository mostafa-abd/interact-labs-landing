"use client";
import "../assets/css/thanks.css";
import Image from "next/image";
import FailureImg from "../assets/images/Failure.svg";

export default function Failure() {
  return (
    <section className="thanks">
        <div>
                  <Image
        src={FailureImg}
        alt="Interact Labs Failure"
        priority
      />
        </div>
              <h1>Oh no, your payment failed</h1>
     <p>Unfortunately, the payment for this order has failed.
Please check your payment method and try again.</p>
<br/>
<p>If you have any questions, send us a message in the live chat or contact us at <a href="mailto:info@interact-labs.com">info@interact-labs.com</a></p>
    </section>
  );
}
