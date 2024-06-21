const AdminTypes = require('../models').adminTypes;

// Create a new admin type
const createAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.create(req.body);
    return res.status(201).json(adminType);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all admin type
const getAllAdminTypes = async (req, res) => {
  try {
    const adminTypes = await AdminTypes.findAll();
    return res.status(200).json(adminTypes);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get admin type by ID
const getAdminTypeById = async (req, res) => {
  try {
    const adminType = await AdminTypes.findByPk(req.params.id);
    if (!adminType) {
      return res.status(404).json({ error: 'Admin Type not found' });
    }
    return res.status(200).json(adminType);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update adminType item by ID
const updateAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.findByPk(req.params.id);
    if (!adminType) {
      return res.status(404).json({ error: 'Admin Type not found' });
    }
    await adminType.update(req.body);
    return res.status(200).json(adminType);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete adminType item by ID
const deleteAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.findByPk(req.params.id);
    if (!adminType) {
      return res.status(404).json({ error: 'Admin Type not found' });
    }
    await adminType.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createAdminType,
  getAllAdminTypes,
  getAdminTypeById,
  updateAdminType,
  deleteAdminType
};
