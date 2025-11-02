"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";

export default function Feedback() {
const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [swiperKey, setSwiperKey] = useState(dir);
  useEffect(() => {
    setSwiperKey(dir);
  }, [dir]);

  const feedbacks = isAr
    ? [
        {
          title: "الشاشة ممتازة والتعامل راقي جدًا",
          text: "الشاشة ممتازة ما شاء الله والتعامل فوق الممتاز، والمهندس محترم جدًا وقمة في الأدب ورُقي التعامل. متشكر لكم جدًا وإن شاء الله مش آخر تعامل.",
          name: "عميل سعيد",
        },
        {
          title: "تجربة رائعة من البداية للنهاية",
          text: "أحب أشكر المهندس باسم والمهندس محمد سامح على تعاونهم من أول معرفة الشاشة حتى استلامها والتدريب عليها. الشاشة رائعة وسهلة الاستخدام والخامات قوية جدًا. شكراً لكم جميعاً.",
          name: "م. أحمد علي",
        },
        {
          title: "جهاز ممتاز وشركة محترمة",
          text: "جهاز ممتاز وسعر مقابل قيمة، والأهم أن الشركة محترمة والموظفين محترفين سواء في شرح الاستخدام أو في خدمة ما بعد البيع.",
          name: "أ. خالد حسن",
        },
        {
          title: "جودة عالية وتعامل راقٍ",
          text: "الشاشة رائعة وسهلة الاستخدام والخامات قوية تتحمل الشغل بسم الله ما شاء الله، والمهندسين قمة في الذوق والمهنية. شكراً لكم.",
          name: "م. سارة عبد الرحمن",
        },
        {
          title: "أداة للإبداع والتميز",
          text: "ببساطة هو جهاز بيعبر عن أداة للمجهود الإبداعي الناجح، هدفه احترافية عرض وشرح المحتوى والتدريس التفاعلي.",
          name: "د. مصطفى فؤاد",
        },
      ]
    : [
        {
          title: "Excellent screen and professional service",
          text: "The screen is amazing, and the service is outstanding. The engineer was very polite and respectful. Thank you so much, and I’m sure it won’t be our last deal.",
          name: "Happy Client",
        },
        {
          title: "Great experience from start to finish",
          text: "I would like to thank Engineer Basem and Engineer Mohamed Sameh for their support from the beginning till installation and training. The screen is fantastic, easy to use, and made of durable materials. Thank you all.",
          name: "Eng. Ahmed Ali",
        },
        {
          title: "Excellent device and professional company",
          text: "An excellent device with great value for money. The company is very professional, and the staff are experts in both device usage and after-sales service.",
          name: "Mr. Khaled Hassan",
        },
        {
          title: "High quality and elegant service",
          text: "The screen is superb, smooth to use, and built with strong materials. The engineers are very polite and professional. Thank you all.",
          name: "Eng. Sara Abdelrahman",
        },
        {
          title: "A tool for creative excellence",
          text: "Simply a device that represents a tool for creative success, designed for professional content presentation and interactive teaching.",
          name: "Dr. Mostafa Fouad",
        },
      ];

  return (
    <section className="feedback" dir={dir}>
      <Swiper
        key={swiperKey}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        spaceBetween={15}
        className="mySwiper"
        style={{
          direction: dir,
          padding: "10px 0",
        }}
      >
        {feedbacks.map((fb, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "320px", // كل كارت عرضه ثابت
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h1 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{fb.title}</h1>
            <div className="Stars" style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={17} />
              ))}
            </div>
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "10px" }}>{fb.text}</p>
            <div className="feed-profile">
              <h4 style={{ fontWeight: "bold" }}>{fb.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
