import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../shared/types";

const mockProduct: Product = {
  id: 1,
  title: "Produto Teste",
  price: 99.9,
  description: "",
  category: "test",
  thumbnail: "",
  rating: 4.0,
  discountPercentage: 0,
};

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("adiciona um produto ao carrinho", () => {
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("incrementa quantidade ao adicionar produto já existente", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("remove um produto do carrinho", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().removeItem(mockProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("atualiza a quantidade de um produto", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("limpa o carrinho", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
