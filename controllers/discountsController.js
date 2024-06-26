const Discounts = require('../models').discounts;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products;
const Users = require('../models').users;

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const discount = await Discounts.create(req.body);
    return res.status(201).json(discount);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all discounts
const getAllDiscounts = async (req, res) => {
  const { seller_id, product_id, discount_code, discount_percent, start_date, end_date} = req.query; 

  try {
    let whereClause = {};
    
    if (discount_code) {
      whereClause.discount_code = { [Op.like]: `%${discount_code}%` }; 
    }
    if (end_date) {
      whereClause.end_date = { [Op.eq]: end_date }; 
    }
    if (start_date) {
      whereClause.start_date = { [Op.eq]: start_date }; 
    }
    if (discount_percent) {
      whereClause.discount_percent = { [Op.eq]: discount_percent }; 
    }
    if (seller_id) {
      whereClause.seller_id = { [Op.eq]: seller_id }; 
    }
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id }; 
    }

    
    await getAllWithPagination(Discounts, req, res, whereClause, [
      {
        model: Users,
        as: 'seller',
      },
      {
        model: Product,
        as: 'product'
      }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
};
