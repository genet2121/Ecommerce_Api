const ProductAttributes = require('../models').productAttributes;
const getAllWithpagination = require('../utils/pagination');

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
  await getAllWithpagination(ProductAttributes, req, res);
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
