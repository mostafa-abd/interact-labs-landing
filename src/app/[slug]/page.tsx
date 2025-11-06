import React from "react";

import products from "@/data/products.json";
import MainSection from "../components/main-section";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import HowToUse from "../components/how-to-use";
import "../assets/css/product.css";
import Join from './../components/join';
import Others from '../components/Others';

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
      <MainSection product={product} />
      {normalizedSlug === "tact" && <HowToUse />}
      <Benefits />
      <Feedback />
      <Others />
      <ProductDetails product={product} />
      <Join/>
    </main>
  );
}
