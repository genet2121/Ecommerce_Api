// cartsRoutes.js
const express = require('express');
const router = express.Router();
const wishlistsController = require('../controllers/wishlistController');



router.get('/', wishlistsController.getAllWishlists);
router.get('/:id',  wishlistsController.getWishlistById);
router.post('/',  wishlistsController.createWishlist);
router.put('/:id',  wishlistsController.updateWishlist);
router.delete('/:id', wishlistsController.deleteWishlist);

module.exports = router;


