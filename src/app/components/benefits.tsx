'use client';
import Image from "next/image";
import Compatible from '../assets/images/Compatible.svg';
import Durable from '../assets/images/Durable.svg';
import Monitors from '../assets/images/Monitors.svg';
import Effective from '../assets/images/Effective.svg';
import users from '../assets/images/users.svg';

import Resistant from '../assets/images/Resistant.png';
import DualScreen from '../assets/images/DualScreen.png';
import Partnership from '../assets/images/Partnership.png';
import FastResponse from '../assets/images/FastResponse.png';
import Sizes from '../assets/images/Sizes.png';

import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

type BenefitItem = {
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  img?: string;
};

export default function Benefits() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const pathname = usePathname();
  const isTACTPanel = pathname.includes("tact-panel");

  const tactPanelBenefits: BenefitItem[] = [
    {
      img: Resistant,
      title: { en: "Break resistant", ar: "ضد الكسر" },
      desc: {
        en: "Designed to resist shocks impacts and ensure long-lasting performance.",
        ar: "مصممة لتكون مقاومة للكسر وتتحمل الاستخدام الطويل.",
      },
    },
    {
      img: DualScreen,
      title: { en: "Two Screens in One", ar: "شاشتين في شاشة" },
      desc: {
        en: "Can work as an interactive Screen or a regular TV with internal receiver.",
        ar: "يمكن أن تعمل كشاشة تفاعلية أو شاشة تلفزيون عادية.",
      },
    },
    {
      img: Partnership,
      title: { en: "AOI Partnership", ar: "شراكة استراتيجية" },
      desc: {
        en: "Manufactured in collaboration with the Arab Organization for Industrialization.",
        ar: "تصنع بالتعاون مع الهيئة العربية للتصنيع.",
      },
    },
    {
      img: FastResponse,
      title: { en: "Ultra-Fast Response", ar: "سرعة استجابة عالية" },
      desc: {
        en: "Less than 7ms response time for smooth and accurate interaction.",
        ar: "سرعة استجابة أقل من ٧ مللي ثانية لتفاعل دقيق وسلس.",
      },
    },
    {
      img: Sizes,
      title: { en: "Up to 98 inch", ar: "مقاسات وإصدارات متعددة" },
      desc: {
        en: "Available in multiple sizes and models to fit all environments.",
        ar: "مقاسات تصل حتى ٩٨ بوصة وإصدارات متعددة بإمكانيات مختلفة.",
      },
    },
  ];

  const defaultBenefits: BenefitItem[] = [
    {
      img: Durable,
      title: { en: "Durable", ar: "متين" },
      desc: {
        en: "Unlike electronic boards that are easily damaged with wear and tear.",
        ar: "على عكس الألواح الإلكترونية التي تتعرض للتلف بسهولة مع الاستخدام.",
      },
    },
    {
      img: Compatible,
      title: { en: "Compatible", ar: "متوافق" },
      desc: {
        en: "Works with any Projector, any TV screen, any software.",
        ar: "يعمل مع أي جهاز عرض أو شاشة تلفزيون مسطحة، يتوافق مع أي تطبيق كمبيوتر ويسهل التحرك به.",
      },
    },
    {
      img: Monitors,
      title: { en: "Large Monitors", ar: "مساحة تفاعلية ضخمة" },
      desc: {
        en: "Transforms large screens into a fast and accurate interactive surface up to 150 inches.",
        ar: "يحول أي مساحة عرض إلى سطح تفاعلي سريع ودقيق، يصل إلي ١٥٠ بوصة.",
      },
    },
    {
      img: Effective,
      title: { en: "Cost Effective", ar: "سعر تنافسي" },
      desc: {
        en: "Costs less than half the price of an electronic board.",
        ar: "موفر مقارنة بالحلول التفاعلية الأخرى كالشاشات التفاعلية والسبورات الذكية.",
      },
    },
    {
      img: users,
      title: { en: "Up to 4 users", ar: "حتى 4 مستخدمين" },
      desc: {
        en: "Up to 4 users can interact simultaneously.",
        ar: "عدد المستخدمين المتفاعلين في نفس الوقت يمكن أن يصل إلى 4 مستخدمين.",
      },
    },
  ];

  const benefitsToShow = isTACTPanel ? tactPanelBenefits : defaultBenefits;

  return (
    <section
      className="benefits"
      dir={isAr ? "rtl" : "ltr"}
      style={{ textAlign: isAr ? "right" : "left" }}
    >
      <h1>
        {isAr
          ? isTACTPanel
            ? "مميزات شاشات تاكت التفاعلية"
            : "مميزات تاكت"
          : isTACTPanel
          ? "TACT PANEL Benefits"
          : "TACT Benefits"}
      </h1>

      <div className="benefits-boxes">
        {benefitsToShow.map((item, index) => (
          <div key={index} style={{ minHeight: 100 }}>
            {item.img && (
              <div style={{ width: 60, height: 60, position: "relative" }}>
                <Image
                  src={item.img}
                  alt={item.title[language]}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <h4 style={{ marginTop: 10 }}>{item.title[language]}</h4>
            <p style={{ fontSize: 14, color: "#555" }}>{item.desc[language]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
