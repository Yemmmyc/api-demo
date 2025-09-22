const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Yemisi', role: 'Admin' },
  { id: 2, name: 'Ada', role: 'User' }
];

// GET all users
router.get('/', (req, res) => res.json(users));

// GET single user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

// CREATE new user
router.post('/', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ error: 'Name and role required' });

  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name || user.name;
  user.role = req.body.role || user.role;
  res.json(user);
});

// DELETE user
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
});

module.exports = router;
