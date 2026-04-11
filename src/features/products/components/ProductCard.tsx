import { memo, useCallback } from "react";
import type { Product } from "../../../shared/types";
import { useCartStore } from "../../../store/cartStore";
import { formatCurrency } from "../../../shared/utils";

interface Props {
  product: Product;
}

const styles = {
  card: "bg-white min-w-[120px] rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200",
  image: "w-full h-48 object-contain p-4 bg-gray-50",
  body: "flex flex-col gap-2 p-4 flex-1",
  title: "text-sm font-medium text-gray-800 line-clamp-2 flex-1",
  meta: "flex items-center justify-between",
  rating: "text-xs text-amber-500 font-medium",
  price: "text-base font-bold text-gray-900",
  btn: "mt-2 w-full bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150",
};

export const ProductCard = memo(({ product }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  return (
    <article className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.meta}>
          <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
        </div>
        <button onClick={handleAdd} className={styles.btn}>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
