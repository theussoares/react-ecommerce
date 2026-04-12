export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
}

export interface PromoProduct extends Product {
  promoPrice: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = "default" | "price-asc" | "price-desc" | "rating";

export interface ProductFilters {
  category: string;
  search: string;
  sort: SortOption;
}
