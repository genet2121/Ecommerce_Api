// walletDetailsRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const express = require('express');
const router = express.Router();
const walletDetailsController = require('../controllers/walletDetailsController');
const { walletDetailValidationRules, walletDetailUpdateValidationRules, validate } = require('../validators/walletDetailsValidator');

router.get('/', walletDetailsController.getAllWalletDetails);
router.get('/:id', walletDetailsController.getWalletDetailById);
router.post('/', walletDetailValidationRules, validate, walletDetailsController.createWalletDetail);
router.put('/:id', walletDetailUpdateValidationRules, validate, walletDetailsController.updateWalletDetail);
router.delete('/:id', walletDetailsController.deleteWalletDetail);

module.exports = router;
