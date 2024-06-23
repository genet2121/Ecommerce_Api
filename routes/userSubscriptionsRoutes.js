// userSubscriptionsRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const express = require('express');
const router = express.Router();
const userSubscriptionsController = require('../controllers/userSubscriptionsController');
const { userSubscriptionValidationRules, userSubscriptionUpdateValidationRules, validate } = require('../validators/userSubscriptionsValidator');

const TABLE_NAME = 'user_subscriptions';
router.get('/', auth.authorize('can_view', TABLE_NAME), userSubscriptionsController.getAllUserSubscriptions);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), userSubscriptionsController.getUserSubscriptionById);
router.post('/', auth.authorize('can_add', TABLE_NAME), userSubscriptionValidationRules, validate, userSubscriptionsController.createUserSubscription);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), userSubscriptionUpdateValidationRules, validate, userSubscriptionsController.updateUserSubscription);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), userSubscriptionsController.deleteUserSubscription);

module.exports = router;


