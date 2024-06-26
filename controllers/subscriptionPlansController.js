const SubscriptionPlans = require('../models').subscription_plans;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');

// Create a new subscription plan
const createSubscriptionPlan = async (req, res) => {
  try {
    const subscriptionPlan = await SubscriptionPlans.create(req.body);
    return res.status(201).json(subscriptionPlan);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all subscription plans
const getAllSubscriptionPlans = async (req, res) => {
  const {subp_name ,des, price, duration_days} = req.query;
  try {
    let whereClause = {};
    if (subp_name) {
      whereClause.subp_name = { [Op.like]: `%${subp_name}%` }; 
    }
    if (des) {
      whereClause.des = { [Op.like]: `%${des}%` }; 
    }
    
    if (price) {
      whereClause.price = { [Op.eq]: price }; 
    }
    if (duration_days) {
      whereClause.duration_days = { [Op.eq]: duration_days }; 
    }

    console.log('whereClause:', whereClause); 

    await getAllWithPagination(SubscriptionPlans, req, res, whereClause);
  } catch (error) {
    console.error('Error in getAllRoles:', error); 
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
};