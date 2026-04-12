import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Product } from "../../../shared/types";
import { useProductFilters } from "../hooks/useProductFilters";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Camiseta Azul",
    price: 50,
    description: "",
    category: "mens-shirts",
    thumbnail: "",
    rating: 4.5,
    discountPercentage: 5,
  },
  {
    id: 2,
    title: "Calça Preta",
    price: 120,
    description: "",
    category: "mens-shirts",
    thumbnail: "",
    rating: 3.8,
    discountPercentage: 15,
  },
  {
    id: 3,
    title: "Tênis Branco",
    price: 200,
    description: "",
    category: "mens-shoes",
    thumbnail: "",
    rating: 4.9,
    discountPercentage: 8,
  },
];

describe("useProductFilters", () => {
  it("retorna todos os produtos sem filtros aplicados", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));
    expect(result.current.filtered).toHaveLength(3);
  });

  it("filtra produtos pelo termo de busca", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => result.current.setSearch("camiseta"));

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe("Camiseta Azul");
  });

  it("filtra produtos por categoria", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => result.current.setCategory("mens-shoes"));

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].category).toBe("mens-shoes");
  });

  it("ordena produtos por menor preço", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => result.current.setSort("price-asc"));

    expect(result.current.filtered[0].price).toBe(50);
    expect(result.current.filtered[2].price).toBe(200);
  });

  it("ordena produtos por maior avaliação", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => result.current.setSort("rating"));

    expect(result.current.filtered[0].rating).toBe(4.9);
  });

  it("reseta filtros ao chamar reset", () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.setSearch("camiseta");
      result.current.setCategory("mens-shirts");
    });

    act(() => result.current.reset());

    expect(result.current.filtered).toHaveLength(3);
    expect(result.current.filters.search).toBe("");
    expect(result.current.filters.category).toBe("");
  });
});
