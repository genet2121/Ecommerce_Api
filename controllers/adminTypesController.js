const AdminTypes = require('../models').admin_types;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
// Create a new admin type
const createAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.create(req.body);
    return res.status(201).json(adminType);
  } catch (error) {
    console.error('Error creating admin type:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get all admin types
const getAllAdminTypes = async (req, res) => {
  const {admin_type_name} = req.query;

  try {
    let whereClause = {};
    
    if (admin_type_name) {
      whereClause.admin_type_name = { [Op.like]: `%${admin_type_name}%` };
    }

    console.log('whereClause:', whereClause); 

    await getAllWithPagination(AdminTypes, req, res, whereClause);
  } catch (error) {
    console.error('Error in getAllAdminTypes:', error); 
    return res.status(500).json({ error: error.message });
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
    console.error('Error fetching admin type by ID:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Update admin type by ID
const updateAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.findByPk(req.params.id);
    if (!adminType) {
      return res.status(404).json({ error: 'Admin Type not found' });
    }
    await adminType.update(req.body);
    return res.status(200).json(adminType);
  } catch (error) {
    console.error('Error updating admin type:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete admin type by ID
const deleteAdminType = async (req, res) => {
  try {
    const adminType = await AdminTypes.findByPk(req.params.id);
    if (!adminType) {
      return res.status(404).json({ error: 'Admin Type not found' });
    }
    await adminType.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting admin type:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdminType,
  getAllAdminTypes,
  getAdminTypeById,
  updateAdminType,
  deleteAdminType
};
