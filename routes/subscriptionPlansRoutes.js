// subscriptionPlansRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionPlansController = require('../controllers/subscriptionPlansController');

router.get('/', subscriptionPlansController.getAllSubscriptionPlans);
router.get('/:id', subscriptionPlansController.getSubscriptionPlanById);
router.post('/', subscriptionPlansController.createSubscriptionPlan);
router.put('/:id', subscriptionPlansController.updateSubscriptionPlan);
router.delete('/:id', subscriptionPlansController.deleteSubscriptionPlan);

module.exports = router;
