const Wishlists = require('../models').wishlists;
const Users = require('../models').users;
const getAllWithPagination = require('../utils/pagination');
const Product =require('../models').products
const Inventory = require("../models").inventories

// Create a new wishlist item
const createWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlists.create(req.body);
    return res.status(201).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all wishlist items
const getAllWishlists = async (req, res) => {
  const { user_id, product_id, inventory_id } = req.query;

  try {
    let whereClause = {};

    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id };
    }
    
    if (product_id) {
      whereClause.product_id = { [Op.eq]: product_id };
    }
    if (inventory_id) {
        whereClause.inventory_id = { [Op.eq]: inventory_id };
      }

    console.log('whereClause:', whereClause);

    await getAllWithPagination(Wishlists, req, res, whereClause, [
      {
        model: Users,
        as: 'user'
      },
      {
        model: Product,
        as: 'product'
      },
      {
        model: Inventory,
        as: 'inventory'
      }

    ]);
  } catch (error) {
    console.error('Error in getAllWishlist:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get wishlist item by ID
const getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlists.findByPk(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: 'wishlist not found' });
    }
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update wishlist item by ID
const updateWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlists.findByPk(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    await wishlist.update(req.body);
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete wishlist item by ID
const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlists.findByPk(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: 'wishlist not found' });
    }
    await wishlist.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist
};
