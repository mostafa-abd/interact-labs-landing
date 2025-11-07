"use client";

import Image from "next/image";
import JoinImage from "../assets/images/Join.svg";
import { useLanguage } from "../context/LanguageContext";

export default function Join() {
  const langContext = useLanguage();
  const language = langContext?.language ?? "en";
  const isAr = language === "ar";

  const content = {
    en: {
      title: (
        <>
          <span>Join</span> High Performing Clients
        </>
      ),
      text: `You will be in a great community that will help maximize your educational and communication skills. Supporting you to deliver to the right information to the right audience by the right tool. 
`,
    },
    ar: {
      title: (
        <>
          <span>انضم</span> إلى عملاء وعائلة تاكت
        </>
      ),
      text: `في عائلة تاكت، سوف نساعدك على زيادة مهارات التواصل والعرض والتعليم، ودعمك في إيصال المعلومات إلى الجمهور المناسب باستخدام الأدوات والتطبيقات المناسبة`,
    },
  };

  return (
    <section
      className={`join ${isAr ? "rtl" : "ltr"}`}
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      <div>
        <h1>{isAr ? content.ar.title : content.en.title}</h1>
        <p>{isAr ? content.ar.text : content.en.text}</p>
      </div>
      <div>
        <Image src={JoinImage} alt="Join" fill style={{ objectFit: "contain" }} />
      </div>
    </section>
  );
}
