const Remarks = require('../models').remarks;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
// Create a new payment method
const createRemark = async (req, res) => {
  try {
    const remark = await Remarks.create(req.body);
    return res.status(201).json(remark);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all payment methods
const getAllRemarks = async (req, res) => {
  const { firstname, lastname, email, phone_number} = req.query;

  try {
    let whereClause = {};

    if (firstname) {
      whereClause.firstname = { [Op.like]: `%${firstname}%` };
    }
    if (lastname) {
      whereClause.lastname = { [Op.like]: `%${lastname}%` };
    }
    if (email) {
        whereClause.email = { [Op.like]: `%${email}%` };
      }
      if (phone_number) {
        whereClause.phone_number = { [Op.eq]: phone_number }; 
      }
  
    console.log('whereClause:', whereClause);

    await getAllWithPagination(Remarks, req, res, whereClause);
  } catch (error) {
    console.error('Error in getAllRemarks:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get payment method by ID
const getRemarkById = async (req, res) => {
  try {
    const remark = await Remarks.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Remark is not found' });
    }
    return res.status(200).json(remark);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update payment method by ID
const updateRemark = async (req, res) => {
  try {
    const remark = await Remarks.findByPk(req.params.id);
    if (!remark) {
      return res.status(404).json({ error: 'Remark not found' });
    }
    await remark.update(req.body);
    return res.status(200).json(remark);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete payment method by ID
const deleteRemark = async (req, res) => {
  try {
    const remark = await Remarks.findByPk(req.params.id);
    if (!remark) {
      return res.status(404).json({ error: 'Remark not found' });
    }
    await remark.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createRemark,
  getAllRemarks,
  getRemarkById,
  updateRemark,
  deleteRemark
};
