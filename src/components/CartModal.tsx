interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute text-gray-600 top-2 right-2 hover:text-black"
        >
          ✕
        </button>

        <h2 className="mb-4 text-lg font-bold">Seu Carrinho</h2>
        <p className="text-gray-700">Nenhum item adicionado ainda.</p>
      </div>
    </div>
  );
}
