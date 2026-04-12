import { memo, useCallback, useState } from "react";
import type { CartItem as CartItemType } from "../../../shared/types";
import { useCartStore } from "../../../store/cartStore";
import { formatCurrency } from "../../../shared/utils/formatCurrency";

interface Props {
  item: CartItemType;
}

const styles = {
  wrapper:
    "flex items-center gap-4 py-4 border-b border-gray-100 last:border-0",
  image: "w-16 h-16 object-contain bg-gray-50 rounded-lg p-1 shrink-0",
  info: "flex-1 min-w-0",
  title: "text-sm font-medium text-gray-800 truncate",
  price: "text-sm font-bold text-gray-900 mt-1",
  actions: "flex flex-col items-center gap-2 shrink-0",
  qty: "w-14 text-center text-sm border border-gray-200 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-gray-300",
  actionControl: "flex items-center gap-1",
  action:
    "text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center",
};

export const CartItem = memo(({ item }: Props) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [inputValue, setInputValue] = useState(String(item.quantity));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) return;
      setInputValue(value);
      const parsed = parseInt(value, 10);
      if (!isNaN(parsed) && parsed >= 1) {
        updateQuantity(item.product.id, parsed);
      }
    },
    [updateQuantity, item.product.id],
  );

  const handleBlur = useCallback(() => {
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed < 1) {
      setInputValue(String(item.quantity));
    }
  }, [inputValue, item.quantity]);

  const handleRemove = useCallback(() => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
      setInputValue(String(item.quantity - 1));
    } else {
      removeItem(item.product.id);
    }
  }, [removeItem, updateQuantity, item.product.id, item.quantity]);

  const handleAdd = useCallback(() => {
    updateQuantity(item.product.id, item.quantity + 1);
    setInputValue(String(item.quantity + 1));
  }, [updateQuantity, item.product.id, item.quantity]);

  return (
    <div className={styles.wrapper}>
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.title}>{item.product.title}</p>
        <p className={styles.price}>
          {formatCurrency(item.product.price * item.quantity)}
        </p>
      </div>
      <div className={styles.actions}>
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.qty}
        />
        <div className={styles.actionControl}>
          <button onClick={handleRemove} className={styles.action}>
            -
          </button>
          <button onClick={handleAdd} className={styles.action}>
            +
          </button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";
