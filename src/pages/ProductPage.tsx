import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../features/products";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { calculateDiscount } from "../shared/utils/calculateDiscount";
import { useCallback, useMemo } from "react";

const styles = {
  wrapper: "max-w-4xl mx-auto px-6",
  back: "text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 flex items-center gap-2",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-12",
  imageWrapper:
    "aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-10",
  image: "w-full h-full object-contain",
  info: "flex flex-col gap-4",
  category: "text-xs text-gray-400 uppercase tracking-widest font-semibold",
  title: "text-2xl font-bold text-gray-900 leading-snug",
  rating: "flex items-center gap-1 text-sm text-amber-500 font-bold",
  description: "text-sm text-gray-500 leading-relaxed",
  priceWrapper: "flex flex-col gap-1 mt-2",
  oldPrice: "text-sm text-gray-400 line-through",
  price: "text-3xl font-extrabold text-gray-900",
  discount:
    "text-xs bg-red-100 text-red-500 font-bold px-2 py-1 rounded-full w-max",
  btn: "mt-4 bg-black text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200",
  loading: "text-center text-gray-400 py-20",
  error: "text-center text-red-400 py-20",
};

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(Number(id));
  const addItem = useCartStore((state) => state.addItem);

  const hasDiscount = useMemo(
    () => (product?.discountPercentage ?? 0) > 10,
    [product?.discountPercentage],
  );

  const discountedPrice = useMemo(
    () =>
      product
        ? calculateDiscount(product.price, product.discountPercentage)
        : 0,
    [product],
  );

  const handleAdd = useCallback(() => {
    if (product) addItem(product);
  }, [addItem, product]);

  if (isLoading) return <p className={styles.loading}>Carregando produto...</p>;
  if (isError || !product)
    return <p className={styles.error}>Produto não encontrado.</p>;

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles.back}>
        ← Voltar
      </button>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img
            src={product.thumbnail}
            alt={product.title}
            fetchPriority="high"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.rating}>★ {product.rating.toFixed(1)}</div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceWrapper}>
            {hasDiscount && (
              <>
                <span className={styles.oldPrice}>
                  {formatCurrency(product.price)}
                </span>
                <span className={styles.discount}>
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
            <span className={styles.price}>
              {formatCurrency(hasDiscount ? discountedPrice : product.price)}
            </span>
          </div>

          <button onClick={handleAdd} className={styles.btn}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
