// userSubscriptionsRoutes.js
const express = require('express');
const router = express.Router();
const userSubscriptionsController = require('../controllers/userSubscriptionsController');
const { userSubscriptionValidationRules, validate } = require('../validators/userSubscriptionsValidator');

router.get('/', userSubscriptionsController.getAllUserSubscriptions);
router.get('/:id', userSubscriptionsController.getUserSubscriptionById);
router.post('/', userSubscriptionValidationRules, validate, userSubscriptionsController.createUserSubscription);
router.put('/:id', userSubscriptionsController.updateUserSubscription);
router.delete('/:id', userSubscriptionsController.deleteUserSubscription);

module.exports = router;
