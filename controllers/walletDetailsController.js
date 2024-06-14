const WalletDetails = require('../models').wallet_details;

// Create a new wallet detail entry
const createWalletDetail = async (req, res) => {
  try {
    const walletDetail = await WalletDetails.create(req.body);
    return res.status(201).json(walletDetail);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all wallet details
const getAllWalletDetails = async (req, res) => {
  try {
    const walletDetails = await WalletDetails.findAll();
    return res.status(200).json(walletDetails);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createWalletDetail,
  getAllWalletDetails,
  getWalletDetailById,
  updateWalletDetail,
  deleteWalletDetail
};
