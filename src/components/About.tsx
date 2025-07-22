import React from "react";
import { motion } from "framer-motion";
import { Award, Heart, Clock } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
            Minha História
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
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

            <p className="text-lg leading-relaxed text-gray-600">
              Minha história com a pizza começou em 2012 com o Pizza Sessions
              fazendo eventos de pizza e cursos na região sul e sudeste. Em 2015
              passei a trabalhar com consultorias de panificação em pizzarias,
              restaurantes e hotéis na cidade do Rio de Janeiro. Hoje, em Porto
              Alegre, levo a pizza napolitana para eventos personalizados,
              ministro cursos, dou consultorias e faço entregas semanais de
              pizza pré-assada.
            </p>

            <p className="text-lg leading-relaxed text-gray-600">
              Cada pizza é feita com ingredientes selecionados, massa com
              fermentação lenta e o carinho de quem entende que uma boa pizza é
              muito mais que comida - é uma experiência que conecta pessoas.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center rounded-lg bg-red-50"
              >
                <Award className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h4 className="font-semibold text-gray-800">+1000</h4>
                <p className="text-sm text-gray-600">Eventos Realizados</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center rounded-lg bg-red-50"
              >
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h4 className="font-semibold text-gray-800">100%</h4>
                <p className="text-sm text-gray-600">
                  feito para amantes de pizza
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 text-center rounded-lg bg-red-50"
              >
                <Clock className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h4 className="font-semibold text-gray-800">13+</h4>
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
            <div className="relative overflow-hidden shadow-2xl rounded-2xl">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src="/images/guilacerda-pizzaiolo-1 (2).jpg"
                alt="Gui Lacerda preparando pizza"
                className="object-cover w-full h-96"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
