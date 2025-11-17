const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'db.json');

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH);
    return JSON.parse(raw);
  } catch (e) {
    return { products: [], orders: [], users: [] };
  }
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// seed if empty
let db = readDB();
if (!db.products || db.products.length === 0) {
  db.products = [
    { id: 'p1', name: 'Cupcake Red Velvet', price: 6.50, description: 'Delicious red velvet cupcake with cream cheese frosting.', stock: 20, image: '/images/red-velvet.jpg' },
    { id: 'p2', name: 'Cupcake Chocolate', price: 5.50, description: 'Rich chocolate cupcake with ganache.', stock: 30, image: '/images/chocolate.jpg' },
    { id: 'p3', name: 'Cupcake Matcha', price: 7.00, description: 'Earthy matcha cupcake with white chocolate.', stock: 15, image: '/images/matcha.jpg' }
  ];
  writeDB(db);
}

app.get('/api/products', (req, res) => {
  db = readDB();
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  db = readDB();
  const p = db.products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'No items' });
  db = readDB();
  const order = { id: uuidv4(), items, customer, status: 'created', createdAt: new Date().toISOString() };
  db.orders.push(order);
  writeDB(db);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  db = readDB();
  res.json(db.orders);
});

// simple auth (mock)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  db = readDB();
  const exists = db.users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: 'User exists' });
  const user = { id: uuidv4(), name, email, password };
  db.users.push(user);
  writeDB(db);
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ id: user.id, name: user.name, email: user.email, token: 'mock-token' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('API running on', port));
