import React, { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";

interface StepThreePaymentProps {
  onClose: () => void;
  total: number;
}

export default function StepThreePayment({
  onClose,
  total,
}: StepThreePaymentProps) {
  const [copied, setCopied] = useState(false);
  const pixKey = "guilacerda@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar PIX:", err);
    }
  };

  const handleFinish = () => {
    localStorage.removeItem("pizzaCart");
    window.dispatchEvent(new Event("cart-updated"));
    onClose();
  };

  return (
    <div className="space-y-5 text-center">
      <h2 className="text-lg font-bold text-green-700">
        Pedido enviado com sucesso!
      </h2>
      <p className="text-gray-700">Confirmação mediante pagamento via PIX.</p>
      <div className="p-4 space-y-4 bg-gray-100 rounded">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Chave PIX:</span>
          <span className="px-3 py-1 font-mono text-sm bg-white border border-gray-300 rounded">
            {pixKey}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 transition-colors bg-white border rounded hover:bg-gray-200"
            aria-label="Copiar chave PIX"
          >
            {copied ? (
              <Check size={18} className="text-green-600" />
            ) : (
              <ClipboardCopy size={18} className="text-gray-600" />
            )}
          </button>
        </div>

        {copied && (
          <p className="text-sm text-green-600 animate-pulse">Chave copiada!</p>
        )}
        <img
          src="/images/qrcode-caixa.jpg"
          alt="QR Code para pagamento PIX"
          className="w-40 h-40 mx-auto"
        />

        <p className="text-sm text-gray-600">
          Escaneie o QR Code ou use a chave para pagar <br />
          <strong className="text-black">
            R$ {total.toFixed(2).replace(".", ",")}
          </strong>
        </p>
      </div>

      <button
        onClick={handleFinish}
        className="px-6 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
      >
        Concluir
      </button>
    </div>
  );
}
