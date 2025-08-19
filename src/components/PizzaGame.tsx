import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import pizzaImage from "/images/pizza-icon.png"; // imagem pequena e redonda da pizza

const PizzaGame = () => {
  const [pizzas, setPizzas] = useState([{ x: 100, y: 100, dx: 2, dy: 2 }]);
  const [barX, setBarX] = useState(200);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const gameRef = useRef<HTMLDivElement>(null);

  const gameWidth = 600;
  const gameHeight = 400;
  const barWidth = 120;
  const barHeight = 20;

  // Movimento das pizzas
  useEffect(() => {
    const interval = setInterval(() => {
      setPizzas((prev) =>
        prev.map((pizza) => {
          const newX = pizza.x + pizza.dx;
          const newY = pizza.y + pizza.dy;
          let newDx = pizza.dx;
          let newDy = pizza.dy;

          // Colisão com parede
          if (newX < 0 || newX > gameWidth - 30) newDx *= -1;

          // Colisão com barra
          if (
            newY + 30 >= gameHeight - barHeight &&
            newX + 30 > barX &&
            newX < barX + barWidth
          ) {
            newDy *= -1;
            setScore((score) => score + 1);
          }

          // Caiu no chão
          if (newY > gameHeight) {
            setLives((l) => l - 1);
            return { ...pizza, y: 0, x: Math.random() * (gameWidth - 30) };
          }

          return { ...pizza, x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );
    }, 16);
    return () => clearInterval(interval);
  }, [barX]);

  // Mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameRef.current) {
        const bounds = gameRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        setBarX(Math.min(Math.max(x - barWidth / 2, 0), gameWidth - barWidth));
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={gameRef}
      className="relative mx-auto mt-8 bg-black border-4 border-white rounded-md"
      style={{ width: gameWidth, height: gameHeight }}
    >
      {/* Pizzas */}
      {pizzas.map((pizza, idx) => (
        <motion.img
          key={idx}
          src={pizzaImage}
          alt="pizza"
          className="absolute w-8 h-8"
          style={{ left: pizza.x, top: pizza.y }}
        />
      ))}

      {/* Barra */}
      <div
        className="absolute bg-yellow-300 rounded-full"
        style={{
          bottom: 0,
          left: barX,
          width: barWidth,
          height: barHeight,
        }}
      />

      {/* Pontuação e Vidas */}
      <div className="absolute font-bold text-white top-2 left-2">
        🍕 Pontos: {score}
      </div>
      <div className="absolute font-bold text-white top-2 right-2">
        ❤️ Vidas: {lives}
      </div>
    </div>
  );
};

export default PizzaGame;
