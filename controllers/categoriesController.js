const Categories = require('../models').categories;

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { c_name, parent_id,} = req.body;

    const category = await Categories.create({
      c_name: c_name,
      parent_id: parent_id,
      image: ''
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Upload category image
const uploadCategoryImage = async (req, res) => {
  const categoryId = req.params.id;
  const imagePath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const category = await Categories.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.image = imagePath;
    await category.save();

    return res.status(200).json({ message: 'Image uploaded successfully', category });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createCategory,
  uploadCategoryImage,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
