const Discounts = require('../models').discounts;

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const discount = await Discounts.create(req.body);
    return res.status(201).json(discount);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discounts.findAll();
    return res.status(200).json(discounts);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discount = await Discounts.findByPk(req.params.id);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }
    return res.status(200).json(discount);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update discount by ID
const updateDiscount = async (req, res) => {
  try {
    const discount = await Discounts.findByPk(req.params.id);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }
    await discount.update(req.body);
    return res.status(200).json(discount);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete discount by ID
const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discounts.findByPk(req.params.id);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }
    await discount.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
};
