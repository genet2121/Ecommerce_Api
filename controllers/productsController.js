const { Op } = require('sequelize');
const Products = require('../models').products;
const CategoryAttribute = require('../models').category_attributes;
const User =require('../models').users;
const Discount = require('../models').discounts
const getAllWithPagination = require('../utils/pagination');
const moment = require('moment');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { p_name, des, price, price_in_doller, cat_attr_id, seller_id, discount_id } = req.body;

    let discountedPrice = null; // Initialize discounted price

    // Fetch the discount information if available
    if (discount_id) {
      const discount = await Discount.findByPk(discount_id);
      if (discount) {
        const currentDate = moment();
        const startDate = moment(discount.start_date);
        const endDate = moment(discount.end_date);

        // Check if current date is within discount period
        if (currentDate.isBetween(startDate, endDate, null, '[]')) {
          const discountPercent = parseFloat(discount.discount_percent) / 100;
          discountedPrice = price * (1 - discountPercent);
        }
      }
    }

    const product = await Products.create({
      p_name,
      des,
      price,
      discountedPrice, // Store the discounted price in the database
      price_in_doller,
      cat_attr_id,
      seller_id,
      discount_id
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Get all products
const getAllProducts = async (req, res) => {
  const { p_name, price, cat_attr_id, seller_id, discount_id } = req.query; 

  try {
    let whereClause = {};
    if (p_name) {
      whereClause.p_name = { [Op.like]: `%${p_name}%` }; 
    }
    if (price) {
      whereClause.price = { [Op.eq]: price }; 
    }
    if (cat_attr_id) {
      whereClause.cat_attr_id = { [Op.eq]: cat_attr_id }; 
    }
    if (seller_id) {
      whereClause.seller_id = { [Op.eq]: seller_id }; 
    }
    if (discount_id) {
      whereClause.discount_id = { [Op.eq]: discount_id }; 
    }

    console.log('whereClause:', whereClause); 

     await getAllWithPagination(Products, req, res, whereClause, [
      {
        model: CategoryAttribute,
        as: 'cat_attr'
      },
      {
        model: User,
        as: 'seller'
      },
      {
        model: Discount,
        as: 'discount'
      }
    ]);

  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return res.status(500).json({ error: error.message });
  }
};



// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update(req.body);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
