const Roles = require('../models').roles;
const { Op } = require('sequelize');
const AdminTypes = require('../models').admin_types; 
const getAllWithPagination = require('../utils/pagination');
const TableName = require('../models').table_names
// Create a new role
const createRole = async (req, res) => {
  try {
    const role = await Roles.create(req.body);
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  const {admin_type_id , table_name_id} = req.query;

  try {
    let whereClause = {};
    
    
    if (admin_type_id) {
      whereClause.admin_type_id = { [Op.eq]: admin_type_id }; 
    }
    if (table_name_id) {
      whereClause.table_name_id = { [Op.eq]: table_name_id }; 
    }

    console.log('whereClause:', whereClause); 

    await getAllWithPagination(Roles, req, res, whereClause, [
      {
        model: AdminTypes,
        as: 'admin_type'
      },
      {
        model: TableName,
        as: 'table_name'
      },
    ]);
  } catch (error) {
    console.error('Error in getAllRoles:', error); 
    return res.status(500).json({ error: error.message });
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update role by ID
const updateRole = async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.update(req.body);
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete role item by ID
const deleteRole = async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
