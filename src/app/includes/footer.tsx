"use client";

import Image from "next/image";
import Facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instagram.svg";
import Tiktok from "../assets/images/tiktok.svg";
import { Youtube } from "lucide-react";

export default function Footer() {
  const iconStyle = { width: 24, height: 24 };

  return (
    <footer style={{ textAlign: "center", padding: "2rem 0" }}>
      <h3>Copyright © 2025 Interact Labs. All Rights Reserved.</h3>
      <div
        className="social"
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <a
          href="https://www.facebook.com/TACTdevice"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative", ...iconStyle }}>
            <Image
              src={Facebook}
              alt="Interact Labs Facebook"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>
        <a
          href="https://www.youtube.com/@interact-labs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            style={{
              background: "#a8a8be",
              color: "#fff",
              borderRadius: 3,
              position: "relative",
              ...iconStyle,
            }}
          >
            <Youtube />
          </div>
        </a>
        <a
          href="https://www.instagram.com/interactlabs_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative", ...iconStyle }}>
            <Image
              src={Instagram}
              alt="Interact Labs Instagram"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>

        <a
          href="https://www.tiktok.com/@interactlabs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative", ...iconStyle }}>
            <Image
              src={Tiktok}
              alt="Interact Labs TikTok"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>
      </div>
    </footer>
  );
}
