import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "../pages/Home";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetail from '../pages/ProductDetail';


function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
