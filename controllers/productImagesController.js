const ProductImages = require('../models').product_images;

// Create a new product image
const createProductImage = async (req, res) => {
  try {
    const { product_id } = req.body;
    const imagePath = req.file.path;

    const admin = await ProductImages.create({
      product_id: product_id,
      image: imagePath
    });

    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all product images
const getAllProductImages = async (req, res) => {
  try {
    const productImages = await ProductImages.findAll();
    return res.status(200).json(productImages);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get product image by ID
const getProductImageById = async (req, res) => {
  try {
    const productImage = await ProductImages.findByPk(req.params.id);
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    return res.status(200).json(productImage);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update product image by ID
const updateProductImage = async (req, res) => {
  try {
    const productImage = await ProductImages.findByPk(req.params.id);
    const imagePath = req.file.path;
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    await productImage.update(req.body);
    await productImage.update({ image: imagePath });
    return res.status(200).json(productImage);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete product image by ID
const deleteProductImage = async (req, res) => {
  try {
    const productImage = await ProductImages.findByPk(req.params.id);
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    await productImage.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
  deleteProductImage
};
