import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function Product(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/products/${id}`).then(r=>setProduct(r.data)).catch(()=>null)
  },[id])
  if (!product) return <p>Carregando...</p>
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push({ productId: product.id, name: product.name, price: product.price })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Adicionar ao carrinho</button>
    </div>
  )
}
