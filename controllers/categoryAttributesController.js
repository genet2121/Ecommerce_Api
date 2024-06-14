const CategoryAttributes = require('../models').category_attributes;

// Create a new category attribute
const createCategoryAttribute = async (req, res) => {
  try {
    const categoryAttribute = await CategoryAttributes.create(req.body);
    return res.status(201).json(categoryAttribute);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all category attributes
const getAllCategoryAttributes = async (req, res) => {
  try {
    const categoryAttributes = await CategoryAttributes.findAll();
    return res.status(200).json(categoryAttributes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get category attribute by ID
const getCategoryAttributeById = async (req, res) => {
  try {
    const categoryAttribute = await CategoryAttributes.findByPk(req.params.id);
    if (!categoryAttribute) {
      return res.status(404).json({ error: 'Category attribute not found' });
    }
    return res.status(200).json(categoryAttribute);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update category attribute by ID
const updateCategoryAttribute = async (req, res) => {
  try {
    const categoryAttribute = await CategoryAttributes.findByPk(req.params.id);
    if (!categoryAttribute) {
      return res.status(404).json({ error: 'Category attribute not found' });
    }
    await categoryAttribute.update(req.body);
    return res.status(200).json(categoryAttribute);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete category attribute by ID
const deleteCategoryAttribute = async (req, res) => {
  try {
    const categoryAttribute = await CategoryAttributes.findByPk(req.params.id);
    if (!categoryAttribute) {
      return res.status(404).json({ error: 'Category attribute not found' });
    }
    await categoryAttribute.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCategoryAttribute,
  getAllCategoryAttributes,
  getCategoryAttributeById,
  updateCategoryAttribute,
  deleteCategoryAttribute
};
