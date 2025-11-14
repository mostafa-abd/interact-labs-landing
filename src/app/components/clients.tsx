"use client";

import Image from "next/image";
import BMW from "../assets/images/BMW.svg";
import Mercedessvg from "../assets/images/Mercedessvg.svg";
import Coca from "../assets/images/Coca-Cola_logo.svg";
import Guc from "../assets/images/guc.webp";
import Auc from "../assets/images/auc.webp";
import Ain from "../assets/images/ain.webp";
import Mansoura from "../assets/images/mansoura.webp";
import Capital from "../assets/images/capital.webp";
import { useLanguage } from "../context/LanguageContext";

export default function Clients() {
  const { isAr } = useLanguage();
  const logoSizes = "150px";

  const clients = [BMW, Mercedessvg, Coca, Guc, Auc, Ain, Mansoura, Capital];
  const repeatedClients = [...clients, ...clients];

  return (
    <section
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8%",
          flexWrap: "nowrap",
          width: "fit-content",
          direction: "ltr",
          animation: "clients-scroll 28s linear infinite",
          animationDirection: isAr ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {repeatedClients.map((client, index) => (
          <div
            key={`${client.src}-${index}`}
            style={{
              flex: "0 0 auto",
              width: "150px",
              height: "80px",
              position: "relative",
            }}
          >
            <Image
              src={client}
              alt="client logo"
              fill
              style={{ objectFit: "contain" }}
              sizes={logoSizes}
              quality={70}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
