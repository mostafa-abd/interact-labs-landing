export const runtime = "edge";

import CheckoutPage from "./CheckoutPage";
import type { Metadata } from "next";
export function generateMetadata(): Metadata {
  return {
    title: `Checkout `,
    description: `Complete your order safely and easily.`,
  };
}
export default function Page() {
  return <CheckoutPage />;
}
