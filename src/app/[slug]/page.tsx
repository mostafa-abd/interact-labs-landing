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
  const slug = params?.slug || ""; // 👈 تجنب undefined
  const normalizedSlug = slug.toLowerCase(); // 👈 بعد التأكد إنها string
  const product = products[normalizedSlug as keyof typeof products];

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
