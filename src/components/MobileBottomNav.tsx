import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import CartModal from "./CartModal";

export default function MobileBottomNav() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("pizzaCart") || "[]");

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("pizzaCart") || "[]");
    const total = cart.reduce(
      (sum: number, item: { qtd: number }) => sum + item.qtd,
      0
    );
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center items-center bg-white shadow-lg border-t border-gray-200 py-3 lg:hidden opacity-100">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-gray-700 hover:text-red-600"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
          <span className="mt-1 text-xs">Carrinho</span>
        </button>
      </nav>

      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
      )}
    </>
  );
}
