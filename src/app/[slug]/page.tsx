import products from "../data/products.json";
import MainSection from '../components/main-section';
import HowToUse from '../components/how-to-use';
import Benefits from "../components/benefits";
import Feedback from "../components/feedback";

import '../assets/css/product.css';

interface ProductPageProps {
  params: {
    slug: string;
  };
}
export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const product = products[slug as keyof typeof products];
  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <main>
      <MainSection/>
      <HowToUse/>
      <Benefits/>
      <Feedback/>

    </main>
  );
}
