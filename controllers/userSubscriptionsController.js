const UserSubscriptions = require('../models').user_subscriptions;

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
  try {
    const userSubscriptions = await UserSubscriptions.findAll();
    return res.status(200).json(userSubscriptions);
  } catch (error) {
    return res.status(500).json({ error: error });
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