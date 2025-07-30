import React, { useEffect, useState } from "react";

interface CustomerData {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
}

interface StepTwoCustomerDataProps {
  onNext: () => void;
  onPrev: () => void;
  total: number;
  deliveryType: "retirada" | "entrega";
}

export default function StepTwoCustomerData({
  onNext,
  total,
  deliveryType,
}: StepTwoCustomerDataProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const existingData = localStorage.getItem("customerData");
    if (existingData) {
      setCustomerData(JSON.parse(existingData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerData.name.trim()) newErrors.name = "Nome obrigatório";
    if (!customerData.email.trim()) {
      newErrors.email = "Email obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!customerData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp obrigatório";
    } else if (!/^\d{10,15}$/.test(customerData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "WhatsApp inválido";
    }
    if (!customerData.address.trim())
      newErrors.address = "Endereço obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      localStorage.setItem("customerData", JSON.stringify(customerData));
      const pizzaCart = localStorage.getItem("pizzaCart") || "[]";

      await fetch("https://formspree.io/f/xkgzbljv", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...customerData,
          cart: JSON.parse(pizzaCart),
          total: total.toFixed(2),
          deliveryType,
        }),
      });

      onNext();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setSubmitError("Erro ao enviar o pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-bold">DADOS DO CLIENTE</h2>

      <div>
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          placeholder="Nome completo"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          name="whatsapp"
          value={customerData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp com DDD"
          className="w-full p-2 border rounded"
        />
        {errors.whatsapp && (
          <p className="text-sm text-red-600">{errors.whatsapp}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="address"
          value={customerData.address}
          onChange={handleChange}
          placeholder="Endereço de entrega"
          className="w-full p-2 border rounded"
        />
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {submitError && (
        <div className="p-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
          {submitError}
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 font-semibold text-white rounded ${
            isSubmitting
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
              Enviando...
            </span>
          ) : (
            "Próximo"
          )}
        </button>
      </div>
    </div>
  );
}
