"use client";

import { useLanguage } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

type OtherItem = {
  title: { en: string; ar: string };
};

export default function Others() {
  const language = useLanguage()?.language ?? "en";
  const isAr = language === "ar";
  const pathname = usePathname();
  if (pathname !== "/tact-panel") return null;

  const othersData: OtherItem[] = [
    { title: { en: "4K Quality", ar: "جودة الصورة 4K" } },
    { title: { en: "Wi-Fi", ar: "واي فاي" } },
    { title: { en: "Bluetooth", ar: "بلوتوث" } },
    { title: { en: "2 USB Ports", ar: "٢ مخرج يو إس بي " } },
    { title: { en: "3 HDMI Ports", ar: "٣ مخرج إتش دي إم أي " } },
    { title: { en: "3 Years Warranty", ar: "ضمان 3 سنوات" } },
    { title: { en: "40 Multi-touch points in Windows 10", ar: " نقطة لمس في نفس اللحظة لنظام الويندوز" } },
    { title: { en: "Multi-touch points in Windows", ar: "١٠ نقطة لمس في نفس اللحظة لنظام الأندرويد" } },
    { title: { en: "Delivered with Stand", ar: "حامل تثبيت حائط" } },
    { title: { en: "2 Remote Controls", ar: "٢ ريموت فيهم واحد سمارت " } },
  ];

  return (
    <section
      className="benefits"
      dir={isAr ? "rtl" : "ltr"}
      style={{ textAlign: isAr ? "right" : "left" }}
    >
      <h1>
        {isAr ? "مواصفات أخرى" : "Other Features"}
      </h1>

      <div className="benefits-boxes">
        {othersData.map((item, index) => (
          <div
            key={index}
            style={{
              minHeight: 100,
              padding: "15px",
              borderRadius: "10px",
              background: "#f9f9f9",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ marginTop: 10 ,textAlign: "center"}}>{item.title[language]}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
