import products from "@/data/products.json";
import MainSection from "../components/main-section";
import HowToUse from "../components/how-to-use";
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";
import ProductDetails from "../components/product-details";
import "../assets/css/product.css";

export default async function Product({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = products[slug as keyof typeof products];

  if (!product) return <h1>Product not found</h1>;

  return (
    <main>
    <MainSection product={product} />
      <HowToUse />
      <Benefits />
      <Feedback />
      <ProductDetails product={product} />
    </main>
  );
}
