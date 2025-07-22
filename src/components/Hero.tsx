import { motion } from "framer-motion";
import { ChefHat, Flame } from "lucide-react";

const Hero = () => {
  const userWidth = window.innerWidth;
  console.log("User Width:", userWidth);
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-32 h-32 bg-white rounded-full top-20 left-20"></div>
        <div className="absolute w-24 h-24 rounded-full bg-blue top-40 right-32"></div>
        <div className="absolute w-40 h-40 bg-white rounded-full bottom-32 left-1/4"></div>
        <div className="absolute bg-white rounded-full bottom-20 right-20 w-28 h-28"></div>
      </div>
      {userWidth < 1024 && (
        <img
          src="/images/guilacerda-pizzaiolo-1 (1).jpg"
          alt=""
          className="absolute object-cover w-full h-full opacity-40"
        />
      )}
      {userWidth > 1024 && (
        <img
          src="/images/guilacerda-pizzaiolo-6 (1).jpg"
          alt=""
          className="absolute object-cover w-full h-full opacity-40"
        />
      )}
      {/* Hero Content */}

      <div className="container relative z-10 p-10 text-center bg-black rounded-lg shadow-lg bg-opacity-20 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <ChefHat className="w-20 h-20 mb-4 text-white" />
          <Flame className="w-16 h-16 text-yellow-200" />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 text-5xl font-bold text-white md:text-7xl"
        >
          Gui Lacerda
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-4 text-xl text-orange-100 md:text-2xl"
        >
          Consultorias e Eventos
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto mb-12 text-lg text-orange-200"
        >
          Consultoria em panificação. Eventos exclusivos na sua casa e entregas
          semanais de pizzas pré-assadas.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-lg font-semibold text-red-600 transition-shadow bg-white rounded-full shadow-lg hover:shadow-xl"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver Produtos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-lg font-semibold text-white transition-colors border-2 border-white rounded-full hover:bg-white hover:text-red-600"
            onClick={() =>
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Solicitar Evento
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Pizza Animation */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute w-16 h-16 bg-yellow-400 rounded-full bottom-10 right-10 opacity-20"
      />
    </section>
  );
};

export default Hero;
