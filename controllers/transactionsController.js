const Transactions = require('../models').transactions;

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
  try {
    const transactions = await Transactions.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: error });
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
