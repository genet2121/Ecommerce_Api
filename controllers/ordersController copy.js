const Orders = require('../models').orders;
const getAllWithpagination = require('../utils/pagination');

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
  await getAllWithpagination(Orders, req, res);
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
