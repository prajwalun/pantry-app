import React, { useState, useEffect } from 'react';
import { addPantryItem, getPantryItems, updatePantryItem, deletePantryItem } from '../services/firebaseServices';

function PantryForm() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const loadedItems = await getPantryItems();
    setItems(loadedItems);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addPantryItem({ name, quantity: Number(quantity) });
    setName('');
    setQuantity('');
    loadItems();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePantryItem(editingId, { name, quantity: Number(quantity) });
    setEditingId('');
    setName('');
    setQuantity('');
    loadItems();
  };

  const handleDelete = async (id) => {
    await deletePantryItem(id);
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setQuantity(item.quantity);
  };

  const cancelEdit = () => {
    setEditingId('');
    setName('');
    setQuantity('');
  };

  return (
    <div>
      <h1>Pantry Manager</h1>
      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input type="text" placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        <button type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
        {editingId && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PantryForm;
