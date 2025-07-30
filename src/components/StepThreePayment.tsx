interface StepThreePaymentProps {
  onClose: () => void;
}

export default function StepThreePayment({ onClose }: StepThreePaymentProps) {
  const handleFinish = () => {
    localStorage.removeItem("pizzaCart");
    window.dispatchEvent(new Event("cart-updated"));
    onClose();
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-bold text-green-700">
        Pedido Enviado, confirmação mediante pagamento.
      </h2>

      {/* QR Code (pode ser uma imagem gerada manualmente ou via lib futura) */}
      <div className="flex justify-center">
        <img
          src="/qr-code-pix.png" // substitua pelo seu QR real ou use uma lib no futuro
          alt="QR Code para pagamento"
          className="w-40 h-40"
        />
      </div>

      {/* Chave PIX */}
      <p className="text-sm font-medium">
        <strong>Chave PIX:</strong> guilacerda@gmail.com
      </p>

      {/* Botão para concluir */}
      <button
        onClick={handleFinish}
        className="px-4 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Concluir
      </button>
    </div>
  );
}
