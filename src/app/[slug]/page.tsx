// app/[slug]/page.tsx
"use client";
import React from "react";

import products from "@/data/products.json";
import MainSection from "../components/main-section";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import "../assets/css/product.css";

// ✅ تأكد إن النوع متوافق مع Next.js App Router
interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  // ✅ استخدم التفكيك العادي بدون React.use
  const { slug } = params;

  const product = products[slug as keyof typeof products];
  if (!product) return <h1>Product not found</h1>;

  return (
    <main>
      <MainSection product={product} />
      <Benefits />
      <Feedback />
      <ProductDetails product={product} />
    </main>
  );
}
