const Carts = require('../models').carts;

// Create a new cart item
const createCart = async (req, res) => {
  try {
    const cart = await Carts.create(req.body);
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all cart items
const getAllCarts = async (req, res) => {
  try {
    const cart = await Carts.findAll();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get cart item by ID
const getCartById = async (req, res) => {
  try {
    const cart = await Carts.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update cart item by ID
const updateCart = async (req, res) => {
  try {
    const cart = await Carts.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cart.update(req.body);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete cart item by ID
const deleteCart = async (req, res) => {
  try {
    const cart = await Carts.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await cart.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart
};
