const UserAddresses = require('../models').user_addresses;
const { Op } = require('sequelize');
const Users = require('../models').users;
const getAllWithPagination = require('../utils/pagination');


// Create a new user address
const createUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddresses.create(req.body);
    return res.status(201).json(userAddress);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all user addresses
const getAllUserAddresses = async (req, res) => {

  const { user_id } = req.query;

  try {
    let whereClause = {};

    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id };
    }

    console.log('whereClause:', whereClause);

    await getAllWithPagination(UserAddresses, req, res, whereClause, [
      {
        model: Users,
        as: 'user'
      }
    ]);
  } catch (error) {
    console.error('Error in getAllUserAddresses:', error);
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createUserAddress,
  getAllUserAddresses,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress
};