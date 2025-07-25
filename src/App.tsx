import React from 'react';
import Hero from './components/Hero';
import Products from './components/Products';
import Events from './components/Events';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Hero />
      <Products />
      <Events />
      <About />
      <Footer />
    </div>
  );
}

export default App;