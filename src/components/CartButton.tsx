import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { ShoppingCart } from "lucide-react"; // ícone opcional (instale lucide-react)
import { motion } from "framer-motion";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <>
      {/* Botão do carrinho */}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed p-4 text-white transition bg-yellow-400 rounded-full shadow-lg bottom-5 right-5 hover:bg-yellow-500"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingCart size={24} className="text-red-500 " />
        </motion.div>
        {cartCount > 0 && (
          <span className="absolute px-2 text-xs text-white bg-red-600 rounded-full -top-1 -right-1">
            {cartCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <CartModal onClose={() => setIsOpen(false)} cartItems={cartItems} />
      )}
    </>
  );
}
