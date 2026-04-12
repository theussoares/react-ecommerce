import { useState, useCallback, useMemo } from "react";
import type { Product } from "../../../shared/types";

const PAGE_SIZE = 12;

export function usePaginatedProducts(products: Product[]) {
  const [page, setPage] = useState(1);

  const paginated = useMemo(
    () => products.slice(0, page * PAGE_SIZE),
    [products, page],
  );

  const hasMore = paginated.length < products.length;

  const loadMore = useCallback(() => {
    if (hasMore) setPage((prev) => prev + 1);
  }, [hasMore]);

  // reseta quando o array muda (troca de filtro/categoria)
  const reset = useCallback(() => setPage(1), []);

  return { paginated, hasMore, loadMore, reset };
}
