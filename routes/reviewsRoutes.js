// reviewsRoutes.js
const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const { userValidationRules, validate } = require('../validators/reviewsValidator');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);
router.post('/', userValidationRules, validate, reviewsController.createReview);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
