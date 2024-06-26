const Transactions = require('../models').transactions;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products;
const Users = require('../models').users;
const PaymentMethod = require('../models').payment_methods;

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.create(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  const { seller_id, buyer_id, product_id, amount, status_in, payment_method_id} = req.query; 
  try {
    let whereClause = {};
    
    if (status_in) {
      whereClause.status_in = { [Op.like]: `%${status_in}%` }; 
    }
    if (seller_id) {
      whereClause.seller_id = { [Op.eq]: seller_id }; 
    }
    if (buyer_id) {
      whereClause.buyer_id = { [Op.eq]: buyer_id }; 
    }
    if (amount) {
      whereClause.amount = { [Op.eq]: amount }; 
    }
    if (payment_method_id) {
      whereClause.payment_method_id = { [Op.eq]: payment_method_id }; 
    }
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id }; 
    }

    
    await getAllWithPagination(Transactions, req, res, whereClause, [
      {
        model: Users,
        as: 'seller',
      },
      {
        model: Users,
        as: 'buyer',
      },
      {
        model: Product,
        as: 'product'
      },
      {
        model: PaymentMethod,
        as:'payment_method'
      }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transactions.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.update(req.body);
    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
