const PaymentMethods = require('../models').payment_methods;

// Create a new payment method
const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.create(req.body);
    return res.status(201).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all payment methods
const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethods.findAll();
    return res.status(200).json(paymentMethods);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod
};
