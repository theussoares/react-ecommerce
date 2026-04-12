import { memo, useCallback } from "react";
import type { Product } from "../../../shared/types";
import { useCartStore } from "../../../store/cartStore";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { calculateDiscount } from "../../../shared/utils/calculateDiscount";
import { StarIcon } from "./StarIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const styles = {
  card: "group bg-white rounded-2xl min-h-[412px] shadow-sm hover:shadow-xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 relative cursor-pointer",
  imageContainer:
    "relative w-full h-52 bg-gray-50/80 p-6 flex justify-center items-center overflow-hidden",
  image: "w-full h-full object-contain p-4",
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
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const discountedPrice = calculateDiscount(
    product.price,
    product.discountPercentage,
  );
  const hasGoodDiscount = product.discountPercentage > 10;

  const handleNavigate = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <article className={styles.card} onClick={handleNavigate}>
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
            <StarIcon />
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          className={styles.btn}
        >
          Adicionar
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
