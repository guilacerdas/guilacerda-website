import { motion } from "framer-motion";
import { ExternalLink, Flame, Heart } from "lucide-react";

type CartItem = {
  name: string;
  price: string;
  qtd: number;
};

const Products = () => {
  const addCart = (name: string, price: string, qtd: number) => {
    const currentCart = JSON.parse(
      window.localStorage.getItem("pizzaCart") || "[]"
    );
    const priceNumber = parseFloat(price.replace("R$", "").replace(",", "."));

    const newItem = { name, priceNumber, qtd };

    const index = currentCart.findIndex((item: CartItem) => item.name === name);
    if (index !== -1) {
      currentCart[index].qtd += qtd;
    } else {
      currentCart.push(newItem);
    }
    window.localStorage.setItem("pizzaCart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const pizzas = [
    {
      name: "Marguerita",
      description:
        "Massa de Fermentação lenta com farinha 00, molho de tomate pelatti, muçarela de búfala, tomate grape e manjericão fresco",
      price: "R$ 42,00",
      image: "/images/Margherita-Pizza-rotated.jpeg",
      link: "#",
    },
    {
      name: "Calabresa",
      description:
        "Massa de Fermentação lenta com farinha 00, molho de tomate pelatti, muçarela de búfala, calabresa fatiada, parmesão e cebola roxa",
      price: "R$ 48,00",
      image: "/images/Calabresa.jpg",
      link: "#",
    },
    {
      name: "Tomate Confit",
      description:
        "Massa de Fermentação lenta com farinha 00, molho de tomate pelatti, tomate confitado, cebola roxa e noz pecan",
      price: "R$ 48,00",
      image: "/images/pizza_sessions-8 (2).jpg",
      link: "#",
    },
    {
      name: "Cebola Caramelizada com Gorgonzola",
      description:
        "Massa de Fermentação lenta com farinha 00, molho de tomate pelatti, muçarela, cebola caramelizada e gorgonzola",
      price: "R$ 49,00",
      image: "/images/IMG_1630.jpg",
      link: "#",
    },
    {
      name: "Massa de Pizza",
      description:
        "Massa de pizza pré-assada com fermentação lenta feita com farinha 00 e molho de tomate pelatti. Você monta seu sabor em casa.",
      price: "R$ 26,00",
      image: "/images/pizza-pre-assada.png",
      link: "#",
    },
  ];

  const choriPizza = {
    name: "ChoriPizza",
    description:
      "Choripizza traz uma combinação irresistível de linguiça artesanal suculenta, molho chimichurri e muçarela, tudo sobre uma base leve de farinha tipo 00 com fermentação lenta, no estilo napolitano. Cada pedaço revela o sabor defumado da linguiça harmonizado com o frescor das ervas, criando uma experiência única e cheia de personalidade.",
    price: "R$ 35,00",
    image: "/images/WhatsApp Image 2025-03-26 at 15.56.13 (1).jpeg",
    link: "#",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const ProductCard = ({
    product,
    isSpecial = false,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: any;
    isSpecial?: boolean;
  }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group relative ${
        isSpecial ? "ring-4 ring-yellow-400" : ""
      }`}
    >
      {isSpecial && (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute z-10 top-4 right-4"
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
          className="object-cover w-full h-48"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="p-3 transition-opacity bg-white rounded-full opacity-0 group-hover:opacity-100"
          >
            <ExternalLink className="w-6 h-6 text-red-600" />
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="flex items-center gap-2 mb-2 text-xl font-bold text-gray-800">
          {product.name}
          {isSpecial && <Heart className="w-5 h-5 text-red-500 fill-current" />}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            {product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => addCart(product.name, product.price, 1)}
          >
            Comprar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
            Próxima Fornada - 07/08/2025
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Pizzas napolitanas pré-assadas, prontas para finalizar no seu forno.
            Entrega semanal com ingredientes frescos e selecionados.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4"
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
          className="mb-8 text-center"
        >
          <h3 className="mb-4 text-3xl font-bold text-gray-800">
            Especialidade da Casa
          </h3>
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
