// reviewsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const { reviewValidationRules, reviewUpdateValidationRules, validate } = require('../validators/reviewsValidator');

const TABLE_NAME = 'reviews';
router.get('/', auth.authorize('can_view', TABLE_NAME), reviewsController.getAllReviews);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), reviewsController.getReviewById);
router.post('/', auth.authorize('can_add', TABLE_NAME), reviewValidationRules, validate, reviewsController.createReview);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), reviewUpdateValidationRules, validate, reviewsController.updateReview);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), reviewsController.deleteReview);

module.exports = router;


