import { ProductList } from "../features/products";
import { PromoBanner } from "../features/promotion";

export function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <PromoBanner />
      <ProductList />
    </div>
  );
}
