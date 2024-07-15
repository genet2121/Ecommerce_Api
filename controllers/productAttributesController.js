const ProductAttributes = require('../models').product_attributes;
const getAllWithPagination = require('../utils/pagination');
const CategoryAttribute = require('../models').category_attributes;
const Products = require('../models').products
const { Op } = require('sequelize');
// Create a new productAttribute
const createProductAttribute = async (req, res) => {
  try {
    const productAttribute = await ProductAttributes.create(req.body);
    return res.status(201).json(productAttribute);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all product attributes
const getAllProductAttributes = async (req, res) => {
  const { product_id, category_attribute_id, attribute_value } = req.query;

  try {
    let whereClause = {};
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id };
    }
    if (category_attribute_id) {
      whereClause.category_attribute_id = { [Op.eq]: category_attribute_id };
    }
    if (attribute_value) {
      whereClause.attribute_value = { [Op.like]: `%${attribute_value}%` };
    }

    console.log('whereClause:', whereClause); 

    await getAllWithPagination(ProductAttributes, req, res, whereClause, [
      {
        model: Products,
        as: 'product'
      },
      {
        model: CategoryAttribute,
        as: 'category_attribute'
      },
    ]);
  } catch (error) {
    console.error('Error in getAllProducts:', error); 
    return res.status(500).json({ error: error.message });
  }
};

// Get product attribute by ID
const getProductAttributeById = async (req, res) => {
  try {
    const productAttribute = await ProductAttributes.findByPk(req.params.id);
    if (!productAttribute) {
      return res.status(404).json({ error: 'Product Attribute not found' });
    }
    return res.status(200).json(productAttribute);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update product attribute by ID
const updateProductAttribute = async (req, res) => {
  try {
    const productAttribute = await ProductAttributes.findByPk(req.params.id);
    if (!productAttribute) {
      return res.status(404).json({ error: 'Product Attribute not found' });
    }
    await productAttribute.update(req.body);
    return res.status(200).json(productAttribute);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete productAttribute item by ID
const deleteProductAttribute = async (req, res) => {
  try {
    const productAttribute = await ProductAttributes.findByPk(req.params.id);
    if (!productAttribute) {
      return res.status(404).json({ error: 'Product Attribute not found' });
    }
    await productAttribute.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createProductAttribute,
  getAllProductAttributes,
  getProductAttributeById,
  updateProductAttribute,
  deleteProductAttribute
};
