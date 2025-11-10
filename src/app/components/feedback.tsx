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
        image: "/images/Mohamed Salem.png",
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

  //  TACT Feedback 
 const tactFeedbacks: Record<string, FeedbackItem[]> = {
    ar: [
      {
        title: "جهاز تاكت عملي وقابل للنقل بسهولة",
        text: "جهاز تاكت عمره الافتراضي طويل جدًا، الجهاز متحرك نقدر بسهولة ننقله من مكان للتاني، نقدر نستخدم السبورة البيضاء الكبيرة مع البروجيكتور ونحولها ل تاتش في وجود تاكت، السعر تنافسي جدًا وكمان خدمة العملاء والدعم الفني على مستوى عالي، لو قارنا بين أجهزة تفاعلية أخرى وتاكت هتلاقي تاكت أفضل بكتير جدًا كجودة أداء وسعر، كل الشكر ليكم وبتمنى لكم التوفيق.",
        name: "على أبو الدهب",
        jobTitle: { ar: "مدير مدرسة صن الخاصة للغات", en: "Sun Language Schools - Principle" },
        image: "/images/feedback/Ali Abu eldahab.jpeg",
      },
      {
        title: "جهاز تاكت يجعل التعلم أكثر تفاعلية",
        text: "جهاز تاكت بيحول أي مساحة عرض لمساحة تفاعلية، عندي المدرسين لما بيشتغلوا على السبورة الذكية ويستخدموا الماركر بيكون الموضوع بطيء، لكن مع تاكت الموضوع أفضل وأسهل وأسرع والتفاعل كان مهم جدًا مع الطلاب.",
        name: "مهندس نادر",
        jobTitle: { ar: "مدير قسم ال IT - مدرسة المنار", en: "Moder Manar School - IT Manager" },
        image: "/images/feedback/Nader.jpeg",
      },
      {
        title: "جودة عالية وتوفير في التكلفة",
        text: "جهاز تاكت وفر علينا في التكلفة وكمان الجودة عالية، السبورات الذكية كل شهر بيكون عندنا ضحية بخلاف تاكت بالإضافة إنك بتحول التعليم لمتعة.",
        name: "د. أحمد عثمان",
        jobTitle: { ar: "مدير مجموعة مدارس آل عثمان", en: "Al Othman Schools - Principle" },
        image: "/images/feedback/Othman.jpeg",
      },
      {
        title: "تطوير طريقة إيصال المعلومة للطلاب",
        text: "شوفنا في جهاز تاكت إمكانيات كتيرة خصوصًا مع المستجدات في تكنولوجيا التعليم كنا محتاجين نطور نفسنا في طريقة إيصال المعلومة للطلاب، الجهاز دا طور كتير في طريقة توصيل المعلومة وطريقة التعلم اللي عايزين نوصل لها.",
        name: "أ. محمد الشربيني",
        jobTitle: { ar: "مالك مدرسة جرين ڤالي", en: "Green Valley School Owner" },
        image: "/images/feedback/Elsherbeny.jpeg",
      },
      {
        title: "جهاز تاكت يسهل عملي العقاري",
        text: "جهاز تاكت عملي تطور كبير في شغلي، ساعات لما بيجي لي عميل ببعتله كل الملفات على الواتساب ويقعد يقرأ كلام كتير ويرجع بأسئلة كتيرة، والعميل بيتوه.. جهاز تاكت بيتوصل باللاب توب وفي أقل من دقيقة سجلت وأنا بشرح بيه فيديو وضح كل حاجة بسهولة للعميل الماستر بلان ومكان وحدته وكل النقاط المتعلقة بالمشروع. بنصح أي حد عايز يطور من شغله يستخدم جهاز تاكت وعندهم خدمة ما بعد البيع مميزة جدًا.",
        name: "محمد علي",
        jobTitle: { ar: "الرئيس التنفيذي لشركة فير بروكرز للعقارات", en: "CEO - Fair Brokers Real Estate" },
        image: "/images/feedback/MohamedAli.jpeg",
      },
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
        name: "كيرلس بشرا",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Kerolos.jpeg",
      },
      {
        title: "جهاز ممتاز وفاق التوقعات",
        text: "الجهاز ممتاز جدا وفاق كل توقعاتي وساعدني جدا أخرج بالجودة اللي كنت حاببها. شكرا للأستاذة رضوى والتيم كله على المجهود الرائع في التعامل فترة ما بعد البيع.",
        name: "محمد عبد",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Mohamed AbdelSalam.jpeg",
      },
      {
        title: "خدمة ما بعد البيع محترمة جدًا",
        text: "السلام عليكم، بامانه جهاز محترم. خدمة ما بعد البيع قمة الاحترام والرد على أي مشكلة وحلها بسرعة جدًا. والله شركة محترمة، وفرحان جدًا لأنها مصرية وشباب مصريين فعلاً مقدرين مكانة العميل ووقته. كل الشكر والتقدير لخدمة العملاء.",
        name: "ياسر عاشور",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Yaser ashor.jpeg",
      },
      {
        title: "جهاز محترم وقيمة مقابل سعر",
        text: "جهاز ممتاز وسعر مقابل قيمة، والأهم الشركة محترمة والموظفين محترفين سواء في شرح استخدام الجهاز أو خدمة ما بعد البيع.",
        name: "أسامة م. الأسفر",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Usama.jpeg",
      },

    ],
    en: [
            {
        title: "TACT device is practical and portable",
        text: "The TACT device has a long lifespan, it's portable and easy to move from one place to another. We can use the large whiteboard with the projector and turn it into touch interaction with TACT. The price is very competitive, and the customer support is excellent. Compared to other interactive devices, TACT is far superior in performance and value. Many thanks and best wishes!",
        name: "Ali Abu Eldahab",
        jobTitle: { ar: "مدير مدرسة صن الخاصة للغات", en: "Sun Language Schools - Principle" },
        image: "/images/feedback/Ali Abu eldahab.jpeg",
      },
      {
        title: "TACT makes learning more interactive",
        text: "TACT turns any display area into an interactive space. Teachers were slow when using smart boards with markers, but with TACT, everything is smoother, faster, and more engaging for students.",
        name: "Eng. Nader",
        jobTitle: { ar: "مدير قسم ال IT - مدرسة المنار", en: "Moder Manar School - IT Manager" },
        image: "/images/feedback/Nader.jpeg",
      },
      {
        title: "High quality and cost-saving",
        text: "TACT saved us costs and also offers high quality. Smart boards often get damaged every month, but TACT is reliable and makes learning enjoyable.",
        name: "Dr. Ahmed Othman",
        jobTitle: { ar: "مدير مجموعة مدارس آل عثمان", en: "Al Othman Schools - Principle" },
        image: "/images/feedback/Othman.jpeg",
      },
      {
        title: "Improved way of delivering information",
        text: "With TACT, we discovered many features, especially with the latest educational technology. The device greatly improved the way we deliver lessons and teach students.",
        name: "Mohamed Elsherbeny",
        jobTitle: { ar: "مالك مدرسة جرين ڤالي", en: "Green Valley School Owner" },
        image: "/images/feedback/Elsherbeny.jpeg",
      },
      {
        title: "TACT facilitates my real estate work",
        text: "TACT is a huge improvement in my work. Sometimes when a client receives files via WhatsApp, it gets confusing. With TACT connected to my laptop, I can explain everything in less than a minute with videos, showing the master plan, unit location, and project details clearly. I highly recommend TACT and their after-sales service is excellent.",
        name: "Mohamed Ali",
        jobTitle: { ar: "الرئيس التنفيذي لشركة فير بروكرز للعقارات", en: "CEO - Fair Brokers Real Estate" },
        image: "/images/feedback/MohamedAli.jpeg",
      },
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
        image: "/images/feedback/Kerolos.jpeg",
      },
      {
        title: "Exceeded expectations",
        text: "The device exceeded all my expectations and helped me achieve great results. Many thanks to Ms. Radwa and the whole team for their great after-sales support.",
        name: "Mohamed Abd",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Mohamed AbdelSalam.jpeg",
      },
      {
        title: "Excellent after-sales service",
        text: "Honestly, this device is great! The after-sales support is excellent — quick responses and respectful communication. I'm proud it's an Egyptian company run by professionals who truly care about their customers.",
        name: "Yasser Ashour",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Yaser ashor.jpeg",
      },
      {
        title: "Professional and valuable device",
        text: "An excellent device with great value for money. The company is very professional, and the team is skilled in usage guidance and after-sales service.",
        name: "Usama M. Al Asfar",
        jobTitle: { ar: "مدرس", en: "Teacher" },
        image: "/images/feedback/Usama.jpeg",
      }

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
        <div>
                <h4 style={{ fontWeight: "bold" }}>{fb.name}</h4>
              <span style={{ color: "#777", fontSize: "0.85rem" }}>{fb.jobTitle[language]}</span>
        </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
