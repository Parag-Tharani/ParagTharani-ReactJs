import React from 'react';
import './App.css';
import { Routes , Route } from "react-router-dom"
import { Navbar } from './components/navbar/navbar';
import { AllProducts } from './components/allProducts/allProducts';
import { CreateProduct } from './components/createProduct/createProduct';
import { ProductDetails } from './components/productDetails/productDetails';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllProducts />} />
        <Route path='/productDetails/:id' element={<ProductDetails />} />
        <Route path='/createProduct' element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
