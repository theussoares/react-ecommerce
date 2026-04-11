import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../../shared/api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productsApi.getCategories,
    staleTime: 1000 * 60 * 60, // 1 hora — categorias mudam raramente
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}
