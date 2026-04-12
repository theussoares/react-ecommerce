import { calculateDiscount } from "../../../shared/utils/calculateDiscount";
import type { PromoProduct } from "./../../../shared/types/index";

export const usePromoProducts = (PromoProduct: PromoProduct[]) => {
  const promoProducts = PromoProduct.filter((p) => p.discountPercentage > 10);

  return promoProducts.map((product) => ({
    ...product,
    promoPrice: calculateDiscount(product.price, product.discountPercentage),
  }));
};
