const Admins = require('../models').admins;
const bcrypt = require('bcrypt');

const createAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, passwrd } = req.body;
    const photoPath = req.file.path;

    const hashedPassword = await bcrypt.hash(passwrd, 10);

    const admin = await Admins.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      passwrd: hashedPassword,
      photo: photoPath
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error); // Log the error details
    return res.status(500).json({ error: error });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.findAll();
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update admin by ID
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    const photoPath = req.file.path;
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.update(req.body);
    await admin.update({ photo: photoPath });
    return res.status(200).json(admin);
  } catch (error) {
    console.error('Error updating admin:', error); 
    return res.status(500).json({ error: error });
  }
};

// Delete admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
};