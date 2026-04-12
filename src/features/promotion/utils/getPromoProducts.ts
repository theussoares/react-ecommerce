import type { Product, PromoProduct } from "../../../shared/types";
import { calculateDiscount } from "../../../shared/utils/calculateDiscount";

export function getPromoProducts(products: Product[]): PromoProduct[] {
  return products
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 5)
    .map((product) => ({
      ...product,
      promoPrice: calculateDiscount(product.price, product.discountPercentage),
    }));
}
