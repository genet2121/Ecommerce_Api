const PaymentMethods = require('../models').payment_methods;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
// Create a new payment method
const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.create(req.body);
    return res.status(201).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all payment methods
const getAllPaymentMethods = async (req, res) => {
  const { method_name, payment_type} = req.query;

  try {
    let whereClause = {};

    if (method_name) {
      whereClause.method_name = { [Op.like]: `%${method_name}%` };
    }
    if (payment_type) {
      whereClause.payment_type = { [Op.like]: `%${payment_type}%` };
    }
  
    console.log('whereClause:', whereClause);

    await getAllWithPagination(PaymentMethods, req, res, whereClause);
  } catch (error) {
    console.error('Error in getAllPaymentMethods:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get payment method by ID
const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    return res.status(200).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update payment method by ID
const updatePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    await paymentMethod.update(req.body);
    return res.status(200).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete payment method by ID
const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    await paymentMethod.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod
};
