import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Catalog(){
  const [products, setProducts] = useState([])
  useEffect(()=> {
    axios.get('http://localhost:4000/api/products').then(r=>setProducts(r.data)).catch(()=>[])
  },[])
  return (
    <div>
      <h2>Catálogo</h2>
      <div className="grid">
        {products.map(p=>(
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>R$ {p.price.toFixed(2)}</p>
            <Link to={`/product/${p.id}`}>Ver</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
