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
      text: `You will be in a great community that will help maximize your educational and communication skills. Supporting you to deliver the right information to the right audience by the right tools.`,
    },
    ar: {
      title: (
        <>
          <span>انضم</span> إلى عملاء متميزين
        </>
      ),
      text: `ستكون ضمن مجتمع رائع يساعدك على تطوير مهاراتك التعليمية والتواصلية، ويدعمك لتقديم المعلومة الصحيحة للجمهور المناسب باستخدام الأدوات المناسبة.`,
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
