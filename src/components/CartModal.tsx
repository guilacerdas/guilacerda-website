import { useState } from "react";
import StepTwoCustomerData from "./StepTwoCustomerData.tsx";
import StepOneCart from "./StepOneCart.tsx";
import ProgressBar from "./ProgressBar.tsx";
import StepThreePayment from "./StepThreePayment.tsx";

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
  const [step, setStep] = useState(1); // Etapas: 1=Carrinho, 2=Cliente, 3=Pagamento
  const [deliveryType, setDeliveryType] = useState<"retirada" | "entrega">(
    "retirada"
  );
  const [total, setTotal] = useState(0);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

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
        {step !== 3 && (
          <button
            onClick={handleClose}
            className="absolute text-gray-600 top-2 right-2 hover:text-black"
          >
            ✕
          </button>
        )}

        {items.length > 0 && <ProgressBar currentStep={step} totalSteps={3} />}

        {/* Conteúdo das Etapas */}
        {step === 1 && (
          <StepOneCart
            items={items}
            deliveryType={deliveryType}
            onUpdateItems={(updated) => {
              setItems(updated);
              localStorage.setItem("pizzaCart", JSON.stringify(updated));
              window.dispatchEvent(new Event("cart-updated"));
            }}
            onDeliveryChange={setDeliveryType}
            onNext={() => setStep(2)}
            onClose={handleClose}
            onTotalChange={setTotal}
          />
        )}
        {step === 2 && (
          <StepTwoCustomerData
            onNext={() => setStep(3)}
            onPrev={() => setStep(1)}
            total={total}
            deliveryType={deliveryType}
          />
        )}

        {step === 3 && <StepThreePayment onClose={handleClose} total={total} />}
      </div>
    </div>
  );
}
