"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Statics() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";

  const staticsData = [
    { number: "+300", title: { en: "Educational institution", ar: "مؤسسة تعليمية" } },
    { number: "+30", title: { en: "University", ar: "جامعة" } },
    { number: "+1264", title: { en: "Teacher", ar: "معلم" } },
  ];

  return (
    <section className="statics" dir={isAr ? "rtl" : "ltr"}>
      <h1>{isAr ? "إنجازاتنا" : "Our Achievements"}</h1>
      {staticsData.map((item, index) => (
        <div key={index}>
          <span>{item.number}</span>
          <span>{item.title[language]}</span>
        </div>
      ))}
    </section>
  );
}
