import type { Product } from "../types";

const BASE_URL = "https://dummyjson.com";

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

interface ProductsResponse {
  products: Product[];
}

interface CategoriesResponse {
  slug: string;
  name: string;
  url: string;
}

export const productsApi = {
  getAll: () =>
    fetchJSON<ProductsResponse>("/products?limit=100").then((r) => r.products),
  getById: (id: number) => fetchJSON<Product>(`/products/${id}`),
  getCategories: () =>
    fetchJSON<CategoriesResponse[]>("/products/categories").then((r) =>
      r.map((c) => c.slug),
    ),
  getByCategory: (category: string) =>
    fetchJSON<ProductsResponse>(`/products/category/${category}`).then(
      (r) => r.products,
    ),
};
