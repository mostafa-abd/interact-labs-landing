import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import products from "@/data/products.json";
import MainSection from "../components/main-section";
import ProductMeta from "../components/ProductMeta";
import "../assets/css/product.css";

// Dynamic imports for below-the-fold components
const Benefits = dynamic(() => import("../components/benefits"), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const Feedback = dynamic(() => import("../components/feedback"), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const ProductDetails = dynamic(() => import("../components/product-details"), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const HowToUse = dynamic(() => import("../components/how-to-use"), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const Join = dynamic(() => import('./../components/join'), {
  loading: () => <div style={{ minHeight: 100 }} />,
});
const Others = dynamic(() => import('../components/Others'), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const Statics = dynamic(() => import("../components/statics"), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const Clients = dynamic(() => import("../components/clients"), {
  loading: () => <div style={{ minHeight: 100 }} />,
});
interface Props {
  params: Promise<{ slug?: string }>;
}

export const runtime = "edge";

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const normalizedSlug = slug.toLowerCase();
  const product = products[normalizedSlug as keyof typeof products];
  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <main>
      <ProductMeta product={product} />
      <MainSection product={product} />
      {normalizedSlug === "tact" && <HowToUse />}
      <Benefits />
      <Statics />
      <Clients />
      <Feedback />
      <Others />
      <ProductDetails product={product} />
      <Join/>
    </main>
  );
}
