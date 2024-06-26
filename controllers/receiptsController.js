const Receipts = require('../models').receipts;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Transaction =require('../models').transactions;
const Users = require('../models').users;

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
  const { seller_id, buyer_id, transaction_id, amount} = req.query;
  try {
    let whereClause = {};
  
    if (seller_id) {
      whereClause.seller_id = { [Op.eq]: seller_id }; 
    }
    if (buyer_id) {
      whereClause.buyer_id = { [Op.eq]: buyer_id }; 
    }
    if (amount) {
      whereClause.amount = { [Op.eq]: amount }; 
    }
   
    if (transaction_id) {
      whereClause.transaction_id = { [Op.eq]: transaction_id }; 
    }

    
    await getAllWithPagination(Receipts, req, res, whereClause, [
      {
        model: Users,
        as: 'seller',
      },
      {
        model: Users,
        as: 'buyer',
      },
      {
        model: Transaction,
        as: 'transaction'
      },
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
