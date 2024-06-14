const Admins = require('../models').admins;

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update admin by ID
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.update(req.body);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
};