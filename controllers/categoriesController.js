const Categories = require('../models').categories;

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = await Categories.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update category by ID
const updateCategory = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.update(req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
