'use client'

import Image from "next/image";
import Compatible from '../assets/images/Compatible.svg';
import Durable from '../assets/images/Durable.svg';
import Monitors from '../assets/images/Monitors.svg';
import Effective from '../assets/images/Effective.svg';
import users from '../assets/images/users.svg';
import { useLanguage } from "../context/LanguageContext";

export default function Benefits() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const benefitsContent = [
    {
      img: Durable,
      alt: {
        en: "Unlike electronic boards that are easily damaged with wear and tear.",
        ar: "على عكس الألواح الإلكترونية التي تتعرض للتلف بسهولة مع الاستخدام."
      },
      title: { en: "Durable", ar: "متين" },
      desc: {
        en: "Unlike electronic boards that are easily damaged with wear and tear.",
        ar: "على عكس الألواح الإلكترونية التي تتعرض للتلف بسهولة مع الاستخدام."
      },
    },
    {
      img: Compatible,
      alt: {
        en: "Works with any Projector, any TV screen, any software.",
        ar: "يعمل مع أي جهاز عرض، أي شاشة تلفاز، وأي برنامج."
      },
      title: { en: "Compatible", ar: "متوافق" },
      desc: {
        en: "Works with any Projector, any TV screen, any software.",
        ar: "يعمل مع أي جهاز عرض، أي شاشة تلفاز، وأي برنامج."
      },
    },
    {
      img: Monitors,
      alt: {
        en: "Transforms large screens/monitors into a fast and accurate interactive surface up to 150 inches.",
        ar: "حوّل الشاشات الكبيرة إلى سطح تفاعلي سريع ودقيق يصل إلى 150 بوصة."
      },
      title: { en: "Large Monitors", ar: "شاشات كبيرة" },
      desc: {
        en: "Transforms large screens/monitors into a fast and accurate interactive surface up to 150 inches.",
        ar: "حوّل الشاشات الكبيرة إلى سطح تفاعلي سريع ودقيق يصل إلى 150 بوصة."
      },
    },
    {
      img: Effective,
      alt: {
        en: "Cost less than half the price of an electronic board.",
        ar: "تكلف أقل من نصف سعر اللوح الإلكتروني."
      },
      title: { en: "Cost Effective", ar: "فعّال من حيث التكلفة" },
      desc: {
        en: "Cost less than half the price of an electronic board.",
        ar: "تكلف أقل من نصف سعر اللوح الإلكتروني."
      },
    },
    {
      img: users,
      alt: {
        en: "The number of interacting users at the same time can reach 4 users",
        ar: "عدد المستخدمين المتفاعلين في نفس الوقت يمكن أن يصل إلى 4 مستخدمين"
      },
      title: { en: "Up to 4 users", ar: "حتى 4 مستخدمين" },
      desc: {
        en: "The number of interacting users at the same time can reach 4 users",
        ar: "عدد المستخدمين المتفاعلين في نفس الوقت يمكن أن يصل إلى 4 مستخدمين"
      },
    },
  ];

  return (
    <section className="benefits" dir={isAr ? "rtl" : "ltr"} style={{ textAlign: isAr ? "right" : "left" }}>
      <h1>{isAr ? "فوائد TACT" : "TACT Benefits"}</h1>
      <div className="benefits-boxes">
        {benefitsContent.map((item, index) => (
          <div key={index}>
            <span>
              <Image src={item.img} alt={item.alt[language]} />
            </span>
            <h4>{item.title[language]}</h4>
            <p>{item.desc[language]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
