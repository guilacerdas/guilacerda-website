import { motion } from "framer-motion";
import { ChefHat, Flame } from "lucide-react";
import PizzaGame from "./PizzaGame";

const Hero = () => {
  const userWidth = window.innerWidth;

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
      <PizzaGame />
    </section>
  );
};

export default Hero;
