// subscriptionPlansRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const subscriptionPlansController = require('../controllers/subscriptionPlansController');
const { subscriptionPlanValidationRules, subscriptionPlanUpdateValidationRules, validate } = require('../validators/subscriptionPlansValidator');
const TABLE_NAME = 'subscription_plans';
router.get('/', auth.authorize('can_view', TABLE_NAME), subscriptionPlansController.getAllSubscriptionPlans);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), subscriptionPlansController.getSubscriptionPlanById);
router.post('/', auth.authorize('can_add', TABLE_NAME), subscriptionPlanValidationRules, validate, subscriptionPlansController.createSubscriptionPlan);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), subscriptionPlanUpdateValidationRules, validate, subscriptionPlansController.updateSubscriptionPlan);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), subscriptionPlansController.deleteSubscriptionPlan);

module.exports = router;



