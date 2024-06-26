const Carts = require('../models').carts;
const Users = require('../models').users;
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products

// Create a new cart item
const createCart = async (req, res) => {
  try {
    const cart = await Carts.create(req.body);
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all cart items
const getAllCarts = async (req, res) => {
  const { user_id, product_id } = req.query;

  try {
    let whereClause = {};

    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id };
    }
    
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id };
    }


    console.log('whereClause:', whereClause);

    await getAllWithPagination(Carts, req, res, whereClause, [
      {
        model: Users,
        as: 'user'
      },
      {
        model: Product,
        as: 'product'
      }

    ]);
  } catch (error) {
    console.error('Error in getAllCarts:', error);
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart
};
