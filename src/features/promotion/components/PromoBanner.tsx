import { useEffect, useMemo, useState } from "react";
import type { PromoProduct } from "../../../shared/types";
import { useProductStore } from "../../../store/productStore";
import { PromoCard } from "./PromoCard";
import { getPromoProducts } from "../utils/getPromoProducts";

const styles = {
  container: "w-full flex justify-center px-4",
  bannerWrapper:
    "relative w-full max-w-[1024px] h-[320px] rounded-2xl overflow-hidden shadow-2xl bg-black group",
  controls: "absolute bottom-4 left-8 z-30 flex gap-2",
  dot: "h-1.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
  dotActive: "w-6 bg-red-500",
  dotInactive: "w-2 bg-white/30 hover:bg-white/60",
  loading: "flex items-center justify-center h-[320px] text-white",
};

export const PromoBanner = () => {
  const products = useProductStore((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const promoProducts = useMemo<PromoProduct[]>(
    () => getPromoProducts(products),
    [products],
  );

  useEffect(() => {
    if (promoProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === promoProducts.length - 1 ? 0 : prev + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [promoProducts.length]);

  if (promoProducts.length === 0) return null;

  return (
    <div className={styles.container}>
      <main className={styles.bannerWrapper}>
        {promoProducts.map((product, index) => {
          const isActive = index === currentIndex;

          return (
            <PromoCard
              key={product.id}
              index={index}
              promoProduct={product}
              isActive={isActive}
            />
          );
        })}

        {/* Controles do Carrossel (Dots) */}
        <div className={styles.controls}>
          {promoProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : styles.dotInactive
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
