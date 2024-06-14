const Reviews = require('../models').reviews;

// Create a new review
const createReview = async (req, res) => {
  try {
    const review = await Reviews.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
