const SubscriptionPlans = require('../models').subscription_plans;

// Create a new subscription plan
const createSubscriptionPlan = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlans.create(req.body);
    return res.status(201).json(subscriptionPlan);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all subscription plans
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const subscriptionPlans = await SubscriptionPlans.findAll();
    return res.status(200).json(subscriptionPlans);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get subscription plan by ID
const getSubscriptionPlanById = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlans.findByPk(req.params.id);
    if (!subscriptionPlan) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    return res.status(200).json(subscriptionPlan);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update subscription plan by ID
const updateSubscriptionPlan = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlans.findByPk(req.params.id);
    if (!subscriptionPlan) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    await subscriptionPlan.update(req.body);
    return res.status(200).json(subscriptionPlan);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete subscription plan by ID
const deleteSubscriptionPlan = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlans.findByPk(req.params.id);
    if (!subscriptionPlan) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    await subscriptionPlan.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
};