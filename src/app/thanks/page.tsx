"use client";
import "../assets/css/thanks.css";
import Image from "next/image";
import ThanksImg from "../assets/images/thanks.svg";

export default function Thanks() {
  return (
    <section className="thanks">
        <div>
                  <Image
        src={ThanksImg}
        alt="Interact Labs Thanks"
        priority
      />
        </div>
              <h1>Your order is confirmed</h1>
     <p>Your order is currently being processed. You will receive an email shortly with the expected delivery date. </p>
    </section>
  );
}
