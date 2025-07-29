import React from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Events from "./components/Events";
import About from "./components/About";
import Footer from "./components/Footer";
import CartButton from "./components/CartButton";
import MobileBottomNav from "./components/MobileBottomNav";
function App() {
  return (
    <div className="min-h-screen pb-20 overflow-hidden bg-gradient-to-b from-orange-50 to-red-50">
      <Hero />
      <CartButton />
      <Products />
      <Events />
      <About />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default App;
