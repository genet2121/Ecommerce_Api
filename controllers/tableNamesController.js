const TableNames = require('../models').tableNames;

// Create a new table name
const createTableName = async (req, res) => {
  try {
    const tableNames = await TableNames.create(req.body);
    return res.status(201).json(tableNames);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all table name
const getAllTableNames = async (req, res) => {
  try {
    const tableName = await TableNames.findAll();
    return res.status(200).json(tableName);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get tableName by ID
const getTableNameById = async (req, res) => {
  try {
    const tableName = await TableNames.findByPk(req.params.id);
    if (!tableName) {
      return res.status(404).json({ error: 'Table Name not found' });
    }
    return res.status(200).json(tableName);
  } catch (error) {
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createTableName,
  getAllTableNames,
  getTableNameById,
  updateTableName,
  deleteTableName
};
