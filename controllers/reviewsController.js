const Reviews = require('../models').reviews;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products;
const Users = require('../models').users;

// Create a new review
const createReview = async (req, res) => {
  try {
    const review = await Reviews.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  const { user_id, product_id, rating, comment_text} = req.query;

  try {
    let whereClause = {};
  
    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id }; 
    }
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id }; 
    }
    if (rating) {
      whereClause.rating = { [Op.eq]: rating }; 
    }
   
    if (comment_text) {
      whereClause.comment_text = { [Op.like]: `%${comment_text}%` }; 
    }

    
    await getAllWithPagination(Reviews, req, res, whereClause, [
      {
        model: Users,
        as: 'user',
      },
      {
        model: Product,
        as: 'product'
      },
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update review by ID
const updateReview = async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.update(req.body);
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete review by ID
const deleteReview = async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
