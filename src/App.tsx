import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductList } from "./features/products";
import { Cart } from "./features/cart";
import { useCartStore } from "./store/cartStore";
import { useBodyScrollLock } from "./shared/hooks/useBodyScrollLock";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const styles = {
  root: "min-h-screen bg-gray-50",
  header:
    "sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between",
  logo: "text-xl font-bold text-gray-900 tracking-tight",
  cartBtn:
    "relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors",
  cartBadge:
    "absolute -top-2 -right-3 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
  main: "max-w-7xl mx-auto px-6 py-8 flex gap-8",
  content: "flex-1 min-w-0",
  aside: "hidden lg:block w-96 shrink-0",
  cartPanel:
    "sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6",
  overlay: "fixed inset-0 z-20 bg-black/50 lg:hidden",
  drawer:
    "fixed top-0 right-0 z-30 h-full w-88 bg-white shadow-xl px-4 py-6 overflow-y-auto lg:hidden",
};

function Header({ onCartClick }: { onCartClick: () => void }) {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>ShopLens</h1>
      <button onClick={onCartClick} className={styles.cartBtn}>
        🛒 Carrinho
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </button>
    </header>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  useBodyScrollLock(cartOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.root}>
        <Header onCartClick={() => setCartOpen((prev) => !prev)} />

        <main className={styles.main}>
          <div className={styles.content}>
            <ProductList />
          </div>

          {/* desktop — sidebar no fluxo normal */}
          {cartOpen && (
            <aside className={styles.aside}>
              <div className={styles.cartPanel}>
                <Cart onClose={() => setCartOpen(false)} />
              </div>
            </aside>
          )}
        </main>

        {/* mobile — drawer + overlay fora do main */}
        {cartOpen && (
          <>
            <div
              className={styles.overlay}
              onClick={() => setCartOpen(false)}
            />
            <div className={styles.drawer}>
              <Cart onClose={() => setCartOpen(false)} />
            </div>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
