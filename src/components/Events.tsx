import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Phone, Mail, User, Send } from 'lucide-react';

const Events = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    guests: '',
    city: '',
    date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mblkdnbz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          guests: formData.guests,
          city: formData.city,
          date: formData.date,
          subject: 'Solicitação de Orçamento - Evento Pizza Napolitana',
          message: `
            Nova solicitação de orçamento para evento:
            
            Nome: ${formData.name}
            E-mail: ${formData.email}
            WhatsApp: ${formData.whatsapp}
            Número de convidados: ${formData.guests}
            Cidade: ${formData.city}
            Data desejada: ${formData.date}
          `
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Limpar formulário após envio bem-sucedido
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          guests: '',
          city: '',
          date: ''
        });
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar solicitação. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-orange-100 to-red-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Eventos Exclusivos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leve a experiência autêntica da pizza napolitana para sua casa. 
            Preparo ao vivo com massa aberta na mão e forno a lenha portátil.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Como Funciona</h3>
            
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="bg-red-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Agendamento</h4>
                  <p className="text-gray-600">Escolha a data ideal para seu evento e confirme disponibilidade</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="bg-red-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Preparação</h4>
                  <p className="text-gray-600">Levo todos os ingredientes e equipamentos necessários</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <div className="bg-red-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Experiência</h4>
                  <p className="text-gray-600">Show de preparo ao vivo com pizzas napolitanas autênticas</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Send className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Solicitação Enviada!</h3>
                <p className="text-gray-600">Entrarei em contato em breve para confirmar os detalhes do seu evento.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Solicite seu Orçamento
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <label className="block text-gray-700 font-semibold mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Convidados
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      >
                        <option value="">Selecione</option>
                        <option value="5-10">5-10 pessoas</option>
                        <option value="11-20">11-20 pessoas</option>
                        <option value="21-30">21-30 pessoas</option>
                        <option value="30+">Mais de 30</option>
                      </select>
                    </motion.div>

                    <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <label className="block text-gray-700 font-semibold mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Data
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={inputVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Sua cidade"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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