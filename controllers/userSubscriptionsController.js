const UserSubscriptions = require('../models').user_subscriptions;
const { Op } = require('sequelize');
const Users = require('../models').users;
const getAllWithPagination = require('../utils/pagination');
// Create a new user subscription
const createUserSubscription = async (req, res) => {
  try {
    const userSubscription = await UserSubscriptions.create(req.body);
    return res.status(201).json(userSubscription);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all user subscriptions
const getAllUserSubscriptions = async (req, res) => {
  const { user_id, subscription_plan_id, status_in, start_date, end_date} = req.query;
 
  
  try {
    let whereClause = {};

    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id };
    }
    if (subscription_plan_id) {
      whereClause.subscription_plan_id = { [Op.eq]: subscription_plan_id };
    }
    if (status_in) {
      whereClause.status_in = { [Op.like]: `%${status_in}%` };
    }
    if (start_date) {
      whereClause.start_date = { [Op.eq]: start_date };
    }
    if (end_date) {
      whereClause.end_date = { [Op.eq]: end_date };
    }

    console.log('whereClause:', whereClause);

    await getAllWithPagination(UserSubscriptions, req, res, whereClause, [
      {
        model: Users,
        as: 'user'
      }
    ]);
  } catch (error) {
    console.error('Error in getAllUserAddresses:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get user subscription by ID
const getUserSubscriptionById = async (req, res) => {
  try {
    const userSubscription = await UserSubscriptions.findByPk(req.params.id);
    if (!userSubscription) {
      return res.status(404).json({ error: 'User subscription not found' });
    }
    return res.status(200).json(userSubscription);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update user subscription by ID
const updateUserSubscription = async (req, res) => {
  try {
    const userSubscription = await UserSubscriptions.findByPk(req.params.id);
    if (!userSubscription) {
      return res.status(404).json({ error: 'User subscription not found' });
    }
    await userSubscription.update(req.body);
    return res.status(200).json(userSubscription);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete user subscription by ID
const deleteUserSubscription = async (req, res) => {
  try {
    const userSubscription = await UserSubscriptions.findByPk(req.params.id);
    if (!userSubscription) {
      return res.status(404).json({ error: 'User subscription not found' });
    }
    await userSubscription.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createUserSubscription,
  getAllUserSubscriptions,
  getUserSubscriptionById,
  updateUserSubscription,
  deleteUserSubscription
};