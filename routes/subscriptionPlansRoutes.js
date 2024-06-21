// subscriptionPlansRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const subscriptionPlansController = require('../controllers/subscriptionPlansController');
const { subscriptionPlanValidationRules, subscriptionPlanUpdateValidationRules, validate } = require('../validators/subscriptionPlansValidator');

router.get('/', subscriptionPlansController.getAllSubscriptionPlans);
router.get('/:id', subscriptionPlansController.getSubscriptionPlanById);
router.post('/', subscriptionPlanValidationRules, validate, subscriptionPlansController.createSubscriptionPlan);
router.put('/:id', subscriptionPlanUpdateValidationRules, validate, subscriptionPlansController.updateSubscriptionPlan);
router.delete('/:id', subscriptionPlansController.deleteSubscriptionPlan);

module.exports = router;
