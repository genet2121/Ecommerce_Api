const BankDetails = require('../models').bank_details;

// Create a new bank detail
const createBankDetail = async (req, res) => {
  try {
    const bankDetail = await BankDetails.create(req.body);
    return res.status(201).json(bankDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all bank details
const getAllBankDetails = async (req, res) => {
  try {
    const bankDetails = await BankDetails.findAll();
    return res.status(200).json(bankDetails);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get bank detail by ID
const getBankDetailById = async (req, res) => {
  try {
    const bankDetail = await BankDetails.findByPk(req.params.id);
    if (!bankDetail) {
      return res.status(404).json({ error: 'Bank detail not found' });
    }
    return res.status(200).json(bankDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update bank detail by ID
const updateBankDetail = async (req, res) => {
  try {
    const bankDetail = await BankDetails.findByPk(req.params.id);
    if (!bankDetail) {
      return res.status(404).json({ error: 'Bank detail not found' });
    }
    await bankDetail.update(req.body);
    return res.status(200).json(bankDetail);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete bank detail by ID
const deleteBankDetail = async (req, res) => {
  try {
    const bankDetail = await BankDetails.findByPk(req.params.id);
    if (!bankDetail) {
      return res.status(404).json({ error: 'Bank detail not found' });
    }
    await bankDetail.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createBankDetail,
  getAllBankDetails,
  getBankDetailById,
  updateBankDetail,
  deleteBankDetail
};