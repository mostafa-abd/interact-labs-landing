import React from "react";
import products from "@/data/products.json";
import MainSection from "../components/main-section";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import "../assets/css/product.css";

interface Props {
  params?: { slug?: string };
}

export const runtime = "edge";

export default function ProductPage({ params }: Props) {
  const rawSlug = params?.slug ?? "";
  const slug = decodeURIComponent(rawSlug).toLowerCase().replace(/\//g, ""); // 👈 تنظيف أي / أو رموز
  const product = products[slug as keyof typeof products];

  if (!product) {
    console.log("🔍 slug not found:", slug);
    return <h1>Product not found</h1>;
    <h2>Slug: {JSON.stringify(params)}</h2>

  }

  return (
    <main>
      <MainSection product={product} />
      <Benefits />
      <Feedback />
      <ProductDetails product={product} />
    </main>
  );
}
