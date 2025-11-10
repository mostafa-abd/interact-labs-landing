"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import BMW from '../assets/images/BMW.svg';
import Mercedessvg from '../assets/images/Mercedessvg.svg';
import Coca from '../assets/images/Coca-Cola_logo.svg';
import Guc from '../assets/images/guc.jpg';
import Auc from '../assets/images/auc.png';
import Ain from '../assets/images/ain.png';
import Mansoura from '../assets/images/mansoura.png';
import Capital from '../assets/images/capital.png';
import { useLanguage } from "../context/LanguageContext";

export default function Clients() {
  const { isAr } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const clients = [BMW, Mercedessvg, Coca, Guc, Auc, Ain, Mansoura, Capital];
  const repeatedClients = [...clients, ...clients];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 1;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0;

      container.scrollLeft = isAr
        ? container.scrollWidth / 2 - scrollPos
        : scrollPos;

      animationRef.current = requestAnimationFrame(animate);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAr]);

  return (
    <section
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "20px 0",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: "8%",
          flexWrap: "nowrap",
          width: "100%",
          overflowX: "hidden",
          direction: "ltr",
        }}
      >
        {repeatedClients.map((client, index) => (
          <div
            key={index}
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
            />
          </div>
        ))}
      </div>
    </section>
  );
}
