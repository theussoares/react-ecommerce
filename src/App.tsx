import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCartStore } from "./store/cartStore";
import { useBodyScrollLock } from "./shared/hooks/useBodyScrollLock";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { useProducts } from "./features/products";

// lazy fora do componente — referência estável
const Cart = lazy(() =>
  import("./features/cart").then((m) => ({ default: m.Cart })),
);

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
    "sticky top-0 z-40 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between",
  logo: "text-xl font-bold text-gray-900 tracking-tight",
  cartBtn:
    "relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors",
  cartBadge:
    "absolute -top-2 -right-3 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
  main: "max-w-7xl mx-auto px-2 lg:px-6 py-8 flex flex-col gap-8",
  content: "flex-1 min-w-0",
  overlay: "fixed inset-0 z-20 bg-black/50",
  drawer:
    "fixed top-0 right-0 z-30 h-full w-88 bg-white shadow-xl px-4 py-6 overflow-y-auto",
  status: "text-center text-gray-400 py-20 text-sm",
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

function AppLayout() {
  useProducts();
  const [cartOpen, setCartOpen] = useState(false);
  useBodyScrollLock(cartOpen);

  return (
    <div className={styles.root}>
      <Header onCartClick={() => setCartOpen((prev) => !prev)} />

      <main className={styles.main}>
        <div className={styles.content}>
          <Suspense fallback={<p className={styles.status}>Carregando...</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      {cartOpen && (
        <Suspense fallback={null}>
          <>
            <div
              className={styles.overlay}
              onClick={() => setCartOpen(false)}
            />
            <div className={styles.drawer}>
              <Cart onClose={() => setCartOpen(false)} />
            </div>
          </>
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
