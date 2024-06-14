const Carts = require('../models').carts;

// Create a new cart item
const createCartItem = async (req, res) => {
  try {
    const cartItem = await Carts.create(req.body);
    return res.status(201).json(cartItem);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Carts.findAll();
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get cart item by ID
const getCartItemById = async (req, res) => {
  try {
    const cartItem = await Carts.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update cart item by ID
const updateCartItem = async (req, res) => {
  try {
    const cartItem = await Carts.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.update(req.body);
    return res.status(200).json(cartItem);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete cart item by ID
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Carts.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem
};
