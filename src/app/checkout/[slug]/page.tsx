export const runtime = "nodejs";

import type { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Interact Shop",
  description: "Complete your order safely and easily.",
};

export default function Page() {
  return <CheckoutPage />;
}
