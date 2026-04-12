import { create } from "zustand";
import type { Product } from "../shared/types";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProducts: () => Product[];
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),
  getProducts: () => get().products,
}));
