import React from "react";
import { motion } from "framer-motion";
import { Instagram, Phone, Mail, MapPin, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 text-white bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-2xl font-bold">Gui Lacerda</h3>
            <p className="mb-6 text-gray-400">
              Pizza, panificação e Desenvolvimento Web
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/gui.lacerdas/"
                className="p-3 transition-colors bg-gray-800 rounded-full hover:bg-red-600"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/gui-lacerdas/"
                className="p-3 transition-colors bg-gray-800 rounded-full hover:bg-red-600"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">(21) 99579-9044</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">guilacerda@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">
                  Porto Alegre (ou onde você estiver)
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold">Horários</h4>
            <div className="space-y-2 text-gray-400">
              <p>Entregas: Quinta-feira</p>
              <p>Eventos: Agenda flexível</p>
              <p>Atendimento: Seg-Sex 9h-18h</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 mt-12 text-center border-t border-gray-800"
        >
          <p className="text-gray-400">
            © 2025 Gui Lacerda. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
