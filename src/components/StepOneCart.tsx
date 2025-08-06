import React, { useEffect } from "react";
import { Trash2, ChevronRight } from "lucide-react";

interface CartItem {
  name: string;
  priceNumber: number;
  qtd: number;
}

interface StepOneCartProps {
  items: CartItem[];
  deliveryType: "retirada" | "entrega";
  onUpdateItems: (updatedItems: CartItem[]) => void;
  onDeliveryChange: (type: "retirada" | "entrega") => void;
  onNext: () => void;
  onClose: () => void;
  onTotalChange: (total: number) => void;
}

export default function StepOneCart({
  items,
  deliveryType,
  onUpdateItems,
  onDeliveryChange,
  onNext,
  onClose,
  onTotalChange,
}: StepOneCartProps) {
  const increaseQuantity = (index: number) => {
    const updated = [...items];
    updated[index].qtd += 1;
    onUpdateItems(updated);
  };

  const decreaseQuantity = (index: number) => {
    const updated = [...items];
    if (updated[index].qtd > 1) {
      updated[index].qtd -= 1;
      onUpdateItems(updated);
    }
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onUpdateItems(updated);
  };

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.priceNumber * item.qtd,
    0
  );
  const deliveryFee = deliveryType === "entrega" ? 15 : 0;
  const total = itemsTotal + deliveryFee;

  useEffect(() => {
    onTotalChange(total);
  }, [total, onTotalChange]);

  return (
    <>
      <h2 className="mb-4 text-lg font-bold">Seu Carrinho</h2>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700">Nenhum item adicionado ainda.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Voltar às compras
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-2 pb-2 mb-2 text-sm font-bold border-b">
            <span>Produto</span>
            <span className="text-center">Qtd</span>
            <span className="text-center">Unitário</span>
            <span className="text-right">Subtotal</span>
            <span className="text-center">Remover</span>
          </div>
          <div className="pr-1 mb-4 overflow-y-auto max-h-44 lg:max-h-full">
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
          </div>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold text-md">
              Forma de Recebimento:
            </h3>
            <h6 className="mb-2 text-xs font-extralight">
              <span className="font-semibold"> Local de retirada:</span> Av.
              A.J. Renner, 1800 - Humaitá - Porto Alegre/RS
            </h6>
            <h6 className="mb-2 text-xs font-extralight">
              <span className="font-semibold">
                {" "}
                Entregas a partir das 19:00 - 14/08/2025
              </span>{" "}
            </h6>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="retirada"
                  checked={deliveryType === "retirada"}
                  onChange={() => onDeliveryChange("retirada")}
                  className="accent-red-600"
                />
                Retirada
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="entrega"
                  checked={deliveryType === "entrega"}
                  onChange={() => onDeliveryChange("entrega")}
                  className="accent-red-600"
                />
                Entrega (+R$ 15,00)
              </label>
            </div>
          </div>
          <div className="flex flex-col items-end mt-6">
            <div className="mb-4 text-lg font-bold">
              Total: R$ {total.toFixed(2).replace(".", ",")}
            </div>
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Próximo
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
