const Roles = require('../models').roles;

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
  try {
    const role = await Roles.findAll();
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: error });
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
