const Products = require('../models').products;

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
