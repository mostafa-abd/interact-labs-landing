"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

type FeedbackItem = {
  title: string;
  text: string;
  name: string;
  jobTitle: { en: string; ar: string };
  image: string;
};

export default function Feedback() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const pathname = usePathname();
  const isTACTPanel = pathname.includes("tact-panel");

 
 const tactPanelFeedbacks: Record<string, FeedbackItem[]> = {
    ar: [
      {
        title: "الشاشة ممتاذه والتعامل راقي جدًا",
        text: "الشاشه ممتاذه ماشاء الله والتعامل فوق الممتاز بالاضافه أن المهندس راجل محترم جدا جدا وقمه فى الأدب ورقى التعامل ومتشكر لكم جدا جدا وان شاء الله موش اخر تعامل.",
        name: "Mohamed Salem",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar1.png",
      },
      {
        title: "تعاون واحترافية عالية",
        text: "احب اشكر كلا من المهندس باسم والمهندس محمد سامح على تعاونهم من اول البدء على معرفه وامكانيات الشاشه حتى استلامها وتوصلها والتدريب عليها. الشاشة رائعة واستخدامها سلس وسهل والخامات قوية تستحمل الشغل بسم الله ما شاء الله والمهندسين قمة فى الذوق والاحترام والتعاون شكرا لكم جميعا.",
        name: "Eng. Ibrahim Ali - Almohands",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar2.png",
      },
      {
        title: "جودة ممتازة وسهولة في الاستخدام",
        text: "الشاشة رائعة واستخدامها سلس وسهل والخامات قوية تستحمل الشغل بسم الله ما شاء الله والمهندسين قمة فى الذوق والمهنية شكرا.",
        name: "Hosam El Deen Gaber",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar3.png",
      },
      {
        title: "شغل محترم وخدمة عملاء مميزة",
        text: "شغل محترم وخدمة عملاء مميزه.",
        name: "مستر محمد شفيق",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar4.png",
      },
    ],
    en: [
      {
        title: "Excellent screen and great service",
        text: "The screen is amazing, Mashallah. Excellent service, and the engineer was very respectful and professional. Thank you so much, and hopefully, it won’t be the last deal.",
        name: "Mohamed Salem",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar1.png",
      },
      {
        title: "Very professional and helpful team",
        text: "I would like to thank Eng. Basem and Eng. Mohamed Sameh for their support from start to delivery and training. The screen is great, easy to use, and made of durable materials. The engineers are very polite and cooperative. Thanks to you all.",
        name: "Eng. Ibrahim Ali - Almohands",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar2.png",
      },
      {
        title: "High quality and smooth usage",
        text: "The screen is excellent, smooth to use, and made from strong materials. The engineers were very professional and polite. Thank you.",
        name: "Hosam El Deen Gaber",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar3.png",
      },
      {
        title: "Highly recommended product",
        text: "A great product for those who really want an interactive screen to work with, this makes your courses, explainers, meetings, etc. way more productive, definitely recommending it!",
        name: "Shady Manaa",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar5.png",
      },
      {
        title: "Professional work and excellent customer service",
        text: "Professional work and excellent customer service",
        name: "Mr. Mohamed Shafik",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar6.png",
      },
    ],
  };

  // === TACT Feedback ===
  const tactFeedbacks: Record<string, FeedbackItem[]> = {
    ar: [
      {
        title: "جهاز عملي ومميز جدًا",
        text: "المُنتج حلو جدا جدا ما شاء الله، وفر عليا كتير في الشغل. تقنية فوق الروعة، بنصح بيه جدا. جهاز عالي جدا مقابل سعر منخفض، والتعامل جميل جدا ما شاء الله، حتى بعد البيع مش بيسيبوك وبيفضلو متابعينك على طول. وشكر خاص جدًا جدًا لأستاذة إيناس بجد تعبت معايا جدًا جدًا، شكرا جدًا أستاذة إيناس، حاجة في منتهى الذوق.",
        name: "مروان محمد",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Marwan.jpeg",
      },
      {
        title: "جهاز محترم وخدمة ممتازة",
        text: "شكرا على مجهودكوا كلكم... جهاز محترم صراحة ووفر عليا كتير. واحب اشكر الاستاذة رضوي جدا على حسن تعاملها واهتمامها الدائم والبشمهندسة نيرة على مساعدتها وسرعة استجابتها. شكرا ليكم.",
        name: "Kirolos Boshra",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar8.png",
      },
      {
        title: "جهاز ممتاز وفاق التوقعات",
        text: "الجهاز ممتاز جدا وفاق كل توقعاتي وساعدني جدا أخرج بالجودة اللي كنت حاببها. شكرا للأستاذة رضوى والتيم كله على المجهود الرائع في التعامل فترة ما بعد البيع.",
        name: "Mohamed Abdelsalam",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar9.png",
      },
      {
        title: "خدمة ما بعد البيع محترمة جدًا",
        text: "السلام عليكم، بامانه جهاز محترم. خدمة ما بعد البيع قمة الاحترام والرد على أي مشكلة وحلها بسرعة جدًا. والله شركة محترمة، وفرحان جدًا لأنها مصرية وشباب مصريين فعلاً مقدرين مكانة العميل ووقته. كل الشكر والتقدير لخدمة العملاء.",
        name: "Yasser Ashour",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar10.png",
      },
      {
        title: "جهاز محترم وقيمة مقابل سعر",
        text: "جهاز ممتاز وسعر مقابل قيمة، والأهم الشركة محترمة والموظفين محترفين سواء في شرح استخدام الجهاز أو خدمة ما بعد البيع.",
        name: "Usama M. Al Asfar",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar11.png",
      },
    ],
    en: [
      {
        title: "Amazing and practical device",
        text: "The product is excellent and saved me a lot of effort. It's a fantastic technology, highly recommended! Very high performance for a low price, and great support even after purchase. Special thanks to Ms. Enas for her patience and kindness!",
        name: "Mrwan Mohamed",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Marwan.jpeg",
      },
      {
        title: "Professional service and great device",
        text: "Thanks for all your effort! The device is really good and saved me a lot. Special thanks to Ms. Radwa for her kind support and Eng. Naira for her fast responses. Appreciate it!",
        name: "Kirolos Boshra",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar8.png",
      },
      {
        title: "Exceeded expectations",
        text: "The device exceeded all my expectations and helped me achieve great results. Many thanks to Ms. Radwa and the whole team for their great after-sales support.",
        name: "Mohamed Abdelsalam",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar9.png",
      },
      {
        title: "Excellent after-sales service",
        text: "Honestly, this device is great! The after-sales support is excellent — quick responses and respectful communication. I'm proud it's an Egyptian company run by professionals who truly care about their customers.",
        name: "Yasser Ashour",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar10.png",
      },
      {
        title: "Professional and valuable device",
        text: "An excellent device with great value for money. The company is very professional, and the team is skilled in usage guidance and after-sales service.",
        name: "Usama M. Al Asfar",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/avatars/avatar11.png",
      },
    ],
  };

  const feedbacks = isTACTPanel
    ? tactPanelFeedbacks[language]
    : tactFeedbacks[language];

  return (
    <section className="feedback">

      <Swiper
      key={language}
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
              <div className="feed-image">
              <Image
                src={fb.image}
                alt={fb.name}
                width={50}
                height={50}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              </div>
              <h4 style={{ fontWeight: "bold" }}>{fb.name}</h4>
              <span style={{ color: "#777", fontSize: "0.85rem" }}>{fb.jobTitle[language]}</span>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
