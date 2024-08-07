// routes/itemRoutes.js
const express = require('express');
const db = require('../config/firebaseConfig').default;
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  const snapshot = await db.collection('pantryItems').get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(items);
});

// Add a new item
router.post('/', async (req, res) => {
  const result = await db.collection('pantryItems').add(req.body);
  res.status(201).json({ id: result.id });
});

// Update an item
router.put('/:id', async (req, res) => {
  await db.collection('pantryItems').doc(req.params.id).update(req.body);
  res.status(200).send("Item Updated");
});

// Delete an item
router.delete('/:id', async (req, res) => {
  await db.collection('pantryItems').doc(req.params.id).delete();
  res.status(200).send("Item Deleted");
});

module.exports = router;
