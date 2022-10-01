import React from 'react';
import './App.css';
import { Routes , Route } from "react-router-dom"
import { Navbar } from './components/navbar/navbar';
import { AllProducts } from './components/allProducts/allProducts';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllProducts />} />
      </Routes>
    </div>
  );
}

export default App;
