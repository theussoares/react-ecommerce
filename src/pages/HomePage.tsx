import { ProductList } from "../features/products";
import { PromoBanner } from "../features/promotion";
import { PageMeta } from "../shared/components/PageMeta";

export function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageMeta
        title="Início"
        description="Os melhores produtos com os melhores preços. Eletrônicos, moda, beleza e muito mais."
      />
      <PromoBanner />
      <ProductList />
    </div>
  );
}
