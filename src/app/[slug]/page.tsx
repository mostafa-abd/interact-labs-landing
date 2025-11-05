import React from "react";
import products from "@/data/products.json";
import MainSection from "../components/main-section";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import "../assets/css/product.css";

interface Props {
  params: { slug?: string };
}

export const runtime = "edge";

export default function ProductPage({ params }: Props) {
  console.log("✅ Product Page Loaded");
  console.log("🟡 params:", params);

  const slug = params?.slug || "";
  console.log("🔵 slug value:", slug);

  const normalizedSlug = slug.toLowerCase();
  console.log("🟢 normalizedSlug:", normalizedSlug);

  const product = products[normalizedSlug as keyof typeof products];
  console.log("🟣 product found:", product ? "✅ yes" : "❌ no");

  if (!product) {
    console.error(`❌ Product not found for slug: "${normalizedSlug}"`);
    return <h1>Product not found</h1>;
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
