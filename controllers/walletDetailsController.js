const WalletDetails = require('../models').wallet_details;
const { Op } = require('sequelize');
const PaymentMethod = require('../models').payment_methods;
const getAllWithPagination = require('../utils/pagination');

// Create a new wallet detail entry
const createWalletDetail = async (req, res) => {
  try {
    const walletDetail = await WalletDetails.create(req.body);
    return res.status(201).json(walletDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all wallet details
const getAllWalletDetails = async (req, res) => {
  const { payment_method_id, wallet_name, phone_number} = req.query;
  try {
    let whereClause = {};

    if (payment_method_id) {
      whereClause.payment_method_id = { [Op.eq]: payment_method_id };
    }
   
    if (wallet_name) {
      whereClause.wallet_name = { [Op.like]: `%${wallet_name}%` };
    }
    if (phone_number) {
      whereClause.phone_number = { [Op.like]: `%${phone_number}%` };
    }
   

    console.log('whereClause:', whereClause);

    await getAllWithPagination(WalletDetails, req, res, whereClause, [
      {
        model: PaymentMethod,
        as: 'payment_method'
      }
    ]);
  } catch (error) {
    console.error('Error in getAllWalletDetails:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get wallet detail by ID
const getWalletDetailById = async (req, res) => {
  try {
    const walletDetail = await WalletDetails.findByPk(req.params.id);
    if (!walletDetail) {
      return res.status(404).json({ error: 'Wallet detail not found' });
    }
    return res.status(200).json(walletDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update wallet detail by ID
const updateWalletDetail = async (req, res) => {
  try {
    const walletDetail = await WalletDetails.findByPk(req.params.id);
    if (!walletDetail) {
      return res.status(404).json({ error: 'Wallet detail not found' });
    }
    await walletDetail.update(req.body);
    return res.status(200).json(walletDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete wallet detail by ID
const deleteWalletDetail = async (req, res) => {
  try {
    const walletDetail = await WalletDetails.findByPk(req.params.id);
    if (!walletDetail) {
      return res.status(404).json({ error: 'Wallet detail not found' });
    }
    await walletDetail.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createWalletDetail,
  getAllWalletDetails,
  getWalletDetailById,
  updateWalletDetail,
  deleteWalletDetail
};
