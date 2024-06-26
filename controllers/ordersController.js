const Orders = require('../models').orders;
const { Op } = require('sequelize');
const Users = require('../models').users;
const getAllWithPagination = require('../utils/pagination');
const UserAddress =require('../models').user_addresses;
const Product =require('../models').products

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  const { buyer_id, seller_id, product_id, shipping_address_id } = req.query;

  try {
    let whereClause = {};

    if (buyer_id) {
      whereClause.buyer_id = { [Op.eq]: buyer_id };
    }
    if (seller_id) {
      whereClause.seller_id = { [Op.eq]: seller_id };
    }
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id };
    }
    if (shipping_address_id) {
      whereClause.buyer_id = { [Op.eq]: shipping_address_id };
    }

    console.log('whereClause:', whereClause);

    await getAllWithPagination(Orders, req, res, whereClause, [
      {
        model: Users,
        as: 'buyer'
      },
      {
        model: Users,
        as: 'seller'
      },
      {
        model: UserAddress,
        as: 'shipping_address'
      },
      {
        model: Product,
        as: 'product'
      }

    ]);
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update order by ID
const updateOrder = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update(req.body);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
