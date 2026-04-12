import { memo } from "react";
import type { PromoProduct } from "../../../shared/types";
import { formatCurrency } from "../../../shared/utils";

interface Props {
  promoProduct: PromoProduct;
  isActive: boolean;
  index: number;
}

const styles = {
  slide: "absolute inset-0 transition-opacity duration-700 ease-in-out",
  slideActive: "opacity-100 z-10",
  slideInactive: "opacity-0 z-0",
  image:
    "absolute inset-y-0 right-0 w-2/3 h-full object-cover object-center z-0",
  gradientOverlay:
    "absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10",
  content:
    "absolute inset-y-0 left-0 w-2/3 z-20 flex flex-col justify-center p-8 text-left",
  badge:
    "inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full w-max mb-4 uppercase tracking-widest shadow-lg",
  title: "text-2xl font-bold text-white mb-2 leading-tight line-clamp-2",
  priceContainer: "mt-4 flex flex-col",
  oldPrice: "text-gray-400 line-through text-sm font-medium",
  newPrice: "text-3xl font-extrabold text-red-500 flex items-center gap-2",
  discountTag: "text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded",
  button:
    "mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-max",
};

export const PromoCard = memo(({ promoProduct, isActive, index }: Props) => {
  return (
    <div
      key={promoProduct.id}
      className={`${styles.slide} ${
        isActive ? styles.slideActive : styles.slideInactive
      }`}
    >
      {/* Imagem do Produto na Direita */}
      <img
        src={promoProduct.thumbnail}
        alt={promoProduct.title}
        loading={isActive && index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "low"}
        className={styles.image}
      />

      {/* Gradiente Preto da Esquerda para o Meio */}
      <div className={styles.gradientOverlay}></div>

      {/* Informações na Esquerda */}
      <div className={styles.content}>
        <span className={styles.badge}>Oferta Especial</span>

        <h3 className={styles.title}>{promoProduct.title}</h3>

        <div className={styles.priceContainer}>
          <p className={styles.oldPrice}>
            De {formatCurrency(promoProduct.price)}
          </p>
          <p className={styles.newPrice}>
            {formatCurrency(promoProduct.promoPrice)}
            <span className={styles.discountTag}>
              -{Math.round(promoProduct.discountPercentage)}%
            </span>
          </p>
        </div>

        {/* botão "Comprar Agora" */}
        <button className={styles.button}>Comprar Agora</button>
      </div>
    </div>
  );

  PromoCard.displayName = "PromoCard";
});
