import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Cart(){
  const [cart, setCart] = useState([])
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart')||'[]')),[])
  const checkout = async () => {
    const order = { items: cart, customer: { name: 'Teste', email: 'teste@example.com' } }
    try {
      const res = await axios.post('http://localhost:4000/api/orders', order)
      alert('Pedido criado: ' + res.data.id)
      localStorage.removeItem('cart')
      setCart([])
    } catch (e) { alert('Erro ao criar pedido') }
  }
  if (cart.length===0) return <p>Seu carrinho está vazio.</p>
  return (
    <div>
      <h2>Carrinho</h2>
      <ul>
        {cart.map((c,i)=> <li key={i}>{c.name} - R$ {c.price.toFixed(2)}</li>)}
      </ul>
      <button onClick={checkout}>Finalizar pedido</button>
    </div>
  )
}
