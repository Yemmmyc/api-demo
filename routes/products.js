const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Laptop', price: 500 },
  { id: 2, name: 'Phone', price: 200 }
];

// GET all products
router.get('/', (req, res) => res.json(products));

// GET single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});

// CREATE product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price required' });

  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.status(204).send();
});

module.exports = router;
