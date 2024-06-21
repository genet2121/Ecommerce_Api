// reviewsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const { reviewValidationRules, reviewUpdateValidationRules, validate } = require('../validators/reviewsValidator');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);
router.post('/', reviewValidationRules, validate, reviewsController.createReview);
router.put('/:id', reviewUpdateValidationRules, validate, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
