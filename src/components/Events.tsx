import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Phone, Mail, User, Send } from "lucide-react";

const Events = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    guests: "",
    city: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mblkdnbz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          guests: formData.guests,
          city: formData.city,
          date: formData.date,
          subject: "Solicitação de Orçamento - Evento Pizza Napolitana",
          message: `
            Nova solicitação de orçamento para evento:
            
            Nome: ${formData.name}
            E-mail: ${formData.email}
            WhatsApp: ${formData.whatsapp}
            Número de convidados: ${formData.guests}
            Cidade: ${formData.city}
            Data desejada: ${formData.date}
          `,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Limpar formulário após envio bem-sucedido
        setFormData({
          name: "",
          email: "",
          whatsapp: "",
          guests: "",
          city: "",
          date: "",
        });
      } else {
        throw new Error("Erro ao enviar formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert(
        "Erro ao enviar solicitação. Tente novamente ou entre em contato pelo WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-orange-100 to-red-100"
    >
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
            Seu evento personalizado com pizza
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Leve a experiência autêntica da pizza napolitana para sua casa.
            Preparo ao vivo com massa aberta na mão e forno portátil de até
            470ºC. Farinha italiana, ingredientes selecionados, fermentação
            lenta e muito amor no que faço é o segredo para seu evento se tornar
            inesquecível.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-3xl font-bold text-gray-800">
              Como Funciona
            </h3>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="p-3 bg-red-100 rounded-full">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Agendamento</h4>
                  <p className="text-gray-600">
                    Você escolhe a data ideal para seu evento para confirmarmos
                    a disponibilidade
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="p-3 bg-red-100 rounded-full">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Preparação</h4>
                  <p className="text-gray-600">
                    Todos os ingredientes são preparados previamente e levados
                    para serem finalizados no seu evento
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="p-3 bg-red-100 rounded-full">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Experiência</h4>
                  <p className="text-gray-600">
                    Uma experiencia única com um pizzaiolo na sua casa, pizzas
                    voando e seus convidados saboreando cada pedaço
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 bg-white shadow-xl rounded-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="py-12 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full"
                >
                  <Send className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Solicitação Enviada!
                </h3>
                <p className="text-gray-600">
                  Entrarei em contato em breve para confirmar os detalhes do seu
                  evento.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
                  Solicite seu Orçamento
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label className="block mb-2 font-semibold text-gray-700">
                      <User className="inline w-4 h-4 mr-2" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label className="block mb-2 font-semibold text-gray-700">
                      <Mail className="inline w-4 h-4 mr-2" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label className="block mb-2 font-semibold text-gray-700">
                      <Phone className="inline w-4 h-4 mr-2" />
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      variants={inputVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label className="block mb-2 font-semibold text-gray-700">
                        <Users className="inline w-4 h-4 mr-2" />
                        Convidados
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Número de convidados"
                      />
                    </motion.div>

                    <motion.div
                      variants={inputVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label className="block mb-2 font-semibold text-gray-700">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Data
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label className="block mb-2 font-semibold text-gray-700">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Sua cidade"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center w-full gap-2 py-4 text-lg font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Solicitar Orçamento
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Events;
