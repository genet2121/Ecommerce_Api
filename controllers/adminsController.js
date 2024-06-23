const Admins = require('../models').admins;
const bcrypt = require('bcrypt');

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const {admin_type_id, firstname, lastname, email, password } = req.body;
    const photoPath = req.file ? req.file.path : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admins.create({
      admin_type_id: admin_type_id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      photo: ''
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Upload admin photo
const uploadAdminPhoto = async (req, res) => {
  const adminId = req.params.id;
  const photoPath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.photo = photoPath;
    await admin.save();

    return res.status(200).json({ message: 'Photo uploaded successfully', admin });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return res.status(500).json({ error: 'Failed to upload photo' });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.findAll();
    return res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return res.status(500).json({ error: error.message });
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
    console.error('Error fetching admin:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Update admin by ID
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.update(req.body);
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
    console.error('Error deleting admin:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  uploadAdminPhoto,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
};
