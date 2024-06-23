const ProductImages = require('../models').product_images;

// Create a new product image
const createProductImage = async (req, res) => {
  try {
    const { product_id } = req.body;

    const admin = await ProductImages.create({
      product_id: product_id,
      image: ''
    });

    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Upload product image
const uploadProductImage = async (req, res) => {
  const productId = req.params.id;
  const imagePath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const product = await ProductImages.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }

    product.image = imagePath;
    await product.save();

    return res.status(200).json({ message: 'Image uploaded successfully', product });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
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
    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    await productImage.update(req.body);
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
  uploadProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
  deleteProductImage
};
