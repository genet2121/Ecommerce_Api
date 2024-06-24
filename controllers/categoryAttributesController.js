const CategoryAttributes = require('../models').category_attributes;
const getAllWithpagination = require('../utils/pagination');

// Create a new category attribute
const createCategoryAttribute = async (req, res) => {
  try {
    const categoryAttribute = await CategoryAttributes.create(req.body);
    return res.status(201).json(categoryAttribute);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all category attributes
const getAllCategoryAttributes = async (req, res) => {
  await getAllWithpagination(Products, req, res);
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createCategoryAttribute,
  getAllCategoryAttributes,
  getCategoryAttributeById,
  updateCategoryAttribute,
  deleteCategoryAttribute
};
