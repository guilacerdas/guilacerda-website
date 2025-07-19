import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Clock } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Minha História
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-800">
              Gui Lacerda, Pizzaiolo Artesanal
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Minha paixão pela pizza napolitana começou durante uma viagem à Itália, onde aprendi 
              as técnicas tradicionais de preparo da massa e o segredo do forno a lenha. Desde então, 
              dedico-me a trazer essa experiência autêntica para o Brasil.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Cada pizza é feita com ingredientes selecionados, massa fermentada por 48 horas e 
              o carinho de quem entende que uma boa pizza é muito mais que comida - é uma 
              experiência que conecta pessoas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-red-50 rounded-lg"
              >
                <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">+200</h4>
                <p className="text-sm text-gray-600">Eventos Realizados</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-red-50 rounded-lg"
              >
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">100%</h4>
                <p className="text-sm text-gray-600">Clientes Satisfeitos</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-red-50 rounded-lg"
              >
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">5+</h4>
                <p className="text-sm text-gray-600">Anos de Experiência</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src="https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg"
                alt="Gui Lacerda preparando pizza"
                className="w-full h-96 object-cover"
              />
              
              {/* Pizza Hand Animation Overlay */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  type: "spring", 
                  stiffness: 100,
                  delay: 0.5 
                }}
                viewport={{ once: true }}
                className="absolute top-4 right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🍕
                </motion.div>
              </motion.div>

              {/* Floating ingredients */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-6 left-6 text-3xl"
              >
                🍅
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 left-8 text-2xl"
              >
                🧀
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-12 right-8 text-2xl"
              >
                🌿
              </motion.div>
            </div>

            {/* Hand stretching pizza animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-xl"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold"
              >
                👐
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;