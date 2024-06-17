const Receipts = require('../models').receipts;

// Create a new receipt
const createReceipt = async (req, res) => {
  try {
    const receipt = await Receipts.create(req.body);
    return res.status(201).json(receipt);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all receipts
const getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipts.findAll();
    return res.status(200).json(receipts);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get receipt by ID
const getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipts.findByPk(req.params.id);
    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    return res.status(200).json(receipt);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update receipt by ID
const updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipts.findByPk(req.params.id);
    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    await receipt.update(req.body);
    return res.status(200).json(receipt);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete receipt by ID
const deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipts.findByPk(req.params.id);
    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    await receipt.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt
};
