import { useState } from "react";
import CartModal from "./CartModal";
import { ShoppingCart } from "lucide-react"; // ícone opcional (instale lucide-react)
import { motion } from "framer-motion";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);

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
      </button>

      {/* Modal */}
      {isOpen && <CartModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
