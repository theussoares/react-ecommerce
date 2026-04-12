import { memo, useCallback } from "react";
import type { Product } from "../../../shared/types";
import { useCartStore } from "../../../store/cartStore";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { calculateDiscount } from "../../../shared/utils/calculateDiscount";

interface Props {
  product: Product;
}

const styles = {
  card: "group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 relative cursor-pointer",
  imageContainer:
    "relative w-full h-52 bg-gray-50/80 p-6 flex justify-center items-center overflow-hidden",
  image:
    "w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110",
  discountBadge:
    "absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm",
  body: "flex flex-col gap-2 p-5 flex-1 bg-white z-20",
  category:
    "text-[10px] text-gray-400 uppercase tracking-widest font-semibold truncate",
  title:
    "text-sm font-semibold text-gray-800 line-clamp-2 flex-1 leading-snug group-hover:text-black transition-colors",
  meta: "flex items-end justify-between mt-auto pt-3 border-t border-gray-50",
  rating: "flex items-center gap-1 text-xs text-amber-500 font-bold mb-1",
  priceInfo: "flex flex-col items-end",
  oldPrice: "text-[10px] text-gray-400 line-through mb-0.5",
  price: "text-lg font-extrabold text-gray-900 leading-none",
  btn: "mt-4 w-full bg-black text-white text-sm font-bold py-2.5 px-4 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2",
};

export const ProductCard = memo(({ product }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const discountedPrice = calculateDiscount(
    product.price,
    product.discountPercentage,
  );
  const hasGoodDiscount = product.discountPercentage > 10;

  return (
    <article className={styles.card}>
      {/* Container da Imagem com Badge */}
      <div className={styles.imageContainer}>
        {hasGoodDiscount && (
          <span className={styles.discountBadge}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className={styles.image}
        />
      </div>

      {/* Corpo de Informações */}
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.meta}>
          <div className={styles.rating}>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.rating.toFixed(1)}
          </div>

          <div className={styles.priceInfo}>
            {hasGoodDiscount && (
              <span className={styles.oldPrice}>
                {formatCurrency(product.price)}
              </span>
            )}
            <span className={styles.price}>
              {formatCurrency(
                hasGoodDiscount ? discountedPrice : product.price,
              )}
            </span>
          </div>
        </div>

        <button onClick={handleAdd} className={styles.btn}>
          Adicionar
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
