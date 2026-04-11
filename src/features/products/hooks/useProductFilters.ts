import { useState, useMemo } from "react";
import type {
  Product,
  ProductFilters,
  SortOption,
} from "../../../shared/types";

const initialFilters: ProductFilters = {
  category: "",
  search: "",
  sort: "default",
};

export function useProductFilters(products: Product[] = []) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    const sorters: Record<SortOption, () => Product[]> = {
      default: () => result,
      "price-asc": () => result.sort((a, b) => a.price - b.price),
      "price-desc": () => result.sort((a, b) => b.price - a.price),
      rating: () => result.sort((a, b) => b.rating - a.rating),
    };

    return sorters[filters.sort]();
  }, [products, filters]);

  const setCategory = (category: string) =>
    setFilters((prev) => ({ ...prev, category }));

  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search }));

  const setSort = (sort: SortOption) =>
    setFilters((prev) => ({ ...prev, sort }));

  const reset = () => setFilters(initialFilters);

  return { filters, filtered, setCategory, setSearch, setSort, reset };
}
