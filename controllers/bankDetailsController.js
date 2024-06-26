const BankDetails = require('../models').bank_details;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const PaymentMethod = require('../models').payment_methods
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
  const { payment_method_id, bank_name, account_number, card_number} = req.query;

  try {
    let whereClause = {};

    if (payment_method_id) {
      whereClause.payment_method_id = { [Op.eq]: payment_method_id };
    }
    if (bank_name) {
      whereClause.bank_name = { [Op.like]: `%${bank_name}%` };
    }
    
    if (account_number) {
      whereClause.account_number = { [Op.like]: `%${account_number}%` };
    }
    if (card_number) {
      whereClause.card_number = { [Op.like]: `%${card_number}%` };
    }


    console.log('whereClause:', whereClause);

    await getAllWithPagination(BankDetails, req, res, whereClause, [
      {
        model: PaymentMethod,
        as: 'payment_method'
      },
    

    ]);
  } catch (error) {
    console.error('Error in getAllCarts:', error);
    return res.status(500).json({ error: error.message });
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