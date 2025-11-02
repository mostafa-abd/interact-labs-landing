// app/[slug]/page.tsx
"use client";
import React from "react";

import products from "@/data/products.json";
import MainSection from "../components/main-section";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import "../assets/css/product.css";
interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  // ✅ unwrap the params using React.use
  const { slug } = React.use(params);

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