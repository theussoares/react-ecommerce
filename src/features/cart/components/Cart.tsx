import { formatCurrency } from "../../../shared/utils";
import { useCartStore } from "../../../store/cartStore";
import { CartItem } from "./CartItem";

interface CartProps {
  onClose?: () => void;
}

const styles = {
  empty: "flex flex-col items-center justify-center h-64 text-gray-400 gap-2",
  wrapper: "flex flex-col h-full overflow-auto max-h-full lg:max-h-[70vh]",
  header: "flex items-center justify-between pb-4 border-b border-gray-100",
  title: "text-lg font-semibold text-gray-900",
  count: "text-sm text-gray-400 font-normal",
  items: "flex-1 overflow-y-auto py-2 pr-4",
  footer:
    "pt-4 border-t border-gray-100 flex items-center justify-between gap-4",
  total: "text-base font-bold text-gray-900",
  clear:
    "text-sm text-gray-400 hover:text-red-500 transition-colors font-medium",
  checkout:
    "bg-gray-900 text-white text-sm font-medium py-2 px-6 rounded-xl hover:bg-gray-700 transition-colors",
  close: "text-gray-400 hover:text-gray-600 text-lg leading-none",
};

export function Cart({ onClose }: CartProps) {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  const totalPrice = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className="text-4xl">🛒</span>
        <p className="text-sm">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Carrinho <span className={styles.count}>({totalItems} itens)</span>
        </h2>
        <button onClick={clearCart} className={styles.clear}>
          Limpar tudo
        </button>
        {onClose && (
          <button onClick={onClose} className={styles.close}>
            ✕
          </button>
        )}
      </div>

      <div className={styles.items}>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.total}>
          Total: {formatCurrency(totalPrice)}
        </span>
        <button className={styles.checkout}>Finalizar pedido</button>
      </div>
    </div>
  );
}
