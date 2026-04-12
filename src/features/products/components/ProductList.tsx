import { useCategories } from "../../../shared/hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductCard } from "./ProductCard";
import type { SortOption } from "../../../shared/types";
import { useProductStore } from "../../../store/productStore";

const styles = {
  wrapper: "flex flex-col gap-6",
  filters: "flex flex-wrap gap-3",
  input:
    "flex-1 min-w-48 text-sm border border-gray-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-300",
  select:
    "text-sm border border-gray-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
};

export function ProductList() {
  const products = useProductStore((state) => state.products);
  const { data: categories } = useCategories();
  const { filters, filtered, setCategory, setSearch, setSort } =
    useProductFilters(products);

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <select
          value={filters.category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">Todas categorias</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className={styles.select}
        >
          <option value="default">Ordenar por</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
