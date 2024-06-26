
const { Op } = require('sequelize');
const TableNames = require('../models').table_names;
const getAllWithPagination = require('../utils/pagination');

// Create a new table name
const createTableName = async (req, res) => {
  try {
    const { tab_name } = req.body;
    const tableName = await TableNames.create({ tab_name });
    return res.status(201).json(tableName);
  } catch (error) {
    console.error('Error creating table name:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get all table names
const getAllTableNames = async (req, res) => {

 // await getAllWithpagination(TableNames, req, res);
 const { tabName, createdAt } = req.query; 

  try {
    let whereClause = {};
    if (tabName) {
      whereClause.tab_name = { [Op.like]: `%${tabName}%` }; 
    }
    if (createdAt) {
      whereClause.createdAt = { [Op.gte]: new Date(createdAt) }; 
    }
    await getAllWithPagination(TableNames, req, res, whereClause);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get table name by ID
const getTableNameById = async (req, res) => {
  try {
    const tableName = await TableNames.findByPk(req.params.id);
    if (!tableName) {
      return res.status(404).json({ error: 'Table Name not found' });
    }
    return res.status(200).json(tableName);
  } catch (error) {
    console.error('Error fetching table name by ID:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Update table name by ID
const updateTableName = async (req, res) => {
  try {
    const tableName = await TableNames.findByPk(req.params.id);
    if (!tableName) {
      return res.status(404).json({ error: 'Table Name not found' });
    }
    await tableName.update(req.body);
    return res.status(200).json(tableName);
  } catch (error) {
    console.error('Error updating table name:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete table name item by ID
const deleteTableName = async (req, res) => {
  try {
    const tableName = await TableNames.findByPk(req.params.id);
    if (!tableName) {
      return res.status(404).json({ error: 'Table Name not found' });
    }
    await tableName.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting table name:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTableName,
  getAllTableNames,
  getTableNameById,
  updateTableName,
  deleteTableName
};
