const Faqs = require('../models').faqs;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');

// Create a new FAQ
const createFaq = async (req, res) => {
  try {
    const faq = await Faqs.create(req.body);
    return res.status(201).json(faq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all FAQs with optional filtering
const getAllFaqs = async (req, res) => {
  const { topic, question, answer } = req.query;

  try {
    let whereClause = {};

    if (topic) {
      whereClause.topic = { [Op.like]: `%${topic}%` };
    }
    if (question) {
      whereClause.question = { [Op.like]: `%${question}%` };
    }
    if (answer) {
      whereClause.answer = { [Op.like]: `%${answer}%` };
    }

    console.log('whereClause:', whereClause);

    await getAllWithPagination(Faqs, req, res, whereClause);
  } catch (error) {
    console.error('Error in getAllFaqs:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get FAQ by ID
const getFaqById = async (req, res) => {
  try {
    const faq = await Faqs.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    return res.status(200).json(faq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update FAQ by ID
const updateFaq = async (req, res) => {
  try {
    const faq = await Faqs.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    await faq.update(req.body);
    return res.status(200).json(faq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete FAQ by ID
const deleteFaq = async (req, res) => {
  try {
    const faq = await Faqs.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    await faq.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq
};
