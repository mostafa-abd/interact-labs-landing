"use client";

import { useLanguage } from "../context/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function Statics() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  const staticsData = [
        { number: 1264, title: { en: "Teacher", ar: "مدرس" } },

    { number: 300, title: { en: "Educational institution", ar: "مؤسسة تعليمية" } },
    { number: 30, title: { en: "University", ar: "جامعة" } },
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

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds total animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate new counts without triggering reflow
      const newCounts = staticsData.map((item) => {
        const end = item.number;
        const start = Math.max(0, end - 50);
        // Ease out function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        return Math.floor(start + (end - start) * easedProgress);
      });

      // Update state once per frame to minimize reflows
      setCounts(newCounts);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [startCount]);

  return (
    <section
      ref={sectionRef}
      className="statics"
      dir={isAr ? "rtl" : "ltr"}
      style={{ textAlign: "center"}}
    >
      <h1>{isAr ? "عملائنا" : "Our clients"}</h1>
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
