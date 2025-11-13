"use client";
import { useEffect } from "react";

type ProductMetaProps = {
  product: {
    product_name: string;
    description_en: string;
    id?: string;
    price?: number;
  };
};

export default function ProductMeta({ product }: ProductMetaProps) {
  useEffect(() => {
    if (!product) return;

    // ====================
    // تحديث الـ Title
    // ====================
    document.title = `${product.product_name} - Interact Shop`;

    // ====================
    // Meta Description
    // ====================
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", product.description_en);

    // ====================
    // Open Graph Tags
    // ====================
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement("meta");
      ogTitleTag.setAttribute("property", "og:title");
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute("content", product.product_name);

    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement("meta");
      ogDescTag.setAttribute("property", "og:description");
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.setAttribute("content", product.description_en);

    // ====================
    // GTM Tracking
    // ====================
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "view_item",
        item: product.product_name,
        item_id: product.id || product.product_name,
        price: product.price || 0,
      });
    }
  }, [product]);

  return null;
}
