const UserAddresses = require('../models').user_addresses;

// Create a new user address
const createUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddresses.create(req.body);
    return res.status(201).json(userAddress);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all user addresses
const getAllUserAddresses = async (req, res) => {
  try {
    const userAddresses = await UserAddresses.findAll();
    return res.status(200).json(userAddresses);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user address by ID
const getUserAddressById = async (req, res) => {
  try {
    const userAddress = await UserAddresses.findByPk(req.params.id);
    if (!userAddress) {
      return res.status(404).json({ error: 'User address not found' });
    }
    return res.status(200).json(userAddress);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user address by ID
const updateUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddresses.findByPk(req.params.id);
    if (!userAddress) {
      return res.status(404).json({ error: 'User address not found' });
    }
    await userAddress.update(req.body);
    return res.status(200).json(userAddress);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user address by ID
const deleteUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddresses.findByPk(req.params.id);
    if (!userAddress) {
      return res.status(404).json({ error: 'User address not found' });
    }
    await userAddress.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUserAddress,
  getAllUserAddresses,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress
};