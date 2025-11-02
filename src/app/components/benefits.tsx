'use client'

import Image from "next/image";
import Compatible from '../assets/images/Compatible.svg';
import Durable from '../assets/images/Durable.svg';
import Monitors from '../assets/images/Monitors.svg';
import Effective from '../assets/images/Effective.svg';
import users from '../assets/images/users.svg';
import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

export default function Benefits() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const pathname = usePathname();
  const isTACTPanel = pathname.includes("tact-panel");

  const tactPanelBenefits = [
    {
      title: { en: "Unbreakable", ar: "ضد الكسر" },
      desc: {
        en: "Designed to resist impacts and ensure long-lasting performance.",
        ar: "مصممة لتكون مقاومة للكسر وتتحمل الاستخدام الطويل.",
      },
    },
    {
      title: { en: "Two Screens in One", ar: "شاشتين في شاشة" },
      desc: {
        en: "Can work as an interactive screen or a regular TV.",
        ar: "يمكن أن تعمل كشاشة تفاعلية أو شاشة تلفزيون عادية.",
      },
    },
    {
      title: { en: "Made with AOI Cooperation", ar: "تصنع بالتعاون مع الهيئة العربية للتصنيع" },
      desc: {
        en: "Developed in collaboration with the Arab Organization for Industrialization.",
        ar: "تم تطويرها بالتعاون مع الهيئة العربية للتصنيع.",
      },
    },
    {
      title: { en: "Ultra-Fast Response", ar: "سرعة استجابة عالية" },
      desc: {
        en: "Less than 7ms response time for smooth and accurate interaction.",
        ar: "سرعة استجابة أقل من ٧ مللي ثانية لتفاعل دقيق وسلس.",
      },
    },
    {
      title: { en: "Sizes from 55 to 98 inches", ar: "مقاسات تبدأ من ٥٥ بوصة وحتى ٩٨ بوصة" },
      desc: {
        en: "Available in multiple sizes to fit all environments.",
        ar: "تتوفر بمقاسات متعددة تناسب جميع الاستخدامات.",
      },
    },
  ];

  const defaultBenefits = [
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
        ar: "يعمل مع أي جهاز عرض، أي شاشة تلفاز، وأي برنامج.",
      },
    },
    {
      img: Monitors,
      title: { en: "Large Monitors", ar: "شاشات كبيرة" },
      desc: {
        en: "Transforms large screens/monitors into a fast and accurate interactive surface up to 150 inches.",
        ar: "حوّل الشاشات الكبيرة إلى سطح تفاعلي سريع ودقيق يصل إلى 150 بوصة.",
      },
    },
    {
      img: Effective,
      title: { en: "Cost Effective", ar: "فعّال من حيث التكلفة" },
      desc: {
        en: "Costs less than half the price of an electronic board.",
        ar: "تكلف أقل من نصف سعر اللوح الإلكتروني.",
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
      <h1>{isAr ? "مميزات TACT Panel" : "TACT Panel Benefits"}</h1>
      <div className="benefits-boxes" style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {benefitsToShow.map((item, index) => (
          <div key={index} style={{ width: 180, textAlign: "center" }}>
            {item.img && (
              <div style={{ width: 60, height: 60, margin: "0 auto", position: "relative" }}>
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
