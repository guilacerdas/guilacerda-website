import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface CartItem {
  name: string;
  priceNumber: number;
  qtd: number;
}

interface CartModalProps {
  onClose: () => void;
  cartItems: CartItem[];
}

export default function CartModal({ onClose, cartItems }: CartModalProps) {
  const [items, setItems] = useState<CartItem[]>([...cartItems]);
  const [closing, setClosing] = useState(false);

  const updateLocalStorage = (updatedItems: CartItem[]) => {
    localStorage.setItem("pizzaCart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const increaseQuantity = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].qtd += 1;
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const decreaseQuantity = (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].qtd > 1) {
      updatedItems[index].qtd -= 1;
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 200); // Espera a animação de saída
  };

  const total = items.reduce(
    (sum, item) => sum + item.priceNumber * item.qtd,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        closing ? "animate-overlay-out" : "animate-overlay-in"
      }`}
    >
      <div
        className={`relative p-6 bg-white rounded-lg shadow-lg w-96 transform ${
          closing ? "animate-slide-up-out" : "animate-slide-up-in"
        }`}
      >
        {/* Botão de Fechar */}
        <button
          onClick={handleClose}
          className="absolute text-gray-600 top-2 right-2 hover:text-black"
        >
          ✕
        </button>

        <h2 className="mb-4 text-lg font-bold">Seu Carrinho</h2>

        {items.length === 0 ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">Nenhum item adicionado ainda.</p>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
            >
              Voltar às compras
            </button>
          </div>
        ) : (
          <>
            {/* Cabeçalho */}
            <div className="grid grid-cols-5 gap-2 pb-2 mb-2 text-sm font-bold border-b">
              <span>Produto</span>
              <span className="text-center">Qtd</span>
              <span className="text-center">Unitário</span>
              <span className="text-right">Subtotal</span>
              <span className="text-center">Remover</span>
            </div>

            {/* Lista de Itens */}
            {items.map((item, index) => (
              <div
                key={index}
                className="grid items-center grid-cols-5 gap-2 py-1 text-sm border-b"
              >
                <span>{item.name}</span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    –
                  </button>
                  <span>{item.qtd}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <span className="text-center">
                  R$ {item.priceNumber.toFixed(2)}
                </span>
                <span className="text-right">
                  R$ {(item.priceNumber * item.qtd).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Total Geral */}
            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
