import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Flame, Heart } from 'lucide-react';

const Products = () => {
  const pizzas = [
    {
      name: "Marguerita",
      description: "Clássica pizza com molho de tomate, mozzarella de búfala e manjericão fresco",
      price: "R$ 35,00",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      link: "/comprar/marguerita"
    },
    {
      name: "Calabresa",
      description: "Tradicional calabresa artesanal com cebola roxa e molho especial",
      price: "R$ 38,00",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      link: "/comprar/calabresa"
    },
    {
      name: "Tomate Confit",
      description: "Tomates confitados com azeite de ervas, rúcula e parmesão",
      price: "R$ 42,00",
      image: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg",
      link: "/comprar/tomate-confit"
    },
    {
      name: "Cebola Caramelizada com Gorgonzola",
      description: "Cebolas caramelizadas com gorgonzola cremoso e nozes",
      price: "R$ 45,00",
      image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg",
      link: "/comprar/cebola-gorgonzola"
    }
  ];

  const choriPizza = {
    name: "ChoriPizza",
    description: "Nossa especialidade exclusiva com chorizo artesanal e pimentões assados",
    price: "R$ 48,00",
    image: "https://images.pexels.com/photos/1082343/pexels-photo-1082343.jpeg",
    link: "/comprar/choripizza"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const ProductCard = ({ product, isSpecial = false }: { product: any, isSpecial?: boolean }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group relative ${isSpecial ? 'ring-4 ring-yellow-400' : ''}`}
      onClick={() => window.open(product.link, '_blank')}
    >
      {isSpecial && (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 right-4 z-10"
        >
          <Flame className="w-6 h-6 text-red-500" />
        </motion.div>
      )}
      
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-6 h-6 text-red-600" />
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          {product.name}
          {isSpecial && <Heart className="w-5 h-5 text-red-500 fill-current" />}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-600">{product.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Comprar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Próxima Fornada
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pizzas napolitanas pré-assadas, prontas para finalizar no seu forno. 
            Entrega semanal com ingredientes frescos e selecionados.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {pizzas.map((pizza, index) => (
            <ProductCard key={index} product={pizza} />
          ))}
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Especialidade da Casa</h3>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <ProductCard product={choriPizza} isSpecial={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default Products;