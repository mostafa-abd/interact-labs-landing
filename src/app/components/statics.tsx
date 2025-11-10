"use client";

import { useLanguage } from "../context/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function Statics() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  const staticsData = [
    { number: 300, title: { en: "Educational institution", ar: "مؤسسة تعليمية" } },
    { number: 30, title: { en: "University", ar: "جامعة" } },
    { number: 1264, title: { en: "Teacher", ar: "مدرس" } },
  ];

  const [counts, setCounts] = useState(staticsData.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const intervals = staticsData.map((item, i) => {
      const end = item.number;
      const start = Math.max(0, end - 50);
      const step = Math.ceil((end - start) / 50); 
      let current = start;

      const interval = setInterval(() => {
        current += step;
        if (current >= end) {
          current = end;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = current;
          return newCounts;
        });
      }, 30);

      return interval;
    });

    return () => intervals.forEach((int) => clearInterval(int));
  }, [startCount]);

  return (
    <section
      ref={sectionRef}
      className="statics"
      dir={isAr ? "rtl" : "ltr"}
      style={{ textAlign: "center", padding: "60px 0" }}
    >
      <h1>{isAr ? "إنجازاتنا" : "Our Achievements"}</h1>
      {staticsData.map((item, index) => (
        <div key={index} style={{ margin: "20px 0" }}>
          <span style={{ fontSize: "2rem", fontWeight: "bold", display: "block" }}>
            +{counts[index]}
          </span>
          <span>{item.title[language]}</span>
        </div>
      ))}
    </section>
  );
}
