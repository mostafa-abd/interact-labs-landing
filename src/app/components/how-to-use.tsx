'use client'

import { useLanguage } from "../context/LanguageContext";

export default function HowToUse() {
const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";

  const content = {
    warranty: {
      en: {
        title: "Warranty",
        description:
          "We offer limited warranty to repair or replace any defective material or component. It does not cover any issues due to normal wear and tear, misuse or loss/theft of the TACT.",
      },
      ar: {
        title: "الضمان",
        description:
          "نحن نقدم ضمانًا محدودًا لإصلاح أو استبدال أي مادة أو مكون معيب. لا يشمل أي مشاكل ناتجة عن الاستخدام العادي أو الإهمال أو فقدان/سرقة الجهاز.",
      },
    },
    howToUse: {
      en: {
        title: "How to use",
        steps: [
          "Put TACT in fixed or portable position.",
          "Point TACT to the Screen or the projected area.",
          "Connect TACT to your computer/laptop.",
          "Connect your computer/laptop to a screen or projector.",
        ],
      },
      ar: {
        title: "طريقة الاستخدام",
        steps: [
          "ضع جهاز TACT في مكان ثابت أو محمول.",
          "وجه TACT إلى الشاشة أو المنطقة المعروضة.",
          "قم بتوصيل TACT بجهاز الكمبيوتر/اللابتوب الخاص بك.",
          "قم بتوصيل جهاز الكمبيوتر/اللابتوب بشاشة أو جهاز عرض.",
        ],
      },
    },
  };

  return (
    <section className="how-to-use" dir={isAr ? "rtl" : "ltr"} style={{ textAlign: isAr ? "right" : "left" }}>
      <div>
        <h2>{content.warranty[language].title}</h2>
        <p>{content.warranty[language].description}</p>
      </div>
      <div>
        <h2>{content.howToUse[language].title}</h2>
        <ol>
          {content.howToUse[language].steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
