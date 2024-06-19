// walletDetailsRoutes.js
const express = require('express');
const router = express.Router();
const walletDetailsController = require('../controllers/walletDetailsController');
const { userValidationRules, validate } = require('../validators/walletDetailsValidator');

router.get('/', walletDetailsController.getAllWalletDetails);
router.get('/:id', walletDetailsController.getWalletDetailById);
router.post('/', userValidationRules, validate, walletDetailsController.createWalletDetail);
router.put('/:id', walletDetailsController.updateWalletDetail);
router.delete('/:id', walletDetailsController.deleteWalletDetail);

module.exports = router;
