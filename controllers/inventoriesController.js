const Inventories = require('../models').inventories;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products;

// Create new inventory entry
const createInventory = async (req, res) => {
  try {
    const inventory = await Inventories.create(req.body);
    return res.status(201).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all inventory entries
const getAllInventories = async (req, res) => {
  const { product_id, quantity} = req.query; 

  try {
    let whereClause = {};
    if (quantity) {
      whereClause.quantity = { [Op.eq]: quantity }; 
    }
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id }; 
    }

    
    await getAllWithPagination(Inventories, req, res, whereClause, [
      {
        model: Product,
        as: 'product'
      }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get inventory entry by ID
const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventories.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory entry not found' });
    }
    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update inventory entry by ID
const updateInventory = async (req, res) => {
  try {
    const inventory = await Inventories.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory entry not found' });
    }
    await inventory.update(req.body);
    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete inventory entry by ID
const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventories.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory entry not found' });
    }
    await inventory.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory
};