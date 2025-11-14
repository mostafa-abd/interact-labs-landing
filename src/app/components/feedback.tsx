"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import feedbackData from "@/data/feedback.json";

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

  const tactPanelFeedbacks: Record<string, FeedbackItem[]> = feedbackData.tactPanel;
  const tactFeedbacks: Record<string, FeedbackItem[]> = feedbackData.tact;

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
        passiveListeners={true}
        touchEventsTarget="container"
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
            <p>{fb.text}</p>
            <div className="feed-profile">
              {fb.image && (
                <div className="feed-image">
                  <Image
                    src={fb.image}
                    alt={fb.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              )}
              <div style={{ width: "100%" }}>
                <h4 style={{ fontWeight: "bold" }}>{fb.name}</h4>
                <span style={{ color: "#777", fontSize: "0.85rem" }}>
                  {fb.jobTitle[language]}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
