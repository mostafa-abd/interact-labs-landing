"use client";
import { useEffect } from "react";

type CheckoutMetaProps = {
  product: {
    name: string;
    qty: number;
    price: number;
    currency?: string;
  };
};

export default function CheckoutMeta({ product }: CheckoutMetaProps) {
  useEffect(() => {
    if (!product || typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "begin_checkout",
      item: product.name,
      item_id: product.name,
      quantity: product.qty,
      price: product.price,
      currency: product.currency || "EGP", 
    });
  }, [product]);

  return null;
}
