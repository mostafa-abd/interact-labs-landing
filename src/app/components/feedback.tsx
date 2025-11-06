"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

type FeedbackItem = {
  title: string;
  text: string;
  name: string;
};

export default function Feedback() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const dir = "ltr";

  const pathname = usePathname();
  const isTACTPanel = pathname.includes("tact-panel");

 
  const tactPanelFeedbacks: Record<string, FeedbackItem[]> = {
    ar: [
      {
        title: "الشاشة ممتاذه والتعامل راقي جدًا",
        text: "الشاشه ممتاذه ماشاء الله والتعامل فوق الممتاز بالاضافه أن المهندس راجل محترم جدا جدا وقمه فى الأدب ورقى التعامل ومتشكر لكم جدا جدا وان شاء الله موش اخر تعامل.",
        name: "Mohamed Salem",
      },
      {
        title: "تعاون واحترافية عالية",
        text: "احب اشكر كلا من المهندس باسم والمهندس محمد سامح على تعاونهم من اول البدء على معرفه وامكانيات الشاشه حتى استلامها وتوصلها والتدريب عليها. الشاشة رائعة واستخدامها سلس وسهل والخامات قوية تستحمل الشغل بسم الله ما شاء الله والمهندسين قمة فى الذوق والاحترام والتعاون شكرا لكم جميعا.",
        name: "Eng. Ibrahim Ali - Almohands",
      },
      {
        title: "جودة ممتازة وسهولة في الاستخدام",
        text: "الشاشة رائعة واستخدامها سلس وسهل والخامات قوية تستحمل الشغل بسم الله ما شاء الله والمهندسين قمة فى الذوق والمهنية شكرا.",
        name: "Hosam El Deen Gaber",
      },
    ],
    en: [
      {
        title: "Excellent screen and great service",
        text: "The screen is amazing, Mashallah. Excellent service, and the engineer was very respectful and professional. Thank you so much, and hopefully, it won’t be the last deal.",
        name: "Mohamed Salem",
      },
      {
        title: "Very professional and helpful team",
        text: "I would like to thank Eng. Basem and Eng. Mohamed Sameh for their support from start to delivery and training. The screen is great, easy to use, and made of durable materials. The engineers are very polite and cooperative. Thanks to you all.",
        name: "Eng. Ibrahim Ali - Almohands",
      },
      {
        title: "High quality and smooth usage",
        text: "The screen is excellent, smooth to use, and made from strong materials. The engineers were very professional and polite. Thank you.",
        name: "Hosam El Deen Gaber",
      },
    ],
  };

  const tactFeedbacks: Record<string, FeedbackItem[]> = {
    ar: [
      {
        title: "جهاز عملي ومميز جدًا",
        text: "المُنتج حلو جدا جدا ما شاء الله، وفر عليا كتير في الشغل. تقنية فوق الروعة، بنصح بيه جدا. جهاز عالي جدا مقابل سعر منخفض، والتعامل جميل جدا ما شاء الله، حتى بعد البيع مش بيسيبوك وبيفضلو متابعينك على طول. وشكر خاص جدًا جدًا لأستاذة إيناس بجد تعبت معايا جدًا جدًا، شكرا جدًا أستاذة إيناس، حاجة في منتهى الذوق.",
        name: "Mrwan Mohamed",
      },
      {
        title: "جهاز محترم وخدمة ممتازة",
        text: "شكرا على مجهودكوا كلكم... جهاز محترم صراحة ووفر عليا كتير. واحب اشكر الاستاذة رضوي جدا على حسن تعاملها واهتمامها الدائم والبشمهندسة نيرة على مساعدتها وسرعة استجابتها. شكرا ليكم.",
        name: "Kirolos Boshra",
      },
      {
        title: "جهاز ممتاز وفاق التوقعات",
        text: "الجهاز ممتاز جدا وفاق كل توقعاتي وساعدني جدا أخرج بالجودة اللي كنت حاببها. شكرا للأستاذة رضوى والتيم كله على المجهود الرائع في التعامل فترة ما بعد البيع.",
        name: "Mohamed Abdelsalam",
      },
      {
        title: "خدمة ما بعد البيع محترمة جدًا",
        text: "السلام عليكم، بامانه جهاز محترم. خدمة ما بعد البيع قمة الاحترام والرد على أي مشكلة وحلها بسرعة جدًا. والله شركة محترمة، وفرحان جدًا لأنها مصرية وشباب مصريين فعلاً مقدرين مكانة العميل ووقته. كل الشكر والتقدير لخدمة العملاء.",
        name: "Yasser Ashour",
      },
      {
        title: "جهاز محترم وقيمة مقابل سعر",
        text: "جهاز ممتاز وسعر مقابل قيمة، والأهم الشركة محترمة والموظفين محترفين سواء في شرح استخدام الجهاز أو خدمة ما بعد البيع.",
        name: "Usama M. Al Asfar",
      },
    ],
    en: [
      {
        title: "Amazing and practical device",
        text: "The product is excellent and saved me a lot of effort. It's a fantastic technology, highly recommended! Very high performance for a low price, and great support even after purchase. Special thanks to Ms. Enas for her patience and kindness!",
        name: "Mrwan Mohamed",
      },
      {
        title: "Professional service and great device",
        text: "Thanks for all your effort! The device is really good and saved me a lot. Special thanks to Ms. Radwa for her kind support and Eng. Naira for her fast responses. Appreciate it!",
        name: "Kirolos Boshra",
      },
      {
        title: "Exceeded expectations",
        text: "The device exceeded all my expectations and helped me achieve great results. Many thanks to Ms. Radwa and the whole team for their great after-sales support.",
        name: "Mohamed Abdelsalam",
      },
      {
        title: "Excellent after-sales service",
        text: "Honestly, this device is great! The after-sales support is excellent — quick responses and respectful communication. I'm proud it's an Egyptian company run by professionals who truly care about their customers.",
        name: "Yasser Ashour",
      },
      {
        title: "Professional and valuable device",
        text: "An excellent device with great value for money. The company is very professional, and the team is skilled in usage guidance and after-sales service.",
        name: "Usama M. Al Asfar",
      },
    ],
  };

  const feedbacks = isTACTPanel
    ? tactPanelFeedbacks[language]
    : tactFeedbacks[language];

  return (
    <section className="feedback">
  

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        spaceBetween={15}
        className="mySwiper"
        dir={dir}
        style={{ padding: "10px 0" }}
      >
        {feedbacks.map((fb, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "320px",
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h1 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
              {fb.title}
            </h1>
            <div
              className="Stars"
              style={{ display: "flex", gap: "4px", marginBottom: "8px" }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={17} />
              ))}
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555",
                marginBottom: "10px",
              }}
            >
              {fb.text}
            </p>
            <div className="feed-profile">
              <h4 style={{ fontWeight: "bold" }}>{fb.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
