// walletDetailsRoutes.js
const express = require('express');
const router = express.Router();
const walletDetailsController = require('../controllers/walletDetailsController');

router.get('/', walletDetailsController.getAllWalletDetails);
router.get('/:id', walletDetailsController.getWalletDetailById);
router.post('/', walletDetailsController.createWalletDetail);
router.put('/:id', walletDetailsController.updateWalletDetail);
router.delete('/:id', walletDetailsController.deleteWalletDetail);

module.exports = router;
