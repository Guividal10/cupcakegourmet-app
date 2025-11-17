import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <header className="header">
        <h1><Link to="/">Cupcake</Link></h1>
        <nav>
          <Link to="/catalog">Catálogo</Link> | <Link to="/cart">Carrinho</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
